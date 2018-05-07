var picArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
var mobilePicArr = ['1', '2', '3', '5', '6', '7', '10'];
var random = Math.floor((Math.random() * 10));
var randomMobile = Math.floor((Math.random() * 7));
window.onLoad = setbg();

function setbg() {
  function mediaquery(mobile) {
    if (mobile.matches) {
      var tempimg = new Image();
      tempimg.src = "images/" + mobilePicArr[randomMobile] + ".jpg";
      tempimg.onload = function(){
        jQuery("body").css("background","url(images/" + mobilePicArr[randomMobile] + ".jpg) no-repeat center center fixed");
        document.body.style.webkitBackgroundSize = "cover";
        document.body.style.mozBackgroundSize = "cover";
        document.body.style.oBackgroundSize = "cover";
        document.body.style.backgroundSize = "cover";
      };
    } else {
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
  }

  var mobile = window.matchMedia("(max-width: 730px)")
  mediaquery(mobile);
}
