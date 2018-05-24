var pic_arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
var mobile_pic_arr = ['1', '2', '3', '5', '6', '7', '10'];
var pic_arr_night = ['1', '3', '4', '6', '10'];
var mobile_pic_arr_night = ['1', '3', '6', '10'];
var random = Math.floor((Math.random() * 10));
var randomMobile = Math.floor((Math.random() * 7));
var random_night = Math.floor((Math.random() * 5));
var randomMobile_night = Math.floor((Math.random() * 4));
var date = new Date();
var hour = date.getHours();
if (hour > 10 && hour <= 16) {
  setbg();
} else {
  setbgnight();
}
var bg = document.getElementById("bg");

function setbg() {
  function mediaquery(mobile) {
    if (mobile.matches) {
      var tempimg = new Image();
      tempimg.src = "images/" + mobile_pic_arr[randomMobile] + ".jpg";
      tempimg.onload = function(){
        jQuery("#bg").css("background","url(images/" + mobile_pic_arr[randomMobile] + ".jpg) no-repeat center center fixed");
        bg.style.webkitBackgroundSize = "cover";
        bg.style.mozBackgroundSize = "cover";
        bg.style.oBackgroundSize = "cover";
        bg.style.backgroundSize = "cover";
      };
    } else {
      var tempimg = new Image();
      tempimg.src = "images/" + pic_arr[random] + ".jpg";
      tempimg.onload = function(){
        jQuery("#bg").css("background","url(images/" + pic_arr[random] + ".jpg) no-repeat center center fixed");
        bg.style.webkitBackgroundSize = "cover";
        bg.style.mozBackgroundSize = "cover";
        bg.style.oBackgroundSize = "cover";
        bg.style.backgroundSize = "cover";
      };
    }
  }

  var mobile = window.matchMedia("(max-width: 730px)")
  mediaquery(mobile);
}

function setbgnight() {
  function mediaquery(mobile) {
    if (mobile.matches) {
      var tempimg = new Image();
      tempimg.src = "images/" + mobile_pic_arr_night[randomMobile_night] + ".jpg";
      tempimg.onload = function(){
        jQuery("#bg").css("background","url(images/" + mobile_pic_arr_night[randomMobile_night] + ".jpg) no-repeat center center fixed");
        bg.style.webkitBackgroundSize = "cover";
        bg.style.mozBackgroundSize = "cover";
        bg.style.oBackgroundSize = "cover";
        bg.style.backgroundSize = "cover";
      };
    } else {
      var tempimg = new Image();
      tempimg.src = "images/" + pic_arr_night[random_night] + ".jpg";
      tempimg.onload = function(){
        jQuery("#bg").css("background","url(images/" + pic_arr_night[random_night] + ".jpg) no-repeat center center fixed");
        bg.style.webkitBackgroundSize = "cover";
        bg.style.mozBackgroundSize = "cover";
        bg.style.oBackgroundSize = "cover";
        bg.style.backgroundSize = "cover";
      };
    }
  }

  var mobile = window.matchMedia("(max-width: 730px)")
  mediaquery(mobile);
}
