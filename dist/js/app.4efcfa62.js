(function(e){function t(t){for(var r,a,c=t[0],u=t[1],s=t[2],l=0,p=[];l<c.length;l++)a=c[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&p.push(o[a][0]),o[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);f&&f(t);while(p.length)p.shift()();return i.push.apply(i,s||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,a=1;a<n.length;a++){var c=n[a];0!==o[c]&&(r=!1)}r&&(i.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},a={app:0},o={app:0},i=[];function c(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-981e5c8e":"24545af8","chunk-b663b6fe":"14c3428d"}[e]+".js"}function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"chunk-981e5c8e":1,"chunk-b663b6fe":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-981e5c8e":"2df356cf","chunk-b663b6fe":"3754b82c"}[e]+".css",o=u.p+r,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var s=i[c],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===o))return t()}var p=document.getElementsByTagName("style");for(c=0;c<p.length;c++){s=p[c],l=s.getAttribute("data-href");if(l===r||l===o)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||o,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete a[e],f.parentNode.removeChild(f),n(i)},f.href=o;var d=document.getElementsByTagName("head")[0];d.appendChild(f)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=i);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=c(e);var p=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(f);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;p.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",p.name="ChunkLoadError",p.type=r,p.request=a,n[1](p)}o[e]=void 0}};var f=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/",u.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var p=0;p<s.length;p++)t(s[p]);var f=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},1:function(e,t){},10:function(e,t){},11:function(e,t){},12:function(e,t){},13:function(e,t){},14:function(e,t){},2:function(e,t){},3:function(e,t){},4:function(e,t){},5:function(e,t){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{position:"relative","min-width":"768px"},attrs:{id:"app"}},[n("div",{staticClass:"pre-loader",class:{hide:e.isVisible}},[n("Preloader")],1),n(e.layout,{tag:"component"},[n("router-view")],1)],1)},o=[],i=n("5530"),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"grey darken-1 empty-layout"},[n("router-view")],1)},u=[],s={name:"emptyLayout"},l=s,p=n("2877"),f=Object(p["a"])(l,c,u,!1,null,null,null),d=f.exports,m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-main-layout"},[n("navbar",{on:{click:function(t){e.isOpen=!e.isOpen}}}),n("main",{staticClass:"app-content row",class:{full:e.isOpen}},[n("div",{staticClass:"app-page"},[n("router-view")],1)])],1)},h=[],v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("nav",{staticClass:"navbar",staticStyle:{height:"30px !important",padding:"0 0.7rem"}},[n("div",{staticClass:"nav-wrapper"},[n("div",{staticStyle:{"margin-left":"5px"}},[e._v(e._s(e._f("dateFormat")(new Date,"DD.MM.YYYY")))]),n("div",{staticClass:"navbar-left"},[n("div",[e._v(" Всего заказов: "+e._s(e.DATA.orders_total))])]),n("div",[e._v("Beta version 0.1.1")]),n("div",{staticClass:"logout-wrapper"},[n("a",{attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.LOGOUT(t)}}},[e._v("Выход")])])])])},g=[],b=n("2f62"),y={name:"navbar",computed:Object(i["a"])({},Object(b["c"])(["DATA"])),methods:Object(i["a"])({},Object(b["b"])(["LOGOUT"]))},_=y,O=Object(p["a"])(_,v,g,!1,null,null,null),w=O.exports,S=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"sidenav app-sidenav",class:{open:!e.value},staticStyle:{top:"30px !important"}},[e._m(0)])},E=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",[n("li",[e._v("test")]),n("li",[e._v("test")]),n("li",[e._v("test")]),n("li",[e._v("test")])])}],A={props:["value"],name:"sidebar"},k=A,L=Object(p["a"])(k,S,E,!1,null,null,null),C=L.exports,j={name:"mainLayout",data:function(){return{isOpen:!0}},watch:{$route:"fetchData"},methods:{fetchData:function(){this.isOpen=!this.isOpen}},components:{navbar:w,sidebar:C}},x=j,P=Object(p["a"])(x,m,h,!1,null,null,null),R=P.exports,T=n("edd1"),D={computed:Object(i["a"])({layout:function(){return(this.$route.meta.layout||"empty")+"-layout"}},Object(b["d"])(["isVisible"])),components:{emptyLayout:d,mainLayout:R,Preloader:T["a"]}},$=D,I=(n("5c0b"),Object(p["a"])($,a,o,!1,null,null,null)),U=I.exports,B=(n("b0c0"),n("d3b7"),n("ac1f"),n("5319"),n("498a"),n("8c4f")),N=n("14b7"),H=n.n(N),G=n("bc3a"),V=n.n(G),Y={BASE_URL:"https://tracking-a.herokuapp.com",URL_API_SELLER_ONLINE:"https://api.seller-online.com/orders"};r["a"].use(B["a"]);var q=[{path:"/",name:"Home",meta:{layout:"main"},component:function(){return n.e("chunk-981e5c8e").then(n.bind(null,"bb51"))}},{path:"/login",name:"login",meta:{layout:"empty"},component:function(){return n.e("chunk-b663b6fe").then(n.bind(null,"dd7b"))}}],F=new B["a"]({mode:"history",base:"/",routes:q});F.beforeEach((function(e,t,n){var r="",a="",o=localStorage.getItem("token");if(o){o=o.replace("Bearer","");var i=H.a.decode(o.trim(),{complete:!0});r=i.payload.exp,a=Math.floor(Date.now()/1e3)}"login"!==e.name&&a>=r?(V.a.post("".concat(Y.BASE_URL,"/api/auth/logout"),{id:localStorage.getItem("seller-id")}).then((function(e){console.log(e),localStorage.removeItem("token")})).catch((function(e){return console.log(e)})),n("/login?message=session-expired")):n()}));var J=F,K=(n("96cf"),n("1da1")),z={actions:{login:function(e,t){return Object(K["a"])(regeneratorRuntime.mark((function n(){var r,a,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.dispatch,r=t.seller,a=t.password,o=t.token,n.abrupt("return",V.a.post("".concat(Y.BASE_URL,"/api/auth/login"),{seller:r,password:a,token:o}));case 3:case"end":return n.stop()}}),n)})))()}}},Q={actions:{main:function(e){return Object(K["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.commit,t.next=3,V.a.post("/api/",{id:localStorage.getItem("seller-id")},{baseURL:"".concat(Y.BASE_URL),timeout:5e3,headers:{Authorization:localStorage.getItem("token")}}).then((function(e){return n("SHOP_NAMES",e.data),e.data}));case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})))()}}};r["a"].use(b["a"]);var Z=new b["a"].Store({state:{isVisible:!0,shops:[],data:""},mutations:{SHOP_NAMES:function(e,t){e.shops=t},DATA_SHOP:function(e,t){e.data=t}},actions:{LOGOUT:function(){V.a.post("".concat(Y.BASE_URL,"/api/auth/logout"),{id:localStorage.getItem("seller-id")}).then((function(e){localStorage.removeItem("token"),J.push("/login?message=logout")})).catch((function(e){return console.log(e)}))},GET_DATA:function(e,t){return Object(K["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.commit,n.next=3,V.a.post("".concat(Y.URL_API_SELLER_ONLINE),t,{headers:{"Api-Key":localStorage.getItem("Zx21tL2eRrtOvvQq")||""}}).then((function(e){return r("DATA_SHOP",e.data)})).catch((function(e){return console.log(e)}));case 3:return n.abrupt("return",n.sent);case 4:case"end":return n.stop()}}),n)})))()},TRACE:function(e,t){e.commit;return V.a.post("".concat(Y.BASE_URL,"/api/track/trace"),t)}},getters:{MODAL:function(e){return e.isVisible},SHOPS:function(e){return e.shops},DATA:function(e){return e.data}},modules:{auth:z,main:Q}}),W=n("f3e7"),X=(n("6885"),{install:function(e,t){e.prototype.$message=function(e){M.toast({html:e})},e.prototype.$error=function(e){M.toast({html:"[Ошибка]: ".concat(e)})},e.prototype.$done=function(e){M.toast({html:e})},e.prototype.$counter=function(e){M.CharacterCounter.init(e)},e.prototype.$popup=function(){return M.Modal}}}),ee=n("7923"),te=n.n(ee),ne=(n("d1e78"),n("4380"));r["a"].config.productionTip=!1,r["a"].use(ne["b"]),r["a"].use(te.a),r["a"].use(W["a"]),r["a"].use(X),new r["a"]({router:J,store:Z,render:function(e){return e(U)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";n("9c0c")},6:function(e,t){},7:function(e,t){},8:function(e,t){},9:function(e,t){},"9c0c":function(e,t,n){},edd1:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},a=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"preloader-wrapper small active"},[n("div",{staticClass:"spinner-layer spinner-green-only"},[n("div",{staticClass:"circle-clipper left"},[n("div",{staticClass:"circle"})]),n("div",{staticClass:"gap-patch"},[n("div",{staticClass:"circle"})]),n("div",{staticClass:"circle-clipper right"},[n("div",{staticClass:"circle"})])])])}],o={name:"preloader"},i=o,c=n("2877"),u=Object(c["a"])(i,r,a,!1,null,null,null);t["a"]=u.exports}});
//# sourceMappingURL=app.4efcfa62.js.map