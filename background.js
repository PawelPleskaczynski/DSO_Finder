var picArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
var random = Math.floor((Math.random() * 10));
window.onLoad = setbg();

function setbg() {
  var tempimg = new Image();
  tempimg.src = "images/" + picArr[random] + ".jpg";
  tempimg.onload = function(){
    jQuery("body").css("background","url(images/" + picArr[random] + ".jpg) no-repeat center center fixed");
    document.body.style.webkitBackgroundSize = "cover";
    document.body.style.mozBackgroundSize = "cover";
    document.body.style.oBackgroundSize = "cover";
    document.body.style.backgroundSize = "cover";
  };
}
