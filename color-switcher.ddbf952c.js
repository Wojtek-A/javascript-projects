!function(){var e=document.querySelector("body"),t=document.querySelector("[data-start]"),a=document.querySelector("[data-stop");a.disabled=!0;var d=null;t.addEventListener("click",(function(){d=setInterval((function(){e.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),t.disabled=!0,a.disabled=!1})),a.addEventListener("click",(function(){clearInterval(d),t.disabled=!1,a.disabled=!0}))}();
//# sourceMappingURL=color-switcher.ddbf952c.js.map
