(function(e){function t(t){for(var s,i,r=t[0],o=t[1],l=t[2],u=0,b=[];u<r.length;u++)i=r[u],Object.prototype.hasOwnProperty.call(c,i)&&c[i]&&b.push(c[i][0]),c[i]=0;for(s in o)Object.prototype.hasOwnProperty.call(o,s)&&(e[s]=o[s]);d&&d(t);while(b.length)b.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],s=!0,r=1;r<n.length;r++){var o=n[r];0!==c[o]&&(s=!1)}s&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var s={},c={app:0},a=[];function i(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=s,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(n,s,function(t){return e[t]}.bind(null,s));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],o=r.push.bind(r);r.push=t,r=r.slice();for(var l=0;l<r.length;l++)t(r[l]);var d=o;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},1:function(e,t){},2:function(e,t){},3:function(e,t){},4:function(e,t){},5:function(e,t){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var s=n("7a23"),c={class:"container-fluid"},a={id:"temp-canvas"},i={class:"card m-3 shadow"},r={class:"row g-0 card-root",style:{"min-height":"35rem"}},o={class:"col-md-6 col-12 bg-dark img-container"},l=["src"],d=["src","alt"],u={key:0,class:"image-input"},b=Object(s["e"])("i",{class:"material-icons text-white my-2"}," add_a_photo ",-1),j=Object(s["e"])("label",{for:"image_input"},[Object(s["e"])("a",{class:"btn btn-success"},[Object(s["e"])("i",{class:"material-icons me-2"},"add"),Object(s["f"])(" Input Gambar ")])],-1),m=[b,j],f={key:1,class:"loading-mask"},p=Object(s["e"])("div",{class:"spinner-border text-primary",style:{width:"3rem",height:"3rem"}},[Object(s["e"])("span",{class:"visually-hidden"},"Loading...")],-1),h=Object(s["e"])("span",{class:"text-white"}," Memproses ",-1),O=[p,h],g={class:"col-md-6 col-12 d-flex flex-column p-3"},v=Object(s["e"])("span",{class:"text-end"},"Total",-1),y={class:"text-end"},x=Object(s["e"])("hr",null,null,-1),_={class:"d-flex flex-row align-items-center"},w=Object(s["e"])("i",{class:"material-icons me-2"},"filter_center_focus",-1),k=Object(s["f"])(" Deteksi "),P=[w,k],R=Object(s["e"])("i",{class:"material-icons me-2"},"cached",-1),I=Object(s["f"])(" Reset "),C=[R,I],L={key:0,class:"flex-fill text-end"},B=Object(s["e"])("i",{class:"material-icons me-2"},"timer",-1),D={class:"fs-6"};function M(e,t,n,b,j,p){var h=Object(s["l"])("ClassDetected"),w=Object(s["l"])("ModelStatus"),k=Object(s["l"])("InvoiceTable");return Object(s["j"])(),Object(s["d"])("div",c,[Object(s["o"])(Object(s["e"])("canvas",a,null,512),[[s["n"],!1]]),Object(s["o"])(Object(s["e"])("input",{type:"file",name:"image_input",ref:"ref_image_input",id:"image_input",onChange:t[0]||(t[0]=function(){return p._fileInputChanged&&p._fileInputChanged.apply(p,arguments)}),accept:"image/jpg, image/jpeg, image/png"},null,544),[[s["n"],!1]]),Object(s["e"])("div",i,[Object(s["e"])("div",r,[Object(s["e"])("div",o,[Object(s["o"])(Object(s["e"])("img",{id:"predict-image",alt:"Image",class:"img-fluid",src:j.imageUrl},null,8,l),[[s["n"],j.isImageLoaded]]),(Object(s["j"])(!0),Object(s["d"])(s["a"],null,Object(s["k"])(j.boundingBoxes,(function(e,t){return Object(s["o"])((Object(s["j"])(),Object(s["d"])("img",{src:e.bbox_data,alt:t,key:t},null,8,d)),[[s["n"],e.isVisible]])})),128)),j.isImageLoaded?Object(s["c"])("",!0):(Object(s["j"])(),Object(s["d"])("div",u,m)),Object(s["g"])(h,{detectedClasses:j.detectedClasses,onItemPressed:p._toggleVisiblityPressed},null,8,["detectedClasses","onItemPressed"]),j.isPredicting?(Object(s["j"])(),Object(s["d"])("div",f,O)):Object(s["c"])("",!0)]),Object(s["e"])("div",g,[Object(s["g"])(w,{isLoadingModel:j.isLoadingModel},null,8,["isLoadingModel"]),v,Object(s["e"])("h1",y,Object(s["m"])(p.PriceFormat(p.invoiceDetails.total,2))+"- ",1),x,Object(s["g"])(k,{tableData:p.invoice},null,8,["tableData"]),Object(s["e"])("div",_,[Object(s["e"])("button",{class:Object(s["h"])(["btn btn-primary me-2",{disabled:!j.isImageLoaded||j.isPredicted}]),onClick:t[1]||(t[1]=function(){return p._detectBtnPressed&&p._detectBtnPressed.apply(p,arguments)})},P,2),Object(s["e"])("button",{class:Object(s["h"])(["btn btn-danger me-2",{disabled:!j.isImageLoaded}]),onClick:t[2]||(t[2]=function(){return p._resetBtnPressed&&p._resetBtnPressed.apply(p,arguments)})},C,2),j.detectionTime?(Object(s["j"])(),Object(s["d"])("i",L,[B,Object(s["e"])("span",D,Object(s["m"])(j.detectionTime)+" ms",1)])):Object(s["c"])("",!0)])])])])])}var T=n("5530"),S=n("1da1"),F=(n("96cf"),n("d3b7"),n("3ca3"),n("ddb0"),n("2b3d"),n("9861"),n("159b"),n("d81d"),n("b0c0"),{class:"table-responsive flex-fill",style:{"max-height":"35rem","overflow-y":"auto"}}),U={class:"table table-striped"},V=Object(s["e"])("thead",null,[Object(s["e"])("tr",null,[Object(s["e"])("th",{class:"col-num"},[Object(s["e"])("span",{class:"text"})]),Object(s["e"])("th",{class:"col-title"},[Object(s["e"])("span",{class:"text"},"Nama Item")]),Object(s["e"])("th",{class:"col-accuracy"},[Object(s["e"])("span",{class:"text"},"Akurasi")]),Object(s["e"])("th",{class:"col-price"},[Object(s["e"])("span",{class:"text"},"Harga")])])],-1),A={key:0},E=Object(s["e"])("td",{colspan:"5",style:{"box-shadow":"none"}},[Object(s["e"])("div",{class:"d-flex flex-column align-items-center my-5"},[Object(s["e"])("i",{class:"text-secondary material-icons",style:{"font-size":"3rem"}}," production_quantity_limits "),Object(s["e"])("h5",{class:"text-secondary",style:{"font-size":"1.5rem"}}," Tidak ada barang ")])],-1),W=[E],q={class:"col-num"},z={class:"col-title"},H={class:"col-accuracy"},$={class:"col-price"};function N(e,t,n,c,a,i){return Object(s["j"])(),Object(s["d"])("div",F,[Object(s["e"])("table",U,[V,Object(s["e"])("tbody",null,[n.tableData.length?(Object(s["j"])(!0),Object(s["d"])(s["a"],{key:1},Object(s["k"])(n.tableData,(function(e,t){return Object(s["j"])(),Object(s["d"])("tr",{key:t},[Object(s["e"])("td",q,Object(s["m"])(t+1),1),Object(s["e"])("td",z,Object(s["m"])(e.class.name),1),Object(s["e"])("td",H,Object(s["m"])(i.AccuracyFormat(e.score)),1),Object(s["e"])("td",$,Object(s["m"])(i.PriceFormat(e.class.price)),1)])})),128)):(Object(s["j"])(),Object(s["d"])("tr",A,W))])])])}n("ac1f"),n("5319"),n("b680"),n("4d63"),n("c607"),n("2c3e"),n("25f0"),n("99af");var J=function(e,t,n){if(isNaN(e))return"-";var s="\\d(?=(\\d{"+(n||3)+"})+"+(t>0?"\\.":"$")+")";return e.toFixed(Math.max(0,~~t)).replace(new RegExp(s,"g"),"$&,")},G=function(e,t,n){return t=t||0,n=n||3,"Rp."+J(e,t,n)},K=function(e){return parseFloat(100*e).toFixed(1)+"%"},Q=function(e,t){var n=t/e;return n},X=function(e,t,n){var s=document.getElementById(e);s.width=n.naturalWidth,s.height=n.naturalHeight;var c=Q(n.offsetWidth,n.naturalWidth),a=s.getContext("2d");a.clearRect(0,0,a.canvas.width,a.canvas.height);var i=parseInt(14*c),r=parseInt(2*c),o=parseInt(4*c);a.font=i+"px sans-serif",a.textBaseline="top";var l=t.bbox[0],d=t.bbox[1],u=t.bbox[2],b=t.bbox[3],j=K(t.score),m="".concat(t.class.name," ").concat(j);a.strokeStyle=t.class.color,a.lineWidth=o,a.strokeRect(l,d,u,b),a.fillStyle=t.class.color;var f=a.measureText(m).width,p=i;return a.fillRect(l,d,f+2*r,p+2*r),a.fillStyle=t.class.font_color,a.fillText(m,l+r,d+r),s.toDataURL("image/png")},Y={props:{tableData:Array},methods:{AccuracyFormat:K,PriceFormat:G}},Z=(n("5d19"),n("6b0d")),ee=n.n(Z);const te=ee()(Y,[["render",N]]);var ne=te,se={key:0,class:"spinner-border spinner-border-sm"},ce=Object(s["e"])("span",{class:"visually-hidden"},"Loading...",-1),ae=[ce],ie={key:1,class:"material-icons me-2"};function re(e,t,n,c,a,i){return Object(s["j"])(),Object(s["d"])("span",{class:Object(s["h"])(["align-middle",n.isLoadingModel?"text-warning":"text-success"])},[n.isLoadingModel?(Object(s["j"])(),Object(s["d"])("div",se,ae)):(Object(s["j"])(),Object(s["d"])("i",ie,"check_circle ")),Object(s["e"])("span",null,Object(s["m"])(n.isLoadingModel?" Loading Model":" Models Loaded"),1)],2)}var oe={props:{isLoadingModel:Boolean}};const le=ee()(oe,[["render",re]]);var de=le,ue={class:"classes p-3"},be=["onClick"],je={key:0,class:"material-icons me-2"},me={key:1,class:"material-icons me-2"};function fe(e,t,n,c,a,i){return Object(s["j"])(),Object(s["d"])("div",ue,[(Object(s["j"])(!0),Object(s["d"])(s["a"],null,Object(s["k"])(n.detectedClasses,(function(e,t){return Object(s["j"])(),Object(s["d"])("div",{class:"btn btn-sm btn-secondary m-1",onClick:function(e){return i.itemPressed(t)},key:t,style:Object(s["i"])(e.isVisible?["--bs-btn-bg:"+e.color,"--bs-btn-color:"+e.font_color,"--bs-btn-border-color:"+e.color]:[])},[e.isVisible?(Object(s["j"])(),Object(s["d"])("i",je,"visibility")):(Object(s["j"])(),Object(s["d"])("i",me,"visibility_off")),Object(s["f"])(" "+Object(s["m"])("".concat(e.name," ( ").concat(e.quantity," )")),1)],12,be)})),128))])}var pe={props:{detectedClasses:Array},methods:{itemPressed:function(e){this.$emit("itemPressed",e)}}};const he=ee()(pe,[["render",fe]]);var Oe=he,ge=n("d4ec"),ve=n("ade3"),ye=(n("dca8"),n("ce1a"));ye["c"]("webgl");var xe=function e(t){var n=this,s=t.model_url,c=t.classes_url;Object(ge["a"])(this,e),Object(ve["a"])(this,"isModelLoaded",(function(){return null!==n.model})),Object(ve["a"])(this,"isClassesLoaded",(function(){return null!==n.classes})),Object(ve["a"])(this,"loadModel",Object(S["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object.freeze(ye["b"](n.model_url));case 2:n.model=e.sent;case 3:case"end":return e.stop()}}),e)})))),Object(ve["a"])(this,"loadClasses",Object(S["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch(n.classes_url).then((function(e){return e.json()}));case 2:return n.classes=e.sent,e.abrupt("return",n.classes);case 4:case"end":return e.stop()}}),e)})))),Object(ve["a"])(this,"detect",function(){var e=Object(S["a"])(regeneratorRuntime.mark((function e(t){var s,c,a,i=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(s=i.length>1&&void 0!==i[1]?i[1]:.5,n.isModelLoaded()){e.next=4;break}return console.error("Model not yet loaded"),e.abrupt("return",void 0);case 4:if(n.isClassesLoaded()){e.next=7;break}return console.error("Classes are empty"),e.abrupt("return",void 0);case 7:return e.t0=n.model,e.next=10,n._preprocessImg(t);case 10:return e.t1=e.sent,e.next=13,e.t0.executeAsync.call(e.t0,e.t1);case 13:return c=e.sent,a=n._buildDetectedObjects({classes:c[0].dataSync(),scores:c[1].arraySync(),boxes:c[5].arraySync(),classesDir:n.classes,threshold:s,frame:t}),e.abrupt("return",a);case 16:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Object(ve["a"])(this,"_preprocessImg",function(){var e=Object(S["a"])(regeneratorRuntime.mark((function e(t){var n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=ye["a"].fromPixels(t).toInt(),s=n.transpose([0,1,2]).expandDims(),e.abrupt("return",s);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Object(ve["a"])(this,"_buildDetectedObjects",(function(e){var t=e.scores,n=e.threshold,s=e.boxes,c=e.classes,a=e.classesDir,i=e.frame,r=[];return t[0].forEach((function(e,t){if(e>n){var o=[],l=s[0][t][0]*i.naturalHeight,d=s[0][t][1]*i.naturalWidth,u=s[0][t][2]*i.naturalHeight,b=s[0][t][3]*i.naturalWidth;o[0]=d,o[1]=l,o[2]=b-d,o[3]=u-l,r.push({class:a[c[t]],score:e.toFixed(4),bbox:o})}})),r})),this.model=null,this.classes=null,this.model_url=s,this.classes_url=c},_e=n("bee2"),we=function(){function e(t){Object(ge["a"])(this,e),Array.isArray(t)?this.raw_detection=t:this.raw_detection=[]}return Object(_e["a"])(e,[{key:"length",get:function(){return this.raw_detection.length}},{key:"groupedInvoice",get:function(){var e=[];return this.raw_detection.forEach((function(t){for(var n=!1,s=0;s<e.length;s++)if(t.class.id==e[s].id){n=!0,e[s].quantity++;break}n||e.push(Object(T["a"])(Object(T["a"])({},t.class),{},{quantity:1}))})),e}},{key:"invoice",get:function(){return this.raw_detection}},{key:"invoiceTotal",get:function(){return this.raw_detection.reduce((function(e,t){return e+t.class.price}),0)}}]),e}(),ke="./",Pe={name:"App",components:{InvoiceTable:ne,ModelStatus:de,ClassDetected:Oe},data:function(){return{objDetect:null,detectResult:null,boundingBoxes:[],classes:[],detectedClasses:[],imageUrl:"",imageSize:{width:0,height:0},isImageLoaded:!1,isLoadingModel:!1,isPredicting:!1,isPredicted:!1,detectionTime:0}},methods:{CreateBBoxUrlData:X,PriceFormat:G,_fileInputChanged:function(e){var t=e.target.files[0];this.imageUrl=URL.createObjectURL(t),""!=this.imageUrl&&(this.isImageLoaded=!0)},_detectBtnPressed:function(){var e=this;return Object(S["a"])(regeneratorRuntime.mark((function t(){var n,s,c,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return s=Date.now(),c=document.getElementById("predict-image"),e.isPredicting=!0,e.isPredicted=!1,t.t0=we,t.next=7,e.objDetect.detect(c,.5);case 7:t.t1=t.sent,e.detectResult=new t.t0(t.t1),(null===(n=e.detectResult)||void 0===n?void 0:n.length)>0?(e.renderBoundingBox(),e.isPredicted=!0,a=Date.now(),e.detectionTime=a-s,console.log("Time",e.detectionTime)):alert("Tidak terdeteksi produk"),e.isPredicting=!1;case 11:case"end":return t.stop()}}),t)})))()},_resetBtnPressed:function(){this.$refs.ref_image_input.value=null,this.boundingBoxes=[],this.detectedClasses=[],this.detectResult=null,this.imageUrl="",this.isImageLoaded=!1,this.isPredicted=!1,this.detectionTime=0},_toggleVisiblityPressed:function(e){var t=this,n=this.detectedClasses[e].id,s=this.detectedClasses[e].isVisible;this.detectedClasses[e].isVisible=!s,this.boundingBoxes.forEach((function(e,c){e.class_id==n&&(t.boundingBoxes[c].isVisible=!s)}))},renderBoundingBox:function(){var e=this;if(this.boundingBoxes=[],!(this.detectResult.length<1)){var t=document.getElementById("predict-image");this.detectedClasses=this.groupedInvoice.map((function(e){return Object(T["a"])(Object(T["a"])({},e),{},{isVisible:!0})})),this.detectResult.invoice.forEach((function(n){var s=e.CreateBBoxUrlData("temp-canvas",n,t);e.boundingBoxes.push({class_id:n.class.id,bbox_data:s,isVisible:!0})}))}}},computed:{invoice:function(){return this.detectResult?this.detectResult.invoice:[]},invoiceDetails:function(){return this.detectResult?{items:this.detectResult.length,total:this.detectResult.invoiceTotal}:{items:0,total:0}},groupedInvoice:function(){return this.detectResult?this.detectResult.groupedInvoice:[]}},mounted:function(){var e=this;return Object(S["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.isPredicted=!1,e.objDetect=new xe({model_url:ke+"model/model.json",classes_url:ke+"product_data.json"}),e.isLoadingModel=!0,t.next=5,e.objDetect.loadClasses();case 5:return e.classes=t.sent,t.next=8,e.objDetect.loadModel();case 8:e.isLoadingModel=!1;case 9:case"end":return t.stop()}}),t)})))()}};n("8df3");const Re=ee()(Pe,[["render",M]]);var Ie=Re;n("f9e3"),n("3108");Object(s["b"])(Ie).mount("#app")},"5d19":function(e,t,n){"use strict";n("b8dc")},6:function(e,t){},7:function(e,t){},"8df3":function(e,t,n){"use strict";n("e624")},b8dc:function(e,t,n){},e624:function(e,t,n){}});
//# sourceMappingURL=app.5734362d.js.map