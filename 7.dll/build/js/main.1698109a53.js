!function(e){function t(t){for(var n,c,i=t[0],a=t[1],f=t[3]||[],s=0,p=[];s<i.length;s++)c=i[s],Object.prototype.hasOwnProperty.call(r,c)&&r[c]&&p.push(r[c][0]),r[c]=0;for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n]);for(l&&l(t),f.forEach((function(e){if(void 0===r[e]){r[e]=null;var t=document.createElement("link");u.nc&&t.setAttribute("nonce",u.nc),t.rel="prefetch",t.as="script",t.href=o(e),document.head.appendChild(t)}}));p.length;)p.shift()()}var n={},r={0:0};function o(e){return u.p+"js/"+({1:"test"}[e]||e)+"."+{1:"c3af138f8c"}[e]+".js"}function u(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,u),r.l=!0,r.exports}u.e=function(e){var t=[],n=r[e];if(0!==n)if(n)t.push(n[2]);else{var c=new Promise((function(t,o){n=r[e]=[t,o]}));t.push(n[2]=c);var i,a=document.createElement("script");a.charset="utf-8",a.timeout=120,u.nc&&a.setAttribute("nonce",u.nc),a.src=o(e);var l=new Error;i=function(t){a.onerror=a.onload=null,clearTimeout(f);var n=r[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),u=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+o+": "+u+")",l.name="ChunkLoadError",l.type=o,l.request=u,n[1](l)}r[e]=void 0}};var f=setTimeout((function(){i({type:"timeout",target:a})}),12e4);a.onerror=a.onload=i,document.head.appendChild(a)}return Promise.all(t)},u.m=e,u.c=n,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="",u.oe=function(e){throw console.error(e),e};var c=window.webpackJsonp=window.webpackJsonp||[],i=c.push.bind(c);c.push=t,c=c.slice();for(var a=0;a<c.length;a++)t(c[a]);var l=i,f=u(u.s=1);t([[],{},0,[1]])}([function(e,t,n){e.exports=n(2)(1)},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r);console.log("index.js文件被加载"),console.log(o.a),document.getElementById("btn").onclick=function(){n.e(1).then(n.bind(null,3)).then(({mul:e})=>{console.log(e(4,5))})}},function(e,t){e.exports=jquery_1f5e31c5620ea2141df4}]);