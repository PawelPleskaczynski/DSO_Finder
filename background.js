var pic_arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
var mobile_pic_arr = ['1', '2', '3', '5', '6', '7', '10'];
var pic_arr_night = ['1', '3', '4', '6', '7', '10'];
var mobile_pic_arr_night = ['1', '3', '6', '7', '10'];
var random = Math.floor((Math.random() * 10));
var randomMobile = Math.floor((Math.random() * 7));
var random_night = Math.floor((Math.random() * 6));
var randomMobile_night = Math.floor((Math.random() * 5));
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
      var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
      var isFirefox = typeof InstallTrigger !== 'undefined';
      var isChrome = !!window.chrome && !!window.chrome.webstore;
      var isIE = /*@cc_on!@*/false || !!document.documentMode;
      var isEdge = !isIE && !!window.StyleMedia;
      var moon = 9;

      var no_ie = (isChrome || isFirefox || isOpera);
      var is_ie = (isIE || isEdge);

      if (no_ie) {
        jQuery("body").addClass("no_scroll");
      }

      if (no_ie) {
        if (pic_arr[random] == moon) {
          var tempimg = new Image();
          tempimg.src = "images/" + pic_arr[random] + ".jpg";
          jQuery(".layer1").hide();
          jQuery(".layer2").hide();
        } else {
          var tempimg = new Image();
          tempimg.src = "images/" + pic_arr[random] + "_starless.jpg";
        }
      } else {
        var tempimg = new Image();
        tempimg.src = "images/" + pic_arr[random] + ".jpg";
      }
      jQuery(".layer1").hide();
      jQuery(".layer2").hide();
      jQuery(".btn").addClass("btn-secondary" + pic_arr[random]);
      tempimg.onload = function(){
        if (no_ie) {
          jQuery("body").removeClass("no_scroll");
          if (pic_arr[random] != moon) {
            var tempimg1 = new Image();
            var tempimg2 = new Image();
            tempimg1.src = "images/" + pic_arr[random] + "_stars_layer_1.jpg";
            tempimg2.src = "images/" + pic_arr[random] + "_stars_layer_2.jpg";
            jQuery(".bg").css("background","url(images/" + pic_arr[random] + "_starless.jpg) no-repeat center center fixed");
            jQuery(".bg").css("background-size","cover");
            jQuery(".layer1").css("background","url(images/" + pic_arr[random] + "_stars_layer_1.jpg) no-repeat center center fixed");
            jQuery(".layer1").css("background-size","cover");
            jQuery(".layer1").css("mix-blend-mode","screen");
            jQuery(".layer2").css("background","url(images/" + pic_arr[random] + "_stars_layer_2.jpg) no-repeat center center fixed");
            jQuery(".layer2").css("background-size","cover");
            jQuery(".layer2").css("mix-blend-mode","screen");
            var parallax = basicScroll.create({
              elem: document.querySelector('.bg'),
              from: 'top-top',
              to: 'bottom-top',
              props: {
                '--pageparallax': {
                  from: "0%",
                  to: "-5%"
                }
              }
            });

            parallax.start();

            tempimg1.onload = function() {
              jQuery(".layer1").fadeIn("slow");
              var parallax_layer_1 = basicScroll.create({
                elem: document.querySelector('.layer1'),
                from: 'top-top',
                to: 'bottom-top',
                props: {
                  '--pageparallax_layer1': {
                    from: "0%",
                    to: "-7.5%"
                  }
                }
              });

              parallax_layer_1.start();
            };
            tempimg2.onload = function() {
              jQuery(".layer2").fadeIn("slow");
              var parallax_layer_2 = basicScroll.create({
                elem: document.querySelector('.layer2'),
                from: 'top-top',
                to: 'bottom-top',
                props: {
                  '--pageparallax_layer2': {
                    from: "0%",
                    to: "-11.25%"
                  }
                }
              });

              parallax_layer_2.start();
            };

          } else {
            jQuery(".layer1").hide();
            jQuery(".layer2").hide();
            jQuery(".bg").css("background","url(images/" + pic_arr[random] + ".jpg) no-repeat center center fixed");
            jQuery(".bg").css("background-size","cover");
            var parallax = basicScroll.create({
              elem: document.querySelector('.bg'),
              from: 'top-top',
              to: 'bottom-top',
              props: {
                '--pageparallax': {
                  from: "0%",
                  to: "-5%"
                }
              }
            });

            parallax.start();
          }
        } else if (isIE || isEdge) {
          jQuery(".layer1").hide();
          jQuery(".layer2").hide();
          jQuery(".bg").css("background","url(images/" + pic_arr[random] + ".jpg) no-repeat center center fixed");
          jQuery(".bg").css("background-size","cover");
        } else {
          jQuery(".layer1").hide();
          jQuery(".layer2").hide();
          jQuery(".bg").css("background","url(images/" + pic_arr[random] + ".jpg) no-repeat center center fixed");
          jQuery(".bg").css("background-size","cover");
        }
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
      var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
      var isFirefox = typeof InstallTrigger !== 'undefined';
      var isChrome = !!window.chrome && !!window.chrome.webstore;
      var isIE = /*@cc_on!@*/false || !!document.documentMode;
      var isEdge = !isIE && !!window.StyleMedia;

      var no_ie = (isChrome || isFirefox || isOpera);
      var is_ie = (isIE || isEdge);

      if (no_ie) {
        jQuery("body").addClass("no_scroll");
      }

      if (no_ie) {
        var tempimg = new Image();
        tempimg.src = "images/" + pic_arr_night[random_night] + "_starless.jpg";
      } else {
        var tempimg = new Image();
        tempimg.src = "images/" + pic_arr_night[random_night] + ".jpg";
      }
      jQuery(".layer1").hide();
      jQuery(".layer2").hide();
      jQuery(".btn").addClass("btn-secondary" + pic_arr_night[random_night]);
      tempimg.onload = function(){
        if (no_ie) {
          var tempimg1 = new Image();
          var tempimg2 = new Image();
          tempimg1.src = "images/" + pic_arr_night[random_night] + "_stars_layer_1.jpg";
          tempimg2.src = "images/" + pic_arr_night[random_night] + "_stars_layer_2.jpg";
          jQuery("body").removeClass("no_scroll");
          jQuery(".bg").css("background","url(images/" + pic_arr_night[random_night] + "_starless.jpg) no-repeat center center fixed");
          jQuery(".bg").css("background-size","cover");
          jQuery(".layer1").css("background","url(images/" + pic_arr_night[random_night] + "_stars_layer_1.jpg) no-repeat center center fixed");
          jQuery(".layer1").css("background-size","cover");
          jQuery(".layer1").css("mix-blend-mode","screen");
          jQuery(".layer2").css("background","url(images/" + pic_arr_night[random_night] + "_stars_layer_2.jpg) no-repeat center center fixed");
          jQuery(".layer2").css("background-size","cover");
          jQuery(".layer2").css("mix-blend-mode","screen");
          var parallax = basicScroll.create({
            elem: document.querySelector('.bg'),
            from: 'top-top',
            to: 'bottom-top',
            props: {
              '--pageparallax': {
                from: "0%",
                to: "-5%"
              }
            }
          });

          parallax.start();

          tempimg1.onload = function() {
            jQuery(".layer1").fadeIn("slow");
            var parallax_layer_1 = basicScroll.create({
              elem: document.querySelector('.layer1'),
              from: 'top-top',
              to: 'bottom-top',
              props: {
                '--pageparallax_layer1': {
                  from: "0%",
                  to: "-7.5%"
                }
              }
            });

            parallax_layer_1.start();
          };
          tempimg2.onload = function() {
            jQuery(".layer2").fadeIn("slow");
            var parallax_layer_2 = basicScroll.create({
              elem: document.querySelector('.layer2'),
              from: 'top-top',
              to: 'bottom-top',
              props: {
                '--pageparallax_layer2': {
                  from: "0%",
                  to: "-11.25%"
                }
              }
            });

            parallax_layer_2.start();
          };

        } else if (isIE || isEdge) {
          jQuery(".layer1").hide();
          jQuery(".layer2").hide();
          jQuery(".bg").css("background","url(images/" + pic_arr_night[random_night] + ".jpg) no-repeat center center fixed");
          jQuery(".bg").css("background-size","cover");
        } else {
          jQuery(".layer1").hide();
          jQuery(".layer2").hide();
          jQuery(".bg").css("background","url(images/" + pic_arr_night[random_night] + ".jpg) no-repeat center center fixed");
          jQuery(".bg").css("background-size","cover");
        }
      };
    }
  }

  var mobile = window.matchMedia("(max-width: 730px)")
  mediaquery(mobile);
}
