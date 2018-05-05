//Imaging
var telescope_flength = document.getElementById("flength_input");
var pixel_size = document.getElementById("pixsize");
var resolution_width = document.getElementById("reswidth");
var resolution_height = document.getElementById("resheight");
var object_imaging = document.getElementById("object_name_img");
var image = document.getElementById("DSO_image");
var barlow_input = document.getElementById("barlow_input");


//Observing
var telescope_flength_obs = document.getElementById("flength_input");
var eyepiece_afov = document.getElementById("afov");
var eyepiece_flength = document.getElementById("eyepiece_flength");
var object_observing = document.getElementById("object_name_obs");

var fov_width_text = document.getElementById("fov_width_text");
var fov_height_text = document.getElementById("fov_height_text");
var resolution_text = document.getElementById("resolution_text");
var fov_width;
var fov_height;
var fov;
var img_type;

var loading_text = document.getElementById("loading_text");
var solar_system_obj = document.getElementById("solar_system_obj");

window.onload = jQuery("#link_left").attr("onclick","ra_plus()");
window.onload = jQuery("#link_right").attr("onclick","ra_minus()");
window.onload = jQuery("#link_up").attr("onclick","dec_plus()");
window.onload = jQuery("#link_down").attr("onclick","dec_minus()");

function imaging() {
  jQuery("#img_mode").show();
  jQuery("#obs_mode").hide();
  jQuery("#link_left").attr("onclick","ra_plus()");
  jQuery("#link_right").attr("onclick","ra_minus()");
  jQuery("#link_up").attr("onclick","dec_plus()");
  jQuery("#link_down").attr("onclick","dec_minus()");
  jQuery("#eyepiece_fov").hide();
  jQuery("#card").hide();
  jQuery("#loading_bg").hide();
  jQuery("#solar_system_obj").hide();
  jQuery("#DSO_image").show();
  jQuery("#fov_move_controls").show();
  jQuery("#card2").css("background","none");
  jQuery("#card2").css("height", "auto");
  document.getElementById("eyepiece_fov").src = "images/ui/eyepiece.png";
}

function observing() {
  jQuery("#img_mode").hide();
  jQuery("#obs_mode").show();
  jQuery("#link_left").attr("onclick","ra_plus_obs()");
  jQuery("#link_right").attr("onclick","ra_minus_obs()");
  jQuery("#link_up").attr("onclick","dec_plus_obs()");
  jQuery("#link_down").attr("onclick","dec_minus_obs()");
  jQuery("#eyepiece_fov").show();
  jQuery("#card").hide();
  jQuery("#loading_bg").hide();
  jQuery("#solar_system_obj").hide();
  jQuery("#DSO_image").show();
  jQuery("#fov_move_controls").show();
  jQuery("#card2").css("background","none");
  jQuery("#card2").css("height", "auto");
}


function fov_img() {
  var telescope_flength_v = telescope_flength.value;
  var pixel_size_v = pixel_size.value;
  var resolution_width_v = resolution_width.value;
  var resolution_height_v = resolution_height.value;
  var object_imaging_v = object_imaging.value;
  var barlow_input_v = barlow_input.value;
  if (barlow_input_v) {
    telescope_flength_v = telescope_flength_v * barlow_input_v;
  }

  if (telescope_flength_v != "" && pixel_size_v != "" && resolution_width_v != "" && resolution_height_v != "" && object_imaging_v != "") {
    var sensor_width = pixel_size_v * 0.001 * resolution_width_v;
    var sensor_height = pixel_size_v * 0.001 * resolution_height_v;
    fov_width = 3438 * sensor_width / telescope_flength_v;
    fov_height = 3438 * sensor_height / telescope_flength_v;
    var res = 206 * pixel_size_v / telescope_flength_v;

    fov_width_text.innerHTML = "Width: " + fov_width.toFixed(2) + " arcminutes";
    fov_height_text.innerHTML = "Height: " + fov_height.toFixed(2) + " arcminutes";
    resolution_text.innerHTML = "Resolution: " + res.toFixed(2) + " arcseconds/px"
    loading_text.innerHTML = "Loading...";

    if (object_imaging_v.toUpperCase() == "moon".toUpperCase()) {
      var height_fov = fov_height / fov_width;
      var width = jQuery("#card").width();
      jQuery("#loading_bg").hide();
      jQuery("#card2").show();
      jQuery("#card2").css("background","url(images/ui/black_square.png)");
      jQuery("#card2").css("height", width * height_fov);
      jQuery("#card").show();
      jQuery("#solar_system_obj").show();
      jQuery("#DSO_image").hide();
      jQuery("#fov_move_controls").hide();
      jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/moon.jpg)");
      jQuery("#solar_system_obj").css("backgroundSize","contain");
      jQuery("#solar_system_obj").css("backgroundPosition","center");
      var moon_width = 31 / fov_width;
      moon_width = moon_width * width
      jQuery("#solar_system_obj").css("width",moon_width + "px");
      jQuery("#solar_system_obj").css("height",moon_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var moon_width = 31 / fov_width;
        moon_width = moon_width * width
        jQuery("#solar_system_obj").css("width",moon_width + "px");
        jQuery("#solar_system_obj").css("height",moon_width + "px");
      }
    } else if (object_imaging_v.toUpperCase() == "mercury".toUpperCase()) {
      var height_fov = fov_height / fov_width;
      var width = jQuery("#card").width();
      jQuery("#loading_bg").hide();
      jQuery("#card2").show();
      jQuery("#card2").css("background","url(images/ui/black_square.png)");
      jQuery("#card2").css("height", width * height_fov);
      jQuery("#card").show();
      jQuery("#solar_system_obj").show();
      jQuery("#DSO_image").hide();
      jQuery("#fov_move_controls").hide();
      jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/mercury.jpg)");
      jQuery("#solar_system_obj").css("backgroundSize","contain");
      jQuery("#solar_system_obj").css("backgroundPosition","center");
      var mercury_width = 0.1666666 / fov_width;
      mercury_width = mercury_width * width
      jQuery("#solar_system_obj").css("width",mercury_width + "px");
      jQuery("#solar_system_obj").css("height",mercury_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var mercury_width = 0.1666666 / fov_width;
        mercury_width = mercury_width * width
        jQuery("#solar_system_obj").css("width",mercury_width + "px");
        jQuery("#solar_system_obj").css("height",mercury_width + "px");
      }
    } else if (object_imaging_v.toUpperCase() == "venus".toUpperCase()) {
      var height_fov = fov_height / fov_width;
      var width = jQuery("#card").width();
      jQuery("#loading_bg").hide();
      jQuery("#card2").show();
      jQuery("#card2").css("background","url(images/ui/black_square.png)");
      jQuery("#card2").css("height", width * height_fov);
      jQuery("#card").show();
      jQuery("#solar_system_obj").show();
      jQuery("#DSO_image").hide();
      jQuery("#fov_move_controls").hide();
      jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/venus.jpg)");
      jQuery("#solar_system_obj").css("backgroundSize","contain");
      jQuery("#solar_system_obj").css("backgroundPosition","center");
      var venus_width = 0.85 / fov_width;
      venus_width = venus_width * width
      jQuery("#solar_system_obj").css("width",venus_width + "px");
      jQuery("#solar_system_obj").css("height",venus_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var venus_width = 0.85 / fov_width;
        venus_width = venus_width * width
        jQuery("#solar_system_obj").css("width",venus_width + "px");
        jQuery("#solar_system_obj").css("height",venus_width + "px");
      }
    } else if (object_imaging_v.toUpperCase() == "mars".toUpperCase()) {
      var height_fov = fov_height / fov_width;
      var width = jQuery("#card").width();
      jQuery("#loading_bg").hide();
      jQuery("#card2").show();
      jQuery("#card2").css("background","url(images/ui/black_square.png)");
      jQuery("#card2").css("height", width * height_fov);
      jQuery("#card").show();
      jQuery("#solar_system_obj").show();
      jQuery("#DSO_image").hide();
      jQuery("#fov_move_controls").hide();
      jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/mars.jpg)");
      jQuery("#solar_system_obj").css("backgroundSize","contain");
      jQuery("#solar_system_obj").css("backgroundPosition","center");
      var mars_width = 0.3 / fov_width;
      mars_width = mars_width * width
      jQuery("#solar_system_obj").css("width",mars_width + "px");
      jQuery("#solar_system_obj").css("height",mars_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var mars_width = 0.3 / fov_width;
        mars_width = mars_width * width
        jQuery("#solar_system_obj").css("width",mars_width + "px");
        jQuery("#solar_system_obj").css("height",mars_width + "px");
      }
    } else if (object_imaging_v.toUpperCase() == "jupiter".toUpperCase()) {
      var height_fov = fov_height / fov_width;
      var width = jQuery("#card").width();
      jQuery("#loading_bg").hide();
      jQuery("#card2").show();
      jQuery("#card2").css("background","url(images/ui/black_square.png)");
      jQuery("#card2").css("height", width * height_fov);
      jQuery("#card").show();
      jQuery("#solar_system_obj").show();
      jQuery("#DSO_image").hide();
      jQuery("#fov_move_controls").hide();
      jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/jupiter.jpg)");
      jQuery("#solar_system_obj").css("backgroundSize","contain");
      jQuery("#solar_system_obj").css("backgroundPosition","center");
      var jupiter_width = 0.7 / fov_width;
      jupiter_width = jupiter_width * width
      jQuery("#solar_system_obj").css("width",jupiter_width + "px");
      jQuery("#solar_system_obj").css("height",jupiter_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var jupiter_width = 0.7 / fov_width;
        jupiter_width = jupiter_width * width
        jQuery("#solar_system_obj").css("width",jupiter_width + "px");
        jQuery("#solar_system_obj").css("height",jupiter_width + "px");
      }
    } else if (object_imaging_v.toUpperCase() == "saturn".toUpperCase()) {
      var height_fov = fov_height / fov_width;
      var width = jQuery("#card").width();
      jQuery("#loading_bg").hide();
      jQuery("#card2").show();
      jQuery("#card2").css("background","url(images/ui/black_square.png)");
      jQuery("#card2").css("height", width * height_fov);
      jQuery("#card").show();
      jQuery("#solar_system_obj").show();
      jQuery("#DSO_image").hide();
      jQuery("#fov_move_controls").hide();
      jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/saturn.jpg)");
      jQuery("#solar_system_obj").css("backgroundSize","contain");
      jQuery("#solar_system_obj").css("backgroundPosition","center");
      var saturn_width = 0.66666 / fov_width;
      saturn_width = saturn_width * width
      jQuery("#solar_system_obj").css("width",saturn_width + "px");
      jQuery("#solar_system_obj").css("height",saturn_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var saturn_width = 0.66666 / fov_width;
        saturn_width = saturn_width * width
        jQuery("#solar_system_obj").css("width",saturn_width + "px");
        jQuery("#solar_system_obj").css("height",saturn_width + "px");
      }
    } else if (object_imaging_v.toUpperCase() == "uranus".toUpperCase()) {
      var height_fov = fov_height / fov_width;
      var width = jQuery("#card").width();
      jQuery("#loading_bg").hide();
      jQuery("#card2").show();
      jQuery("#card2").css("background","url(images/ui/black_square.png)");
      jQuery("#card2").css("height", width * height_fov);
      jQuery("#card").show();
      jQuery("#solar_system_obj").show();
      jQuery("#DSO_image").hide();
      jQuery("#fov_move_controls").hide();
      jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/uranus.jpg)");
      jQuery("#solar_system_obj").css("backgroundSize","contain");
      jQuery("#solar_system_obj").css("backgroundPosition","center");
      var uranus_width = 0.061666 / fov_width;
      uranus_width = uranus_width * width
      jQuery("#solar_system_obj").css("width",uranus_width + "px");
      jQuery("#solar_system_obj").css("height",uranus_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var uranus_width = 0.061666 / fov_width;
        uranus_width = uranus_width * width
        jQuery("#solar_system_obj").css("width",uranus_width + "px");
        jQuery("#solar_system_obj").css("height",uranus_width + "px");
      }
    } else if (object_imaging_v.toUpperCase() == "neptune".toUpperCase()) {
      var height_fov = fov_height / fov_width;
      var width = jQuery("#card").width();
      jQuery("#loading_bg").hide();
      jQuery("#card2").show();
      jQuery("#card2").css("background","url(images/ui/black_square.png)");
      jQuery("#card2").css("height", width * height_fov);
      jQuery("#card").show();
      jQuery("#solar_system_obj").show();
      jQuery("#DSO_image").hide();
      jQuery("#fov_move_controls").hide();
      jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/neptune.jpg)");
      jQuery("#solar_system_obj").css("backgroundSize","contain");
      jQuery("#solar_system_obj").css("backgroundPosition","center");
      var neptune_width = 0.038333 / fov_width;
      neptune_width = neptune_width * width
      jQuery("#solar_system_obj").css("width",neptune_width + "px");
      jQuery("#solar_system_obj").css("height",neptune_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var neptune_width = 0.038333 / fov_width;
        neptune_width = neptune_width * width
        jQuery("#solar_system_obj").css("width",neptune_width + "px");
        jQuery("#solar_system_obj").css("height",neptune_width + "px");
      }
    } else if (object_imaging_v.toUpperCase() == "sun".toUpperCase()) {
      var height_fov = fov_height / fov_width;
      var width = jQuery("#card").width();
      jQuery("#loading_bg").hide();
      jQuery("#card2").show();
      jQuery("#card2").css("background","url(images/ui/black_square.png)");
      jQuery("#card2").css("height", width * height_fov);
      jQuery("#card").show();
      jQuery("#solar_system_obj").show();
      jQuery("#DSO_image").hide();
      jQuery("#fov_move_controls").hide();
      jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/sun.jpg)");
      jQuery("#solar_system_obj").css("backgroundSize","contain");
      jQuery("#solar_system_obj").css("backgroundPosition","center");
      var sun_width = 32 / fov_width;
      sun_width = sun_width * width
      jQuery("#solar_system_obj").css("width",sun_width + "px");
      jQuery("#solar_system_obj").css("height",sun_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var sun_width = 32 / fov_width;
        sun_width = sun_width * width
        jQuery("#solar_system_obj").css("width",sun_width + "px");
        jQuery("#solar_system_obj").css("height",sun_width + "px");
      }
    } else {
      jQuery("#loading_bg").hide();
      jQuery("#solar_system_obj").hide();
      jQuery("#DSO_image").show();
      jQuery("#fov_move_controls").show();
      jQuery("#card2").css("background","none");
      jQuery("#card2").css("height", "auto");
      jQuery("#loading_text").show();
      jQuery("#card").hide();
      jQuery("#loading_bg").hide();
      scroll_bottom();

      if (fov_width * fov_height <= 14400) {

        var requestURL = "https://calm-eyrie-13472.herokuapp.com/https://api.arcsecond.io/objects/" + object_imaging_v + "/?format=json";

        $.getJSON(requestURL, function (json) {
          var coords = json.ICRS_coordinates;
          ra = coords.right_ascension;
          dec = coords.declination;

          loading_text.innerHTML = "Loading image... This may take a while.";
          scroll_bottom();

          if (fov_width * fov_height > 5600) {
            image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov_width + "&y=" + fov_height + "&mime-type=download-gif&Sky-Survey=DSS1&equinox=J2000&statsmode=VO";
            img_type = "DSS1";
          } else {
            image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov_width + "&y=" + fov_height + "&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
            img_type = "DSS2";
          }

          image.onload = function() {
            jQuery("#card").fadeIn("slow");
            jQuery("#loading_text").hide();
            scroll_bottom_load();
          }

          image.onerror = function() {
            jQuery("#loading_text").fadeOut("slow");
          }
        })
      }
    }
  }
}

function fov_obs() {
  var telescope_flength_obs_v = telescope_flength_obs.value;
  var eyepiece_afov_v = eyepiece_afov.value;
  var eyepiece_flength_v = eyepiece_flength.value;
  var object_observing_v = object_observing.value;
  var barlow_input_v = barlow_input.value;
  if (barlow_input_v) {
    telescope_flength_obs_v = telescope_flength_obs_v * barlow_input_v;
  }
  loading_text.innerHTML = "Loading...";


  if (telescope_flength_obs_v != "" && eyepiece_afov_v != "" && eyepiece_flength_v != "" && object_observing_v != "") {
    var magnification = telescope_flength_obs_v / eyepiece_flength_v;
    fov = eyepiece_afov_v / magnification;
    fov = fov * 60;

    fov_width_text.innerHTML = "FoV size: " + fov.toFixed(2) + " arcminutes";
    resolution_text.innerHTML = "Magnification: " + magnification.toFixed(2) + "x";
    fov_height_text.innerHTML = "";

    if (object_observing_v.toUpperCase() == "moon".toUpperCase()) {
      document.getElementById("eyepiece_fov").src = "images/ui/eyepiece.png";
      var height_fov = fov;
      var width = jQuery("#card").width();
      jQuery("#loading_bg").hide();
      jQuery("#card2").show();
      jQuery("#card2").css("background","url(images/ui/black_square.png)");
      jQuery("#card2").css("height", width);
      jQuery("#card").show();
      jQuery("#solar_system_obj").show();
      jQuery("#DSO_image").hide();
      jQuery("#fov_move_controls").hide();
      jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/moon.jpg)");
      jQuery("#solar_system_obj").css("backgroundSize","contain");
      jQuery("#solar_system_obj").css("backgroundPosition","center");
      var moon_width = 31 / fov;
      moon_width = moon_width * width;
      jQuery("#solar_system_obj").css("width",moon_width + "px");
      jQuery("#solar_system_obj").css("height",moon_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var moon_width = 31 / fov;
        moon_width = moon_width * width
        jQuery("#solar_system_obj").css("width",moon_width + "px");
        jQuery("#solar_system_obj").css("height",moon_width + "px");
      }
    } else if (object_observing_v.toUpperCase() == "mercury".toUpperCase()) {
      document.getElementById("eyepiece_fov").src = "images/ui/eyepiece_red.png";
      var height_fov = fov;
      var width = jQuery("#card").width();
      jQuery("#loading_bg").hide();
      jQuery("#card2").show();
      jQuery("#card2").css("background","url(images/ui/black_square.png)");
      jQuery("#card2").css("height", width);
      jQuery("#card").show();
      jQuery("#solar_system_obj").show();
      jQuery("#DSO_image").hide();
      jQuery("#fov_move_controls").hide();
      jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/mercury.jpg)");
      jQuery("#solar_system_obj").css("backgroundSize","contain");
      jQuery("#solar_system_obj").css("backgroundPosition","center");
      var mercury_width = 0.1666666 / fov;
      mercury_width = mercury_width * width
      jQuery("#solar_system_obj").css("width",mercury_width + "px");
      jQuery("#solar_system_obj").css("height",mercury_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var mercury_width = 0.1666666 / fov;
        mercury_width = mercury_width * width
        jQuery("#solar_system_obj").css("width",mercury_width + "px");
        jQuery("#solar_system_obj").css("height",mercury_width + "px");
      }
    } else if (object_observing_v.toUpperCase() == "venus".toUpperCase()) {
      document.getElementById("eyepiece_fov").src = "images/ui/eyepiece_red.png";
      var height_fov = fov;
      var width = jQuery("#card").width();
      jQuery("#loading_bg").hide();
      jQuery("#card2").show();
      jQuery("#card2").css("background","url(images/ui/black_square.png)");
      jQuery("#card2").css("height", width);
      jQuery("#card").show();
      jQuery("#solar_system_obj").show();
      jQuery("#DSO_image").hide();
      jQuery("#fov_move_controls").hide();
      jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/venus.jpg)");
      jQuery("#solar_system_obj").css("backgroundSize","contain");
      jQuery("#solar_system_obj").css("backgroundPosition","center");
      var venus_width = 0.85 / fov;
      venus_width = venus_width * width
      jQuery("#solar_system_obj").css("width",venus_width + "px");
      jQuery("#solar_system_obj").css("height",venus_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var venus_width = 0.85 / fov;
        venus_width = venus_width * width
        jQuery("#solar_system_obj").css("width",venus_width + "px");
        jQuery("#solar_system_obj").css("height",venus_width + "px");
      }
    } else if (object_observing_v.toUpperCase() == "mars".toUpperCase()) {
      document.getElementById("eyepiece_fov").src = "images/ui/eyepiece_red.png";
      var height_fov = fov;
      var width = jQuery("#card").width();
      jQuery("#loading_bg").hide();
      jQuery("#card2").show();
      jQuery("#card2").css("background","url(images/ui/black_square.png)");
      jQuery("#card2").css("height", width);
      jQuery("#card").show();
      jQuery("#solar_system_obj").show();
      jQuery("#DSO_image").hide();
      jQuery("#fov_move_controls").hide();
      jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/mars.jpg)");
      jQuery("#solar_system_obj").css("backgroundSize","contain");
      jQuery("#solar_system_obj").css("backgroundPosition","center");
      var mars_width = 0.3 / fov;
      mars_width = mars_width * width
      jQuery("#solar_system_obj").css("width",mars_width + "px");
      jQuery("#solar_system_obj").css("height",mars_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var mars_width = 0.3 / fov;
        mars_width = mars_width * width
        jQuery("#solar_system_obj").css("width",mars_width + "px");
        jQuery("#solar_system_obj").css("height",mars_width + "px");
      }
    } else if (object_observing_v.toUpperCase() == "jupiter".toUpperCase()) {
      document.getElementById("eyepiece_fov").src = "images/ui/eyepiece_red.png";
      var height_fov = fov;
      var width = jQuery("#card").width();
      jQuery("#loading_bg").hide();
      jQuery("#card2").show();
      jQuery("#card2").css("background","url(images/ui/black_square.png)");
      jQuery("#card2").css("height", width);
      jQuery("#card").show();
      jQuery("#solar_system_obj").show();
      jQuery("#DSO_image").hide();
      jQuery("#fov_move_controls").hide();
      jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/jupiter.jpg)");
      jQuery("#solar_system_obj").css("backgroundSize","contain");
      jQuery("#solar_system_obj").css("backgroundPosition","center");
      var jupiter_width = 0.7 / fov;
      jupiter_width = jupiter_width * width
      jQuery("#solar_system_obj").css("width",jupiter_width + "px");
      jQuery("#solar_system_obj").css("height",jupiter_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var jupiter_width = 0.7 / fov;
        jupiter_width = jupiter_width * width
        jQuery("#solar_system_obj").css("width",jupiter_width + "px");
        jQuery("#solar_system_obj").css("height",jupiter_width + "px");
      }
    } else if (object_observing_v.toUpperCase() == "saturn".toUpperCase()) {
      document.getElementById("eyepiece_fov").src = "images/ui/eyepiece_red.png";
      var height_fov = fov;
      var width = jQuery("#card").width();
      jQuery("#loading_bg").hide();
      jQuery("#card2").show();
      jQuery("#card2").css("background","url(images/ui/black_square.png)");
      jQuery("#card2").css("height", width);
      jQuery("#card").show();
      jQuery("#solar_system_obj").show();
      jQuery("#DSO_image").hide();
      jQuery("#fov_move_controls").hide();
      jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/saturn.jpg)");
      jQuery("#solar_system_obj").css("backgroundSize","contain");
      jQuery("#solar_system_obj").css("backgroundPosition","center");
      var saturn_width = 0.66666 / fov;
      saturn_width = saturn_width * width
      jQuery("#solar_system_obj").css("width",saturn_width + "px");
      jQuery("#solar_system_obj").css("height",saturn_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var saturn_width = 0.66666 / fov;
        saturn_width = saturn_width * width
        jQuery("#solar_system_obj").css("width",saturn_width + "px");
        jQuery("#solar_system_obj").css("height",saturn_width + "px");
      }
    } else if (object_observing_v.toUpperCase() == "uranus".toUpperCase()) {
      document.getElementById("eyepiece_fov").src = "images/ui/eyepiece_red.png";
      var height_fov = fov;
      var width = jQuery("#card").width();
      jQuery("#loading_bg").hide();
      jQuery("#card2").show();
      jQuery("#card2").css("background","url(images/ui/black_square.png)");
      jQuery("#card2").css("height", width);
      jQuery("#card").show();
      jQuery("#solar_system_obj").show();
      jQuery("#DSO_image").hide();
      jQuery("#fov_move_controls").hide();
      jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/uranus.jpg)");
      jQuery("#solar_system_obj").css("backgroundSize","contain");
      jQuery("#solar_system_obj").css("backgroundPosition","center");
      var uranus_width = 0.061666 / fov;
      uranus_width = uranus_width * width
      jQuery("#solar_system_obj").css("width",uranus_width + "px");
      jQuery("#solar_system_obj").css("height",uranus_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var uranus_width = 0.061666 / fov;
        uranus_width = uranus_width * width
        jQuery("#solar_system_obj").css("width",uranus_width + "px");
        jQuery("#solar_system_obj").css("height",uranus_width + "px");
      }
    } else if (object_observing_v.toUpperCase() == "neptune".toUpperCase()) {
      document.getElementById("eyepiece_fov").src = "images/ui/eyepiece_red.png";
      var height_fov = fov;
      var width = jQuery("#card").width();
      jQuery("#loading_bg").hide();
      jQuery("#card2").show();
      jQuery("#card2").css("background","url(images/ui/black_square.png)");
      jQuery("#card2").css("height", width);
      jQuery("#card").show();
      jQuery("#solar_system_obj").show();
      jQuery("#DSO_image").hide();
      jQuery("#fov_move_controls").hide();
      jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/neptune.jpg)");
      jQuery("#solar_system_obj").css("backgroundSize","contain");
      jQuery("#solar_system_obj").css("backgroundPosition","center");
      var neptune_width = 0.038333 / fov;
      neptune_width = neptune_width * width
      jQuery("#solar_system_obj").css("width",neptune_width + "px");
      jQuery("#solar_system_obj").css("height",neptune_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var neptune_width = 0.038333 / fov;
        neptune_width = neptune_width * width
        jQuery("#solar_system_obj").css("width",neptune_width + "px");
        jQuery("#solar_system_obj").css("height",neptune_width + "px");
      }
    } else if (object_observing_v.toUpperCase() == "sun".toUpperCase()) {
      document.getElementById("eyepiece_fov").src = "images/ui/eyepiece.png";
      var height_fov = fov;
      var width = jQuery("#card").width();
      jQuery("#loading_bg").hide();
      jQuery("#card2").show();
      jQuery("#card2").css("background","url(images/ui/black_square.png)");
      jQuery("#card2").css("height", width);
      jQuery("#card").show();
      jQuery("#solar_system_obj").show();
      jQuery("#DSO_image").hide();
      jQuery("#fov_move_controls").hide();
      jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/sun.jpg)");
      jQuery("#solar_system_obj").css("backgroundSize","contain");
      jQuery("#solar_system_obj").css("backgroundPosition","center");
      var sun_width = 32 / fov;
      sun_width = sun_width * width
      jQuery("#solar_system_obj").css("width",sun_width + "px");
      jQuery("#solar_system_obj").css("height",sun_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var sun_width = 32 / fov;
        sun_width = sun_width * width
        jQuery("#solar_system_obj").css("width",sun_width + "px");
        jQuery("#solar_system_obj").css("height",sun_width + "px");
      }
    } else {
      document.getElementById("eyepiece_fov").src = "images/ui/eyepiece_red.png";
      jQuery("#loading_bg").hide();
      jQuery("#solar_system_obj").hide();
      jQuery("#DSO_image").show();
      jQuery("#fov_move_controls").show();
      jQuery("#card2").css("background","none");
      jQuery("#card2").css("height", "auto");
      jQuery("#loading_text").show();
      jQuery("#card").hide();
      jQuery("#loading_bg").hide();
      scroll_bottom();

      if (fov * fov <= 14400) {

        var requestURL = "https://calm-eyrie-13472.herokuapp.com/https://api.arcsecond.io/objects/" + object_observing_v + "/?format=json";

        $.getJSON(requestURL, function (json) {
          var coords = json.ICRS_coordinates;
          ra = coords.right_ascension;
          dec = coords.declination;

          loading_text.innerHTML = "Loading image... This may take a while.";
          scroll_bottom();

          if (fov > 75) {
            image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov + "&y=" + fov + "&mime-type=download-gif&Sky-Survey=DSS1&equinox=J2000&statsmode=VO";
            img_type = "DSS1";
          } else {
            image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov + "&y=" + fov + "&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
            img_type = "DSS2";
          }


          image.onload = function() {
            jQuery("#card").fadeIn("slow");
            jQuery("#loading_text").fadeOut("slow");
            scroll_bottom_load();
          }

          image.onerror = function() {
            jQuery("#loading_text").fadeOut("slow");
          }

        })
      }
    }
  }

}

function ra_plus() {
  ra = +ra + 0.1;

  jQuery("#loading_bg").show();
  image.onload = function () {
    jQuery("#loading_bg").hide();
  }
  if (img_type == "DSS1") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov_width + "&y=" + fov_height + "&mime-type=download-gif&Sky-Survey=DSS1&equinox=J2000&statsmode=VO";
  } else if (img_type == "DSS2") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov_width + "&y=" + fov_height + "&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
  }
}

function ra_minus() {
  ra = +ra - 0.1;

  jQuery("#loading_bg").show();
  image.onload = function () {
    jQuery("#loading_bg").hide();
  }
  if (img_type == "DSS1") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov_width + "&y=" + fov_height + "&mime-type=download-gif&Sky-Survey=DSS1&equinox=J2000&statsmode=VO";
  } else if (img_type == "DSS2") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov_width + "&y=" + fov_height + "&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
  }
}

function dec_plus() {
  dec = +dec + 0.1;

  jQuery("#loading_bg").show();
  image.onload = function () {
    jQuery("#loading_bg").hide();
  }
  if (img_type == "DSS1") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov_width + "&y=" + fov_height + "&mime-type=download-gif&Sky-Survey=DSS1&equinox=J2000&statsmode=VO";
  } else if (img_type == "DSS2") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov_width + "&y=" + fov_height + "&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
  }
}

function dec_minus() {
  dec = +dec - 0.1;

  jQuery("#loading_bg").show();
  image.onload = function () {
    jQuery("#loading_bg").hide();
  }
  if (img_type == "DSS1") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov_width + "&y=" + fov_height + "&mime-type=download-gif&Sky-Survey=DSS1&equinox=J2000&statsmode=VO";
  } else if (img_type == "DSS2") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov_width + "&y=" + fov_height + "&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
  }
}

function ra_plus_obs() {
  ra = +ra + 0.1;

  jQuery("#loading_bg").show();
  image.onload = function () {
    jQuery("#loading_bg").hide();
  }
  if (img_type == "DSS1") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov + "&y=" + fov + "&mime-type=download-gif&Sky-Survey=DSS1&equinox=J2000&statsmode=VO";
  } else if (img_type == "DSS2") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov + "&y=" + fov + "&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
  }
}

function ra_minus_obs() {
  ra = +ra - 0.1;

  jQuery("#loading_bg").show();
  image.onload = function () {
    jQuery("#loading_bg").hide();
  }
  if (img_type == "DSS1") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov + "&y=" + fov + "&mime-type=download-gif&Sky-Survey=DSS1&equinox=J2000&statsmode=VO";
  } else if (img_type == "DSS2") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov + "&y=" + fov + "&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
  }
}

function dec_plus_obs() {
  dec = +dec + 0.1;

  jQuery("#loading_bg").show();
  image.onload = function () {
    jQuery("#loading_bg").hide();
  }
  if (img_type == "DSS1") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov + "&y=" + fov + "&mime-type=download-gif&Sky-Survey=DSS1&equinox=J2000&statsmode=VO";
  } else if (img_type == "DSS2") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov + "&y=" + fov + "&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
  }
}

function dec_minus_obs() {
  dec = +dec - 0.1;

  jQuery("#loading_bg").show();
  image.onload = function () {
    jQuery("#loading_bg").hide();
  }
  if (img_type == "DSS1") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov + "&y=" + fov + "&mime-type=download-gif&Sky-Survey=DSS1&equinox=J2000&statsmode=VO";
  } else if (img_type == "DSS2") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov + "&y=" + fov + "&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
  }
}

function scroll_bottom() {
  $('html,body').animate({
    scrollTop: $("#loading_text").offset().top
  }, 1000);
}

function scroll_bottom_load() {
  $('html,body').animate({
    scrollTop: $("#card").offset().top
  }, 1000);
}

function lucky() {
  var cat_array = ["M","NGC","PGC","Arp","HCG"];
  var messier_numbers = Math.floor(Math.random() * 110) + 1;
  var pgc_numbers = Math.floor(Math.random() * 130000) + 1;
  var ngc_numbers = Math.floor(Math.random() * 7840) + 1;
  var arp_numbers = Math.floor(Math.random() * 338) + 1;
  var hcg_numbers = Math.floor(Math.random() * 100) + 1;
  var catalog_array = Math.floor(Math.random() * 5);
  var number_final;
  if (catalog_array == 0) {
    number_final = messier_numbers;
  } else if (catalog_array == 1) {
    number_final = ngc_numbers;
  } else if (catalog_array == 2) {
    number_final = pgc_numbers;
  } else if (catalog_array == 3) {
    number_final = arp_numbers;
  } else if (catalog_array == 4) {
    number_final = hcg_numbers;
  }
  var lucky_obj = cat_array[catalog_array] + " " + number_final;
  window.open("object.html?obj=" + lucky_obj + "&lucky=true","_self");
}

function barlow_show() {
  if (document.getElementById("barlow_check").checked) {
    jQuery("#barlow_div").fadeIn("300");
  } else {
    jQuery("#barlow_div").fadeOut("300");
    document.getElementById("barlow_input").value = "";
  }
}
