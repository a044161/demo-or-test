!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n():"function"==typeof define&&define.amd?define(n):n()}(0,function(){"use strict";function e(e,n,o){return new Promise((t,r)=>{e.onsuccess=function(e){return t(n?n(e):e)},e.onerror=function(e){return r(o?o(e):e)}})}let n;const o=window.indexedDB.open("test",4);var t,r;o.onerror=function(e){console.error("数据库打开失败"),console.error(e)},o.onsuccess=function(e){n=o.result,console.log("数据库打开成功")},o.onupgradeneeded=function(e){n=e.target.result;const o=function(e,o={},t={}){o.keyPath||(o.autoIncrement=!0);if(!n.objectStoreNames.contains(e)){const r=n.createObjectStore(e,o);for(let e in t)r.createIndex(e,e,t[e])}}("demo");o&&o.createIndex("name","name",{unique:!1})},setTimeout(()=>{(t="demo",r=20,e(n.transaction(t).objectStore(t).get(r))).then(e=>{console.log(e)}),function(o){let t=[];return e(n.transaction(o).objectStore(o).openCursor(),function(e){const n=e.target.result;if(!n)return t;t.push(n.value),n.continue()})}("demo").then(e=>{console.log(e)})},2e3)});
