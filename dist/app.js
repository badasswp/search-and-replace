(()=>{"use strict";var e={20:(e,t,r)=>{var n=r(609),o=Symbol.for("react.element"),a=Symbol.for("react.fragment"),c=Object.prototype.hasOwnProperty,i=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,s={key:!0,ref:!0,__self:!0,__source:!0};function l(e,t,r){var n,a={},l=null,d=null;for(n in void 0!==r&&(l=""+r),void 0!==t.key&&(l=""+t.key),void 0!==t.ref&&(d=t.ref),t)c.call(t,n)&&!s.hasOwnProperty(n)&&(a[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===a[n]&&(a[n]=t[n]);return{$$typeof:o,type:e,key:l,ref:d,props:a,_owner:i.current}}t.Fragment=a,t.jsx=l,t.jsxs=l},31:e=>{e.exports=window.wp.keyboardShortcuts},56:(e,t,r)=>{e.exports=function(e){var t=r.nc;t&&e.setAttribute("nonce",t)}},72:e=>{var t=[];function r(e){for(var r=-1,n=0;n<t.length;n++)if(t[n].identifier===e){r=n;break}return r}function n(e,n){for(var a={},c=[],i=0;i<e.length;i++){var s=e[i],l=n.base?s[0]+n.base:s[0],d=a[l]||0,p="".concat(l," ").concat(d);a[l]=d+1;var u=r(p),A={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==u)t[u].references++,t[u].updater(A);else{var f=o(A,n);n.byIndex=i,t.splice(i,0,{identifier:p,updater:f,references:1})}c.push(p)}return c}function o(e,t){var r=t.domAPI(t);return r.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;r.update(e=t)}else r.remove()}}e.exports=function(e,o){var a=n(e=e||[],o=o||{});return function(e){e=e||[];for(var c=0;c<a.length;c++){var i=r(a[c]);t[i].references--}for(var s=n(e,o),l=0;l<a.length;l++){var d=r(a[l]);0===t[d].references&&(t[d].updater(),t.splice(d,1))}a=s}}},87:e=>{e.exports=window.wp.element},100:(e,t,r)=>{r.d(t,{A:()=>i});var n=r(354),o=r.n(n),a=r(314),c=r.n(a)()(o());c.push([e.id,".editor-header__toolbar>*,.edit-post-header__toolbar>*{order:2}#search-replace-modal__text-group{display:flex;flex-direction:column;gap:1.25em}#search-replace-modal__button-group{display:flex;gap:10px}#search-replace-modal__button-group button{margin:0;width:50%;justify-content:center;width:calc(50% - 5px);box-sizing:border-box}#search-replace-modal__toggle{padding:1.6em 0}#search-replace-modal__notification{margin-top:-0.05em;margin-bottom:1.5em;padding:.75em 1.1em;background:#f1f1f1;border-left:5px solid #ff4500}#search-replace-modal__notification p{margin:0;padding:0}body #search-replace{order:1;z-index:1000;margin-left:-8px;margin-right:6px}body[class*=version-5-9-] #search-replace,body[class*=version-6-0-] #search-replace,body[class*=version-6-1-] #search-replace{margin-left:8.5px;margin-right:-26px}body[class*=version-6-2-] #search-replace,body[class*=version-6-3-] #search-replace,body[class*=version-6-4-] #search-replace{margin-left:8.5px;margin-right:-18px}body[class*=version-6-5-] #search-replace{margin-left:8.5px;margin-right:-14px}body[class*=version-6-6-] #search-replace{margin-left:8.5px;margin-right:-10px}","",{version:3,sources:["webpack://./src/styles/app.scss"],names:[],mappings:"AAEC,uDACC,OAAA,CAMA,kCACC,YAAA,CACA,qBAAA,CACA,UAAA,CAGD,oCACC,YAAA,CACA,QAAA,CAEA,2CACC,QAAA,CACA,SAAA,CACA,sBAAA,CACA,qBAAA,CACA,qBAAA,CAIF,8BACC,eAAA,CAGD,oCACC,kBAAA,CACA,mBAAA,CACA,mBAAA,CACA,kBAAA,CACA,6BAAA,CAEA,sCACC,QAAA,CACA,SAAA,CAOH,qBACC,OAAA,CACA,YAAA,CACA,gBAAA,CACG,gBAAA,CAMH,8HACC,iBAAA,CACA,kBAAA,CAOD,8HACC,iBAAA,CACA,kBAAA,CAKD,0CACC,iBAAA,CACA,kBAAA,CAKD,0CACC,iBAAA,CACA,kBAAA",sourcesContent:[".editor-header__toolbar,\n.edit-post-header__toolbar {\n\t& > * {\n\t\torder: 2;\n\t}\n}\n\n#search-replace {\n\t&-modal {\n\t\t&__text-group {\n\t\t\tdisplay: flex;\n\t\t\tflex-direction: column;\n\t\t\tgap: 1.25em;\n\t\t}\n\n\t\t&__button-group {\n\t\t\tdisplay: flex;\n\t\t\tgap: 10px;\n\n\t\t\tbutton {\n\t\t\t\tmargin: 0;\n\t\t\t\twidth: 50%;\n\t\t\t\tjustify-content: center;\n\t\t\t\twidth: calc(50% - 5px);\n\t\t\t\tbox-sizing: border-box;\n\t\t\t}\n\t\t}\n\n\t\t&__toggle {\n\t\t\tpadding: 1.6em 0;\n\t\t}\n\n\t\t&__notification {\n\t\t\tmargin-top: -0.05em;\n\t\t\tmargin-bottom: 1.5em;\n\t\t\tpadding: 0.75em 1.1em;\n\t\t\tbackground: #F1F1F1;\n\t\t\tborder-left: 5px solid orangered;\n\n\t\t\tp {\n\t\t\t\tmargin: 0;\n\t\t\t\tpadding: 0;\n\t\t\t}\n\t\t}\n\t}\n}\n\nbody {\n\t#search-replace {\n\t\torder: 1;\n\t\tz-index: 1000;\n\t\tmargin-left: -8px;\n    \tmargin-right: 6px;\n\t}\n\n\t&[class*='version-5-9-'],\n\t&[class*='version-6-0-'],\n\t&[class*='version-6-1-'] {\n\t\t#search-replace {\n\t\t\tmargin-left: 8.5px;\n\t\t\tmargin-right: -26px;\n\t\t}\n\t}\n\n\t&[class*='version-6-2-'],\n\t&[class*='version-6-3-'],\n\t&[class*='version-6-4-'] {\n\t\t#search-replace {\n\t\t\tmargin-left: 8.5px;\n\t\t\tmargin-right: -18px;\n\t\t}\n\t}\n\n\t&[class*='version-6-5-'] {\n\t\t#search-replace {\n\t\t\tmargin-left: 8.5px;\n\t\t\tmargin-right: -14px;\n\t\t}\n\t}\n\n\t&[class*='version-6-6-'] {\n\t\t#search-replace {\n\t\t\tmargin-left: 8.5px;\n\t\t\tmargin-right: -10px;\n\t\t}\n\t}\n}\n"],sourceRoot:""}]);const i=c},113:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}},143:e=>{e.exports=window.wp.data},177:(e,t,r)=>{r.d(t,{r:()=>i});var n=r(143),o=r(87),a=r(31),c=r(492);const i=({onKeyDown:e})=>((0,n.useDispatch)()("core/keyboard-shortcuts").registerShortcut({name:"search-replace-for-block-editor/shortcut",keyCombination:(0,c.xe)(),category:"global",description:"Search & Replace"}),(0,a.useShortcut)("search-replace-for-block-editor/shortcut",(0,o.useCallback)((()=>{e()}),[])),null)},206:(e,t,r)=>{var n=r(848),o=r(723),a=r(307),c=r(619),i=r(715),s=r(87),l=r(427),d=r(492);(0,c.addFilter)("blocks.registerBlockType","search-replace-for-block-editor/toolbar",(e=>{const{name:t,edit:r}=e;return-1===(0,d.h5)().indexOf(t)||(e.edit=e=>(0,n.jsxs)(s.Fragment,{children:[(0,n.jsx)(i.BlockControls,{children:(0,n.jsx)(l.ToolbarGroup,{children:(0,n.jsx)(l.ToolbarButton,{icon:a.A,label:"Edit",onClick:()=>{document.dispatchEvent((0,d.bQ)())},placeholder:(0,o.__)("Search & Replace","search-replace-for-block-editor"),onPointerEnterCapture:()=>{},onPointerLeaveCapture:()=>{}})})}),r(e)]})),e}))},262:(e,t,r)=>{r.d(t,{A:()=>u});var n=r(848),o=r(723),a=r(307),c=r(619),i=r(143),s=r(87),l=r(427),d=r(177),p=r(492);r(533);const u=()=>{const[e,t]=(0,s.useState)(0),[r,u]=(0,s.useState)(!1),[A,f]=(0,s.useState)(""),[h,m]=(0,s.useState)(""),[g,v]=(0,s.useState)(!1),[x,C]=(0,s.useState)(!1),b=()=>{u(!0),t(0)},y=()=>{u(!1),t(0)};(0,s.useEffect)((()=>{_()}),[A,g]);const _=(e=!1)=>{if(C(e),t(0),!A)return;const r=new RegExp(`(?<!<[^>]*)${A}(?<![^>]*<)`,(0,p.VZ)()||g?"g":"gi");(0,i.select)("core/block-editor").getBlocks().forEach((t=>{w(t,r,h,e)}))},w=(e,t,r,n)=>{const{name:o,innerBlocks:a}=e;if(-1!==(0,p.h5)().indexOf(o)){const a={element:e,pattern:t,text:r,status:n};(0,c.doAction)("search-replace-for-block-editor.replaceBlockAttribute",k,o,a)}a.length&&a.forEach((e=>{w(e,t,r,n)}))},k=(e,r)=>{const n={},{pattern:o,text:a,element:c,status:s}=e,{attributes:l,clientId:d}=c;if(void 0===l||void 0===l[r])return;const p=l[r].text||l[r],u=p.replace(o,(()=>(t((e=>e+1)),a)));u!==p&&(n[r]=u,s&&(0,i.dispatch)("core/block-editor").updateBlockAttributes(d,n))};(0,s.useEffect)((()=>{const e=(0,p.bv)();if(e&&e!==document)return e.addEventListener("selectionchange",S),()=>{e.removeEventListener("selectionchange",S)}}));const S=()=>{const e=(0,p.bv)().getSelection().toString();e&&!(0,p.N5)()&&f(e)};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)((()=>(0,p.gE)("6.4.0")?(0,n.jsx)(d.r,{onKeyDown:b}):null),{}),(0,n.jsx)(l.Tooltip,{text:(0,o.__)("Search & Replace","search-replace-for-block-editor"),children:(0,n.jsx)(l.Button,{icon:a.A,label:(0,o.__)("Search & Replace","search-replace-for-block-editor"),onClick:b})}),r&&(0,n.jsxs)(l.Modal,{title:(0,o.__)("Search & Replace","search-replace-for-block-editor"),onRequestClose:y,className:"search-replace-modal",children:[(0,n.jsxs)("div",{id:"search-replace-modal__text-group",children:[(0,n.jsx)(l.TextControl,{type:"text",label:(0,o.__)("Search"),value:A,onChange:e=>f(e),placeholder:"Lorem ipsum...",__nextHasNoMarginBottom:!0}),(0,n.jsx)(l.TextControl,{type:"text",label:(0,o.__)("Replace"),value:h,onChange:e=>m(e),__nextHasNoMarginBottom:!0})]}),(0,n.jsx)("div",{id:"search-replace-modal__toggle",children:(0,n.jsx)(l.ToggleControl,{label:(0,o.__)("Match Case | Expression","search-replace-for-block-editor"),checked:g,onChange:e=>{v(e)},__nextHasNoMarginBottom:!0})}),e?(0,n.jsx)("div",{id:"search-replace-modal__notification",children:(0,n.jsx)("p",{children:x?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("strong",{children:e})," ",(0,o.__)("item(s) replaced successfully","search-replace-for-block-editor"),"."]}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("strong",{children:e})," ",(0,o.__)("item(s) found","search-replace-for-block-editor"),"."]})})}):"",(0,n.jsxs)("div",{id:"search-replace-modal__button-group",children:[(0,n.jsx)(l.Button,{variant:"primary",onClick:()=>_(!0),children:(0,o.__)("Replace")}),(0,n.jsx)(l.Button,{variant:"secondary",onClick:y,children:(0,o.__)("Done")})]})]})]})}},307:(e,t,r)=>{r.d(t,{A:()=>a});var n=r(573),o=r(848);const a=(0,o.jsx)(n.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,o.jsx)(n.Path,{d:"M13 5c-3.3 0-6 2.7-6 6 0 1.4.5 2.7 1.3 3.7l-3.8 3.8 1.1 1.1 3.8-3.8c1 .8 2.3 1.3 3.7 1.3 3.3 0 6-2.7 6-6S16.3 5 13 5zm0 10.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"})})},314:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var r="",n=void 0!==t[5];return t[4]&&(r+="@supports (".concat(t[4],") {")),t[2]&&(r+="@media ".concat(t[2]," {")),n&&(r+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),r+=e(t),n&&(r+="}"),t[2]&&(r+="}"),t[4]&&(r+="}"),r})).join("")},t.i=function(e,r,n,o,a){"string"==typeof e&&(e=[[null,e,void 0]]);var c={};if(n)for(var i=0;i<this.length;i++){var s=this[i][0];null!=s&&(c[s]=!0)}for(var l=0;l<e.length;l++){var d=[].concat(e[l]);n&&c[d[0]]||(void 0!==a&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=a),r&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=r):d[2]=r),o&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=o):d[4]="".concat(o)),t.push(d))}},t}},338:(e,t,r)=>{var n=r(795);t.H=n.createRoot,n.hydrateRoot},354:e=>{e.exports=function(e){var t=e[1],r=e[3];if(!r)return t;if("function"==typeof btoa){var n=btoa(unescape(encodeURIComponent(JSON.stringify(r)))),o="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(n),a="/*# ".concat(o," */");return[t].concat([a]).join("\n")}return[t].join("\n")}},427:e=>{e.exports=window.wp.components},492:(e,t,r)=>{r.d(t,{Ec:()=>l,N5:()=>u,VZ:()=>s,_L:()=>d,bQ:()=>m,bv:()=>p,gE:()=>A,h5:()=>a,xe:()=>i});var n=r(619),o=r(997);const a=()=>(0,n.applyFilters)("search-replace-for-block-editor.allowedBlocks",c()),c=()=>{const e=(0,o.getBlockTypes)().filter((e=>!("text"!==(null==e?void 0:e.category)))).map((e=>null==e?void 0:e.name));return e.length?e:h()},i=()=>(0,n.applyFilters)("search-replace-for-block-editor.keyboardShortcut",{modifier:"primaryShift",character:"f"}),s=()=>(0,n.applyFilters)("search-replace-for-block-editor.caseSensitive",!1),l=()=>{let e=0;const t=A("6.6.0")?".editor-header__toolbar":".edit-post-header__toolbar";return new Promise(((r,n)=>{const o=setInterval((()=>{e+=100;const a=document.querySelector(t);a&&(clearInterval(o),r(a)),e>6e4&&(clearInterval(o),n(new Error("Unable to get Editor root container...")))}),100)}))},d=e=>{const t=document.createElement("div");return t.id="search-replace",e.appendChild(t),t},p=()=>{var e;const t=document.querySelector('iframe[name="editor-canvas"]');return t&&t instanceof HTMLIFrameElement?t.contentDocument||(null===(e=t.contentWindow)||void 0===e?void 0:e.document):document},u=()=>{const e=window.getSelection(),t=document.querySelector(".search-replace-modal");if(!(null==e?void 0:e.rangeCount)||!t)return!1;const r=e.getRangeAt(0);return t.contains(r.startContainer)&&t.contains(r.endContainer)},A=e=>{if("string"!=typeof e)return!1;const t=e,{wpVersion:r}=srfbe,n=t.split(".").map(Number),o=r.split(".").map(Number);if(3!==(null==n?void 0:n.length)||3!==(null==o?void 0:o.length))return!1;const a=f(n);return!(f(o)<a)},f=e=>{if(!Array.isArray(e))return 0;for(let t=0;t<e.length;t++)if(!Number.isInteger(e[t]))return 0;return e.reduce(((t,r,n)=>t+r*Math.pow(10,e.length-1-n)),0)},h=()=>["core/paragraph","core/heading","core/list","core/list-item","core/quote","core/code","core/details","core/missing","core/preformatted","core/pullquote","core/table","core/verse","core/footnotes","core/freeform"],m=()=>new KeyboardEvent("keydown",{key:"F",code:"KeyF",keyCode:70,charCode:70,shiftKey:!0,metaKey:!0,ctrlKey:!navigator.platform.includes("Mac"),bubbles:!0})},533:(e,t,r)=>{var n=r(72),o=r.n(n),a=r(825),c=r.n(a),i=r(659),s=r.n(i),l=r(56),d=r.n(l),p=r(540),u=r.n(p),A=r(113),f=r.n(A),h=r(100),m={};m.styleTagTransform=f(),m.setAttributes=d(),m.insert=s().bind(null,"head"),m.domAPI=c(),m.insertStyleElement=u(),o()(h.A,m),h.A&&h.A.locals&&h.A.locals},540:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},573:e=>{e.exports=window.wp.primitives},609:e=>{e.exports=window.React},619:e=>{e.exports=window.wp.hooks},659:e=>{var t={};e.exports=function(e,r){var n=function(e){if(void 0===t[e]){var r=document.querySelector(e);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}t[e]=r}return t[e]}(e);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");n.appendChild(r)}},715:e=>{e.exports=window.wp.blockEditor},723:e=>{e.exports=window.wp.i18n},795:e=>{e.exports=window.ReactDOM},825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(r){!function(e,t,r){var n="";r.supports&&(n+="@supports (".concat(r.supports,") {")),r.media&&(n+="@media ".concat(r.media," {"));var o=void 0!==r.layer;o&&(n+="@layer".concat(r.layer.length>0?" ".concat(r.layer):""," {")),n+=r.css,o&&(n+="}"),r.media&&(n+="}"),r.supports&&(n+="}");var a=r.sourceMap;a&&"undefined"!=typeof btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleTagTransform(n,e,t.options)}(t,e,r)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},830:(e,t,r)=>{(0,r(619).addAction)("search-replace-for-block-editor.replaceBlockAttribute","yourBlock",((e,t,r)=>{switch(t){case"core/quote":e(r,"citation");break;case"core/pullquote":e(r,"value"),e(r,"citation");break;case"core/details":e(r,"summary");break;default:e(r,"content")}}))},848:(e,t,r)=>{e.exports=r(20)},997:e=>{e.exports=window.wp.blocks}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var a=t[n]={id:n,exports:{}};return e[n](a,a.exports,r),a.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.nc=void 0;var n,o,a=r(848),c=r(795),i=r.n(c),s=r(338),l=(r(206),r(830),r(262)),d=r(492);o=function*(){try{const e=(0,d._L)(yield(0,d.Ec)());(0,d.gE)("6.2.0")?(0,s.H)(e).render((0,a.jsx)(l.A,{})):i().render((0,a.jsx)(l.A,{}),e)}catch(e){console.error(e)}},new((n=void 0)||(n=Promise))((function(e,t){function r(e){try{c(o.next(e))}catch(e){t(e)}}function a(e){try{c(o.throw(e))}catch(e){t(e)}}function c(t){var o;t.done?e(t.value):(o=t.value,o instanceof n?o:new n((function(e){e(o)}))).then(r,a)}c((o=o.apply(void 0,[])).next())}))})();
//# sourceMappingURL=app.js.map