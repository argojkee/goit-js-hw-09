!function(){var t={startBtn:document.querySelector("[data-start"),stopBtn:document.querySelector("[data-stop")},e=null;function n(){return"#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}t.startBtn.addEventListener("click",(function(){document.body.style.backgroundColor="".concat(n()),e=setInterval((function(){document.body.style.backgroundColor="".concat(n())}),1e3),t.startBtn.setAttribute("disabled","disabled"),t.stopBtn.removeAttribute("disabled")})),t.stopBtn.addEventListener("click",(function(){clearInterval(e),t.startBtn.removeAttribute("disabled"),t.stopBtn.setAttribute("disabled","disabled")})),t.stopBtn.setAttribute("disabled","disabled")}();
//# sourceMappingURL=01-color-switcher.9f01fe49.js.map