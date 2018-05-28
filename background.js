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


function setbg() {
  jQuery(".btn").removeClass("btn-secondary");
  function mediaquery(mobile) {
    if (mobile.matches) {
      jQuery(".btn").addClass("btn-secondary" + mobile_pic_arr[randomMobile]);
      var tempimg = new Image();
      tempimg.src = "images/" + mobile_pic_arr[randomMobile] + ".jpg";
      tempimg.onload = function(){
        jQuery(".mobile_bg").css("background","url(images/" + mobile_pic_arr[randomMobile] + ".jpg) no-repeat center center");
        jQuery(".mobile_bg").css("background-size","cover");
      };
    } else {
      jQuery(".btn").addClass("btn-secondary" + pic_arr[random]);
      var tempimg = new Image();
      tempimg.src = "images/" + pic_arr[random] + ".jpg";
      tempimg.onload = function(){
        jQuery("body").css("background","url(images/" + pic_arr[random] + ".jpg) no-repeat center center fixed");
        jQuery("body").css("background-size","cover");
      };
    }
  }

  var mobile = window.matchMedia("(max-width: 730px)")
  mediaquery(mobile);
}

function setbgnight() {
  jQuery(".btn").removeClass("btn-secondary");
  function mediaquery(mobile) {
    if (mobile.matches) {
      jQuery(".btn").addClass("btn-secondary" + mobile_pic_arr_night[randomMobile_night]);
      var tempimg = new Image();
      tempimg.src = "images/" + mobile_pic_arr_night[randomMobile_night] + ".jpg";
      tempimg.onload = function(){
        jQuery(".mobile_bg").css("background","url(images/" + mobile_pic_arr_night[randomMobile_night] + ".jpg) no-repeat center center");
        jQuery(".mobile_bg").css("background-size","cover");
      };
    } else {
      jQuery(".btn").addClass("btn-secondary" + pic_arr_night[random_night]);
      var tempimg = new Image();
      tempimg.src = "images/" + pic_arr_night[random_night] + ".jpg";
      tempimg.onload = function(){
        jQuery("body").css("background","url(images/" + pic_arr_night[random_night] + ".jpg) no-repeat center center fixed");
        jQuery("body").css("background-size","cover");
      };
    }
  }

  var mobile = window.matchMedia("(max-width: 730px)")
  mediaquery(mobile);
}
