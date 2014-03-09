/*
  app v0.0.0 - 9/3/2014

  Author: _NAME_ - _EMAIL_
*/
(function(){!function(){var a;return a=function(){function a(){window.onload=function(a){return function(){return a.init()}}(this)}return a.prototype.init=function(){var a,b;return a=this.dom("#aberigle"),a.innerHTML=function(){var c,d,e,f;for(e=a.innerText.split(""),f=[],c=0,d=e.length;d>c;c++)b=e[c],f.push('<span id="'+b.toLowerCase()+'">'+b+"</span>");return f}().join("")},a.prototype.dom=function(a){var b;return b=document.querySelectorAll(a),1===b.length?b[0]:b},a}(),window.App=new a}()}).call(this);