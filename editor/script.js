var firebase, storage, tab_container
const FIREBASE_CONFIG = {}
const CM_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/'

// Main
async function main(){
    
    append_style(`
        :root {
            font-family: Consolas;
            --bg-color          : hsl(200, 19%, 18%);
            --bg-darker-color   : hsl(200, 19%, 8%);
            --fg-color          : hsl(0, 0%, 80%);
            --fg-muted-color    : hsl(0, 0%, 65%);
            --primary-color     : hsl(14, 100%, 50%);
            --secondary-color   : hsl(14, 100%, 28%);
        }
        body { 
            min-height: 100vh; 
            margin: 0; 
            background-color: var(--bg-color);
        }
    `)

    // Try connect to firebase
    firebase = Firebase(FIREBASE_CONFIG)
    await firebase.init()

    // Init
    Spinner.show()

    await Editor.preload_libs()
    await Promise.all([
        load_external(CM_CDN + 'mode/yaml/yaml.min.js'),
        load_external(CM_CDN + 'mode/markdown/markdown.min.js'),
        load_external(CM_CDN + 'mode/javascript/javascript.min.js'),
        load_external(CM_CDN + 'mode/meta.min.js'),
    ])

    tab_container = new TabConainer()

   
    async function new_editor_tab(params){
        let { hints } = params
        const { title, mode, local_storage_key, firebase_path } = params
        
        const tab = tab_container.add(title)
        const textarea = document.createElement('textarea')
        const editor = new Editor({ mode: mode ?? 'text/markdown' })
        
        const valid_ls_key = (typeof local_storage_key == 'string' && local_storage_key.length > 0)
        const valid_fb_key = (typeof firebase_path == 'string' && firebase_path.length > 0)
        const use_fb = firebase && firebase.is_connected && valid_fb_key
        
        tab.body.append(textarea)
        tab.onclick = () => editor.codemirror.refresh()
        
        await editor.render(textarea)
        
        if (use_fb){
            firebase.on_change('editor', snapshot => {
                editor.set_value(snapshot.val())
            })
        } else if (valid_ls_key){
            editor.set_value(localStorage.getItem(local_storage_key))
        }

        function save(){
            const val = editor.get_value()
            console.log('saved')
            if (use_fb) firebase.save('editor', val)
            if (valid_ls_key) localStorage.setItem('script', val)
        }

        if (valid_ls_key || use_fb){
            editor.codemirror.addKeyMap({ 
                'Ctrl-S' : () => save()
            })
        }

        if (typeof hints == 'string'){
            hints = await load_list_from_txt(hints)
        }
        if (Array.isArray(hints) && hints.length > 0){
            await editor.use_hints(hints)
        }
        
        editor.codemirror.getDoc().clearHistory()

        return { tab, textarea, editor, save }
    }
    
    // Tab 1
    await new_editor_tab({
        title             : 'Editor script', 
        mode              : 'text/javascript', 
        local_storage_key : 'script', 
        firebase_path     : '/editor/editor_1',
    })
    
    // Tab 2
    await new_editor_tab({
        title             : 'Random things', 
        mode              : 'text/yaml', 
        local_storage_key : 'random', 
        firebase_path     : '/editor/editor_2',
        hints             : 'http://127.0.0.1:8081/dataset.txt'
    })

    Spinner.hide()
}
main()



// Need load_script(), append_style(), load_list_from_txt()
class Editor {
    static cm_lib_loaded
    static hints_lib_loaded

    constructor(config){
        this.codemirror = undefined
        this.limit = 100
        this.config = { 
            ...Editor.default_config(), 
            ...(config ?? {}) 
        }

        if (!Editor.cm_lib_loaded){
            Editor.cm_lib_loaded = Editor.preload_libs()
        }
    }

    async render(element){
        // Wait until libs loaded
        await Promise.all([Editor.cm_lib_loaded])

        this.codemirror = CodeMirror.fromTextArea(element, this.config)
        return this
    }

    static default_config(){
        return {
            lineNumbers: true,
            indentWithTabs: false,
            smartIndent: false,
            tabSize: 4,
            indentUnit: 4,
            keyMap: 'sublime',
            theme: 'material',
            extraKeys: { 
                'Alt-Up': 'swapLineUp',
                'Alt-Down': 'swapLineDown',
            },
            autofocus: true,
            mode: 'text/x-markdown',  
            styleActiveLine: true,
            lineWrapping: true,
            lineWiseCopyCut: true,
            minLines: 50,
            viewportMargin: Infinity
        }
    }

    static async preload_libs(){
        if (Editor.cm_lib_loaded) return true
        append_style(`.CodeMirror { height: auto !important; }`)
        
        await load_external(CM_CDN + `codemirror.min.js`)
        await Promise.all([
            load_external(CM_CDN + 'codemirror.min.css'),
            load_external(CM_CDN + 'keymap/sublime.min.js'),
            load_external(CM_CDN + 'theme/material.min.css'),
            load_external(CM_CDN + 'addon/search/searchcursor.min.js'),
        ])

        Editor.cm_lib_loaded = true
        return true
    }

    get_value(){
        if (this.codemirror){
            return this.codemirror.getValue()
        }
    }

    set_value(value){
        if (this.codemirror && typeof value == 'string'){
            this.codemirror.setValue(value)
            this.codemirror.save()
        }        
    }

    async use_hints(hints){
        
        if (!Editor.hints_lib_loaded) {
            await Promise.all([
                load_external(CM_CDN + 'addon/hint/show-hint.min.css'),
                load_external(CM_CDN + 'addon/hint/show-hint.min.js'),
            ])
            Editor.hints_lib_loaded = true
        }

        this.hints = hints
        this.config.extraKeys['Ctrl-Space'] = () => this.show_hints()
        
        // https://stackoverflow.com/questions/13744176/codemirror-autocomplete-after-any-keyup
        this.codemirror.on('keyup', (editor, event) => {
            editor.save()   // put value to original textarea
    
            if (editor.state.completionActive) return 
            if (event.key.toString().trim().length !== 1) return
    
            this.show_hints()
        })
    }

    // https://stackoverflow.com/questions/32165851/how-to-enable-code-hinting-using-codemirror
    show_hints(){
        if (!this.hints || this.hints.length < 1) return

        CodeMirror.showHint(this.codemirror, () => {

            let cursor = this.codemirror.getCursor()
            let line = this.codemirror.getLine(cursor.line)
            let start = cursor.ch, end = cursor.ch

            while (start > 0 && /\w/.test(line.charAt(start - 1))) --start
            while (end < line.length && /\w/.test(line.charAt(end))) ++end

            const word = line.substring(start, end)
            const list = this.hints.filter(item => (
                    item.replaceAll(' ', '').indexOf(word) >= 0
                ))
                .sort((a, b) => {
                    const a_nospace = a.replaceAll(' ', '')
                    const b_nospace = b.replaceAll(' ', '')

                    // Exact check
                    if (b === word) return 4
                    if (a === word) return -4

                    // Same character start
                    if (b_nospace.startsWith(word)) return 3
                    if (a_nospace.startsWith(word)) return -3

                    // Has exact word
                    if (b.split(' ').indexOf(word) > -1) return 2
                    if (a.split(' ').indexOf(word) > -1) return -2
                    
                    // Include word
                    if (b_nospace.indexOf(word) > -1) return 1
                    if (a_nospace.indexOf(word) > -1) return -1
                    
                    // Other
                    return 0
                })
                .slice(0, this.limit)
                
            return { 
                list: list,
                from: CodeMirror.Pos(cursor.line, start),
                to: CodeMirror.Pos(cursor.line, end)
            }
        })
    }

}

function Storage(props) {

    function load(){
        for (const key in props){
            const { default_val, bind } = props[key]
            let val = localStorage.getItem(key)

            if (typeof default_val != 'undefined' && typeof val != typeof default_val){
                val = default_val
            }

            if (typeof bind != 'undefined'){
                bind.value = val
            } else {
                props[key].value = val
            }
        }
    }

    function save(){
        for (const key in props){
            const { bind, value } = props[key]

            if (typeof bind == 'undefined'){
                localStorage.setItem(key, value)
            } else {
                localStorage.setItem(key, bind.value)
            }
        } 
    }
    return { load, save }
}



function Firebase(config){
    let firebase, database, is_connected
    let App, Database

    async function init(){
        await load_libs()

        try {
            firebase = App.initializeApp(config)
            database = Database.getDatabase(firebase)
        } catch {
            is_connected = false
            console.log('failed connected to firebase')
            return
        }
        console.log('connected to firebase')
        is_connected = true
    }

    async function load_libs(){
        const lib_base_url = 'https://www.gstatic.com/firebasejs/10.12.2/'
        App = await import(lib_base_url + 'firebase-app.js')
        Database = await import(lib_base_url + 'firebase-database.js')
    }

    function save(path, value){
        if (!is_connected) return
        return Database.set(Database.ref(database, path), value)
    }

    function on_change(path, callback){
        if (!is_connected) return
        return Database.onValue(Database.ref(database, path), callback)
    }

    return { is_connected, init, save, on_change }
}

// need:  append_style()
const Spinner = {
    show: function(){ this.set(true) },
    hide: function(){ this.set(false) },
    set: function(visible = true){
        let container = document.querySelector('.loader-container')
        container = container ?? this.create()
        container.classList.toggle('hidden', !visible)
    },
    create: function(){
        const container = document.createElement('div')
        container.setAttribute('class', 'loader-container')
        container.innerHTML = '<span class="loader"></span>'
        document.body.appendChild(container)

        this.apply_style()
        return container
    },
    apply_style: function(){
        return append_style(`
            /* Loader */
            .loader-container.hidden { display: none; }
            .loader-container {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                z-index: 10;
                background-color: var(--bg-color, #263038);
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .loader {
                width: 48px;
                height: 48px;
                border: 5px solid var(--fg-color, #FFF);
                border-bottom-color: var(--primary-color, #FF3D00);
                border-radius: 50%;
                display: inline-block;
                box-sizing: border-box;
                animation: rotation 1s linear infinite;
            }

            @keyframes rotation {
                0%   { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `)
    }
}



// need sanitaize_start_whitespaces(), append_style()
class TabConainer {
    tabs = []
    selected_index = -1
    static styles_loaded = false

    constructor(parent_el){
        parent_el = parent_el || document.body

        const container = document.createElement('div')
        container.setAttribute('class', 'tab-container')
        container.innerHTML = sanitaize_start_whitespaces(`
            <div class="tab-content"></div>
            <div class="tab-buttons"></div>
        `)
        parent_el.append(container)

        if (!TabConainer.styles_loaded){
            this.apply_styles()
        }
    }
    add(name){
        const current_index = this.tabs.length
        const tab_buttons = document.querySelector('.tab-container .tab-buttons')
        const tab_content = document.querySelector('.tab-container .tab-content')

        if (!tab_buttons || !tab_content) return

        const btn = document.createElement('div')
        btn.setAttribute('class', 'btn-tab')
        btn.innerText = name
        btn.onclick = () => this.open(current_index)
        tab_buttons.append(btn)
        
        const body = document.createElement('div')
        body.setAttribute('class', 'tab-body')
        tab_content.append(body)
        
        this.tabs.push({ name, btn, body })

        if (this.tabs.length < 2) this.open(0)

        return this.get_tab(current_index)
    }
    get_tab(index){
        if (index < 0 || index >= this.tabs.length) return
        return this.tabs[index]
    }
    open(index){
        if (index < 0 || index >= this.tabs.length) return

        for (let i = 0; i < this.tabs.length; i++){
            const tab = this.tabs[i]
            
            if (i == index){
                tab.btn.classList.add('active')
                tab.body.classList.add('active')
                if (typeof tab.onclick == 'function') tab.onclick()
            } else {
                tab.btn.classList.remove('active')
                tab.body.classList.remove('active')
            }
        }
    }
    apply_styles(){
        append_style(`
            .tab-container {
                display: flex;
                flex-direction: row;
                min-height: 100vh;
            }
            .tab-buttons {
                width: fit-content;
                background-color: var(--bg-darker-color, hsl(200, 19%, 8%));
                display: flex;
                flex-direction: column;
            }
            .btn-tab {
                padding: .75rem .25rem;
                color: var(--fg-color, white);
                font-size: small;
                writing-mode: tb-rl;
                border-right: 2px solid transparent;
                cursor: pointer;
            }
            .btn-tab.active {
                background-color: var(--bg-color, hsl(200, 19%, 10%));
                border-right: 2px solid var(--primary-color, red);
            }
            .btn-tab:hover          { opacity: .8; }
            .tab-content            { flex: 1 1 auto!important; }
            .tab-body               { width: 100%; height: 100% }
            .tab-body:not(.active)  { display: none }
            .tab-body:not(.active) > div { display: none }
        `)
        TabConainer.styles_loaded = true
    }
    
}

// https://gist.github.com/josephm28/d3b19c906aee7a268dd28d71215427d1
function load_external(url, options) {
    
    let { timeout, module } = (options ?? {})
    timeout = timeout || 5000

    return new Promise((resolve, reject) => {

        // https://stackoverflow.com/questions/32461271/nodejs-timeout-a-promise-if-failed-to-complete-in-time
        const timer = setTimeout(() => {
            reject(new Error(`load ${url.split('/').pop()} timed out after ${timeout} ms`))
        }, timeout)

        const loaded_callback = (e) => {
            clearTimeout(timer)
            resolve(e)
        }
        const error_callback = (e) => {
            clearTimeout(timer)
            console.log('error callback')
            reject(e)
        }

        if (url.endsWith('.css')){
            load_css(url, { callback: loaded_callback, error_callback })

        } else if (url.endsWith('.js')){
            load_js(url, { callback: loaded_callback, error_callback, module })
        }
    })
}

function load_css(url, { callback, error_callback }){

    const exists = document.querySelector(`link[href="${url}"]`)
    if (exists) {
        if (typeof callback == 'function') {
            return callback(exists)
        } 
        return exists
    }

    const el = document.createElement('link')
    el.setAttribute('type', 'text/css')
    el.setAttribute('rel', 'stylesheet')
    el.setAttribute('href', url)

    if (typeof callback == 'function'){
        el.onload = (e) => callback(e.target)
    }
    if (typeof error_callback == 'function'){
        el.onerror = (e) => error_callback(e.target)
    }
    
    document.head.appendChild(el)

    return el
}

function load_js(url, { callback, error_callback, module }){

    const exists = document.querySelector(`script[src="${url}"]`)
    if (exists) {
        if (typeof callback == 'function') {
            return callback(exists)
        } 
        return exists
    }
    
    const el = document.createElement('script')
    
    if (module) {
        el.setAttribute('type', 'module')
    }
    if (typeof callback == 'function'){
        el.onload = (e) => callback(e.target)
    }
    if (typeof error_callback == 'function'){
        el.onerror = (e) => error_callback(e.target)
    }
    el.setAttribute('src', url)
    
    document.body.appendChild(el)

    return el
}

function append_style(style_str) {
    let style = document.querySelector('head style')

    if (!style) {
        style = document.createElement('style')
        document.head.appendChild(style)
    } 
    style.innerHTML += sanitaize_start_whitespaces(style_str)
}

function sanitaize_start_whitespaces(text){
    let min_spaces = Infinity
    for (const line of String(text).split('\n')){
        if (line.trim().length < 1) continue
        let index = 0
        while (index < line.length && /\s/.test(line.charAt(index))) index++
        min_spaces = Math.min(min_spaces, index)
    }
    if (min_spaces < 1 || !isFinite(min_spaces)) return text
    return String(text).split('\n')
        .map(line => (line.slice(min_spaces)))
        .join('\n').trim()
}

async function load_list_from_txt(url){
    const data = await fetch(url)
        .then(r => r.text())
        .then(data => {
            return data.split('\r\n')
                .map(x => x.trim())
                .filter(x => x.length > 0)
        })
    console.log('loaded of ' + data.length)
    return data
}
