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
var img_type = "SDSS";
var res;

var moon_ang = 31.717;
var sun_ang = 31.992;
var mercury_ang = 0.146;
var venus_ang = 0.631;
var mars_ang = 0.238;
var jupiter_ang = 0.665;
var saturn_ang = 0.653;
var uranus_ang = 0.062;
var neptune_ang = 0.038;

var ra_final;
var dec_final;

var resolution_width_v;
var resolution_height_v;

var loading_text = document.getElementById("loading_text");
var solar_system_obj = document.getElementById("solar_system_obj");

//Regexes
var coord_regex = /^(?:([0-9]{1,3})(.|)([0-9]{1,3}|)( |)([-+])([0-9]{1,3})(.|)([0-9]{1,3}|))$/
var ra_dec_regex = /^(?:([0-9]{1,2})(| )(h|H)(| )([0-9]{1,2})(| )(m|M)(| )([0-9]+[|.|,][0-9]+|[0-9]+)(| )(s|S)(| )(|[+-−])([0-9]{1,2})(| )(d|D|°)(| )([0-9]{1,2})(| )(m|M|′|')(| )([0-9]+[|.|,][0-9]+|[0-9]+)(| )(s|S|″|"))$/
var ra_regex = /([0-9]{1,2})(| )(h|H)(| )([0-9]{1,2})(| )(m|M)(| )([0-9]+[|.|,][0-9]+|[0-9]+)(| )(s|S)/
var dec_regex = /(|[+-−])([0-9]{1,2})(| )(d|D|°)(| )([0-9]{1,2})(| )(m|M|′|')(| )([0-9]+[|.|,][0-9]+|[0-9]+)(| )(s|S|″|")/
var ra_h_regex = /([0-9]{1,2})(| )(h|H)/
var ra_m_regex = /([0-9]{1,2})(| )(m|M)/
var ra_s_regex = /([0-9]+[|.|,][0-9]+|[0-9]+)(| )(s|S)/
var dec_d_regex = /(|[+-−])([0-9]{1,2})(| )(d|D|°)/
var dec_m_regex = /([0-9]{1,2})(| )(m|M|′|')/
var dec_s_regex = /([0-9]+[|.|,][0-9]+|[0-9]+)(| )(s|S|″|")/

window.onload = jQuery("#link_left").attr("onclick","ra_plus()");
window.onload = jQuery("#link_right").attr("onclick","ra_minus()");
window.onload = jQuery("#link_up").attr("onclick","dec_plus()");
window.onload = jQuery("#link_down").attr("onclick","dec_minus()");

function imaging() {
  image.src = "";
  jQuery("#dso_big_fov").hide();
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
  jQuery(".alert-danger").hide();
  jQuery("#size").hide();
  moon_ang = 31.717;
  sun_ang = 31.992;
  mercury_ang = 0.146;
  venus_ang = 0.631;
  mars_ang = 0.238;
  jupiter_ang = 0.665;
  saturn_ang = 0.653;
  uranus_ang = 0.062;
  neptune_ang = 0.038;
}

function observing() {
  image.src = "";
  jQuery("#dso_big_fov").hide();
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
  jQuery(".alert-danger").hide();
  jQuery("#size").hide();
  moon_ang = 31.717;
  sun_ang = 31.992;
  mercury_ang = 0.146;
  venus_ang = 0.631;
  mars_ang = 0.238;
  jupiter_ang = 0.665;
  saturn_ang = 0.653;
  uranus_ang = 0.062;
  neptune_ang = 0.038;
}


function fov_img() {
  var telescope_flength_v = telescope_flength.value;
  var pixel_size_v = pixel_size.value;
  resolution_width_v = resolution_width.value;
  resolution_height_v = resolution_height.value;
  var object_imaging_v = object_imaging.value;
  var barlow_input_v = barlow_input.value;
  if (barlow_input_v) {
    telescope_flength_v = telescope_flength_v * barlow_input_v;
  }

  moon_ang = 31.717;
  sun_ang = 31.992;
  mercury_ang = 0.146;
  venus_ang = 0.631;
  mars_ang = 0.238;
  jupiter_ang = 0.665;
  saturn_ang = 0.653;
  uranus_ang = 0.062;
  neptune_ang = 0.038;

  if (telescope_flength_v != "" && pixel_size_v != "" && resolution_width_v != "" && resolution_height_v != "" && object_imaging_v != "") {
    var sensor_width = pixel_size_v * 0.001 * resolution_width_v;
    var sensor_height = pixel_size_v * 0.001 * resolution_height_v;
    fov_width = 3438 * sensor_width / telescope_flength_v;
    fov_height = 3438 * sensor_height / telescope_flength_v;
    res = 206 * pixel_size_v / telescope_flength_v;

    fov_width_text.innerHTML = "Width: " + fov_width.toFixed(2) + " arcminutes";
    fov_height_text.innerHTML = "Height: " + fov_height.toFixed(2) + " arcminutes";
    resolution_text.innerHTML = "Resolution: " + res.toFixed(2) + " arcseconds/px"
    loading_text.innerHTML = "Loading...";

    if (object_imaging_v.toUpperCase().trim() == "moon".toUpperCase()) {
      var height_fov = fov_height / fov_width;
      var width = jQuery("#card").width();
      jQuery("#average").addClass("active");
      jQuery("#apogee").removeClass("active");
      jQuery("#perigee").removeClass("active");
      jQuery("#size").fadeIn("slow");
      jQuery("#dso_big_fov").hide();
      jQuery(".alert-danger").hide();
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
      var moon_width = moon_ang / fov_width;
      moon_width = moon_width * width
      jQuery("#solar_system_obj").css("width",moon_width + "px");
      jQuery("#solar_system_obj").css("height",moon_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var moon_width = moon_ang / fov_width;
        moon_width = moon_width * width
        jQuery("#solar_system_obj").css("width",moon_width + "px");
        jQuery("#solar_system_obj").css("height",moon_width + "px");
      }
      jQuery("#apogee").click(function() {
        moon_ang = 29.333;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var moon_width = moon_ang / fov_width;
        moon_width = moon_width * width
        jQuery("#solar_system_obj").css("width",moon_width + "px");
        jQuery("#solar_system_obj").css("height",moon_width + "px");
      });
      jQuery("#average").click(function() {
        moon_ang = 31.717;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var moon_width = moon_ang / fov_width;
        moon_width = moon_width * width
        jQuery("#solar_system_obj").css("width",moon_width + "px");
        jQuery("#solar_system_obj").css("height",moon_width + "px");
      });
      jQuery("#perigee").click(function() {
        moon_ang = 34.1;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var moon_width = moon_ang / fov_width;
        moon_width = moon_width * width
        jQuery("#solar_system_obj").css("width",moon_width + "px");
        jQuery("#solar_system_obj").css("height",moon_width + "px");
      });
    } else if (object_imaging_v.toUpperCase().trim() == "mercury".toUpperCase()) {
      var height_fov = fov_height / fov_width;
      var width = jQuery("#card").width();
      jQuery("#average").addClass("active");
      jQuery("#apogee").removeClass("active");
      jQuery("#perigee").removeClass("active");
      jQuery("#size").fadeIn("slow");
      jQuery("#dso_big_fov").hide();
      jQuery(".alert-danger").hide();
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
      var mercury_width = mercury_ang / fov_width;
      mercury_width = mercury_width * width
      jQuery("#solar_system_obj").css("width",mercury_width + "px");
      jQuery("#solar_system_obj").css("height",mercury_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var mercury_width = mercury_ang / fov_width;
        mercury_width = mercury_width * width
        jQuery("#solar_system_obj").css("width",mercury_width + "px");
        jQuery("#solar_system_obj").css("height",mercury_width + "px");
      }
      jQuery("#apogee").click(function() {
        mercury_ang = 0.075;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var mercury_width = mercury_ang / fov_width;
        mercury_width = mercury_width * width
        jQuery("#solar_system_obj").css("width",mercury_width + "px");
        jQuery("#solar_system_obj").css("height",mercury_width + "px");
      });
      jQuery("#average").click(function() {
        mercury_ang = 0.146;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var mercury_width = mercury_ang / fov_width;
        mercury_width = mercury_width * width
        jQuery("#solar_system_obj").css("width",mercury_width + "px");
        jQuery("#solar_system_obj").css("height",mercury_width + "px");
      });
      jQuery("#perigee").click(function() {
        mercury_ang = 0.216;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var mercury_width = mercury_ang / fov_width;
        mercury_width = mercury_width * width
        jQuery("#solar_system_obj").css("width",mercury_width + "px");
        jQuery("#solar_system_obj").css("height",mercury_width + "px");
      });
    } else if (object_imaging_v.toUpperCase().trim() == "venus".toUpperCase()) {
      var height_fov = fov_height / fov_width;
      var width = jQuery("#card").width();
      jQuery("#average").addClass("active");
      jQuery("#apogee").removeClass("active");
      jQuery("#perigee").removeClass("active");
      jQuery("#size").fadeIn("slow");
      jQuery("#dso_big_fov").hide();
      jQuery(".alert-danger").hide();
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
      var venus_width = venus_ang / fov_width;
      venus_width = venus_width * width
      jQuery("#solar_system_obj").css("width",venus_width + "px");
      jQuery("#solar_system_obj").css("height",venus_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var venus_width = venus_ang / fov_width;
        venus_width = venus_width * width
        jQuery("#solar_system_obj").css("width",venus_width + "px");
        jQuery("#solar_system_obj").css("height",venus_width + "px");
      }
      jQuery("#apogee").click(function() {
        venus_ang = 0.161;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var venus_width = venus_ang / fov_width;
        venus_width = venus_width * width
        jQuery("#solar_system_obj").css("width",venus_width + "px");
        jQuery("#solar_system_obj").css("height",venus_width + "px");
      });
      jQuery("#average").click(function() {
        venus_ang = 0.631;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var venus_width = venus_ang / fov_width;
        venus_width = venus_width * width
        jQuery("#solar_system_obj").css("width",venus_width + "px");
        jQuery("#solar_system_obj").css("height",venus_width + "px");
      });
      jQuery("#perigee").click(function() {
        venus_ang = 1.1;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var venus_width = venus_ang / fov_width;
        venus_width = venus_width * width
        jQuery("#solar_system_obj").css("width",venus_width + "px");
        jQuery("#solar_system_obj").css("height",venus_width + "px");
      });
    } else if (object_imaging_v.toUpperCase().trim() == "mars".toUpperCase()) {
      var height_fov = fov_height / fov_width;
      var width = jQuery("#card").width();
      jQuery("#average").addClass("active");
      jQuery("#apogee").removeClass("active");
      jQuery("#perigee").removeClass("active");
      jQuery("#size").fadeIn("slow");
      jQuery("#dso_big_fov").hide();
      jQuery(".alert-danger").hide();
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
      var mars_width = mars_ang / fov_width;
      mars_width = mars_width * width
      jQuery("#solar_system_obj").css("width",mars_width + "px");
      jQuery("#solar_system_obj").css("height",mars_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var mars_width = mars_ang / fov_width;
        mars_width = mars_width * width
        jQuery("#solar_system_obj").css("width",mars_width + "px");
        jQuery("#solar_system_obj").css("height",mars_width + "px");
      }
      jQuery("#apogee").click(function() {
        mars_ang = 0.0583;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var mars_width = mars_ang / fov_width;
        mars_width = mars_width * width
        jQuery("#solar_system_obj").css("width",mars_width + "px");
        jQuery("#solar_system_obj").css("height",mars_width + "px");
      });
      jQuery("#average").click(function() {
        mars_ang = 0.238;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var mars_width = mars_ang / fov_width;
        mars_width = mars_width * width
        jQuery("#solar_system_obj").css("width",mars_width + "px");
        jQuery("#solar_system_obj").css("height",mars_width + "px");
      });
      jQuery("#perigee").click(function() {
        mars_ang = 0.418;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var mars_width = mars_ang / fov_width;
        mars_width = mars_width * width
        jQuery("#solar_system_obj").css("width",mars_width + "px");
        jQuery("#solar_system_obj").css("height",mars_width + "px");
      });
    } else if (object_imaging_v.toUpperCase().trim() == "jupiter".toUpperCase()) {
      var height_fov = fov_height / fov_width;
      var width = jQuery("#card").width();
      jQuery("#average").addClass("active");
      jQuery("#apogee").removeClass("active");
      jQuery("#perigee").removeClass("active");
      jQuery("#size").fadeIn("slow");
      jQuery("#dso_big_fov").hide();
      jQuery(".alert-danger").hide();
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
      var jupiter_width = jupiter_ang / fov_width;
      jupiter_width = jupiter_width * width
      jQuery("#solar_system_obj").css("width",jupiter_width + "px");
      jQuery("#solar_system_obj").css("height",jupiter_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var jupiter_width = jupiter_ang / fov_width;
        jupiter_width = jupiter_width * width
        jQuery("#solar_system_obj").css("width",jupiter_width + "px");
        jQuery("#solar_system_obj").css("height",jupiter_width + "px");
      }
      jQuery("#apogee").click(function() {
        jupiter_ang = 0.496;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var jupiter_width = jupiter_ang / fov_width;
        jupiter_width = jupiter_width * width
        jQuery("#solar_system_obj").css("width",jupiter_width + "px");
        jQuery("#solar_system_obj").css("height",jupiter_width + "px");
      });
      jQuery("#average").click(function() {
        jupiter_ang = 0.665;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var jupiter_width = jupiter_ang / fov_width;
        jupiter_width = jupiter_width * width
        jQuery("#solar_system_obj").css("width",jupiter_width + "px");
        jQuery("#solar_system_obj").css("height",jupiter_width + "px");
      });
      jQuery("#perigee").click(function() {
        jupiter_ang = 0.835;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var jupiter_width = jupiter_ang / fov_width;
        jupiter_width = jupiter_width * width
        jQuery("#solar_system_obj").css("width",jupiter_width + "px");
        jQuery("#solar_system_obj").css("height",jupiter_width + "px");
      });
    } else if (object_imaging_v.toUpperCase().trim() == "saturn".toUpperCase()) {
      var height_fov = fov_height / fov_width;
      var width = jQuery("#card").width();
      jQuery("#average").addClass("active");
      jQuery("#apogee").removeClass("active");
      jQuery("#perigee").removeClass("active");
      jQuery("#size").fadeIn("slow");
      jQuery("#dso_big_fov").hide();
      jQuery(".alert-danger").hide();
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
      var saturn_width = saturn_ang / fov_width;
      saturn_width = saturn_width * width
      jQuery("#solar_system_obj").css("width",saturn_width + "px");
      jQuery("#solar_system_obj").css("height",saturn_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var saturn_width = saturn_ang / fov_width;
        saturn_width = saturn_width * width
        jQuery("#solar_system_obj").css("width",saturn_width + "px");
        jQuery("#solar_system_obj").css("height",saturn_width + "px");
      }
      jQuery("#apogee").click(function() {
        saturn_ang = 0.583;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var saturn_width = saturn_ang / fov_width;
        saturn_width = saturn_width * width
        jQuery("#solar_system_obj").css("width",saturn_width + "px");
        jQuery("#solar_system_obj").css("height",saturn_width + "px");
      });
      jQuery("#average").click(function() {
        saturn_ang = 0.653;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var saturn_width = saturn_ang / fov_width;
        saturn_width = saturn_width * width
        jQuery("#solar_system_obj").css("width",saturn_width + "px");
        jQuery("#solar_system_obj").css("height",saturn_width + "px");
      });
      jQuery("#perigee").click(function() {
        saturn_ang = 0.723;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var saturn_width = saturn_ang / fov_width;
        saturn_width = saturn_width * width
        jQuery("#solar_system_obj").css("width",saturn_width + "px");
        jQuery("#solar_system_obj").css("height",saturn_width + "px");
      });
    } else if (object_imaging_v.toUpperCase().trim() == "uranus".toUpperCase()) {
      var height_fov = fov_height / fov_width;
      var width = jQuery("#card").width();
      jQuery("#average").addClass("active");
      jQuery("#apogee").removeClass("active");
      jQuery("#perigee").removeClass("active");
      jQuery("#size").fadeIn("slow");
      jQuery("#dso_big_fov").hide();
      jQuery(".alert-danger").hide();
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
      var uranus_width = uranus_ang / fov_width;
      uranus_width = uranus_width * width
      jQuery("#solar_system_obj").css("width",uranus_width + "px");
      jQuery("#solar_system_obj").css("height",uranus_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var uranus_width = uranus_ang / fov_width;
        uranus_width = uranus_width * width
        jQuery("#solar_system_obj").css("width",uranus_width + "px");
        jQuery("#solar_system_obj").css("height",uranus_width + "px");
      }
      jQuery("#apogee").click(function() {
        uranus_ang = 0.055;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var uranus_width = uranus_ang / fov_width;
        uranus_width = uranus_width * width
        jQuery("#solar_system_obj").css("width",uranus_width + "px");
        jQuery("#solar_system_obj").css("height",uranus_width + "px");
      });
      jQuery("#average").click(function() {
        uranus_ang = 0.062;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var uranus_width = uranus_ang / fov_width;
        uranus_width = uranus_width * width
        jQuery("#solar_system_obj").css("width",uranus_width + "px");
        jQuery("#solar_system_obj").css("height",uranus_width + "px");
      });
      jQuery("#perigee").click(function() {
        uranus_ang = 0.068;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var uranus_width = uranus_ang / fov_width;
        uranus_width = uranus_width * width
        jQuery("#solar_system_obj").css("width",uranus_width + "px");
        jQuery("#solar_system_obj").css("height",uranus_width + "px");
      });
    } else if (object_imaging_v.toUpperCase().trim() == "neptune".toUpperCase()) {
      var height_fov = fov_height / fov_width;
      var width = jQuery("#card").width();
      jQuery("#average").addClass("active");
      jQuery("#apogee").removeClass("active");
      jQuery("#perigee").removeClass("active");
      jQuery("#size").fadeIn("slow");
      jQuery("#dso_big_fov").hide();
      jQuery(".alert-danger").hide();
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
      var neptune_width = neptune_ang / fov_width;
      neptune_width = neptune_width * width
      jQuery("#solar_system_obj").css("width",neptune_width + "px");
      jQuery("#solar_system_obj").css("height",neptune_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var neptune_width = neptune_ang / fov_width;
        neptune_width = neptune_width * width
        jQuery("#solar_system_obj").css("width",neptune_width + "px");
        jQuery("#solar_system_obj").css("height",neptune_width + "px");
      }
      jQuery("#apogee").click(function() {
        neptune_ang = 0.036;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var neptune_width = neptune_ang / fov_width;
        neptune_width = neptune_width * width
        jQuery("#solar_system_obj").css("width",neptune_width + "px");
        jQuery("#solar_system_obj").css("height",neptune_width + "px");
      });
      jQuery("#average").click(function() {
        neptune_ang = 0.038;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var neptune_width = neptune_ang / fov_width;
        neptune_width = neptune_width * width
        jQuery("#solar_system_obj").css("width",neptune_width + "px");
        jQuery("#solar_system_obj").css("height",neptune_width + "px");
      });
      jQuery("#perigee").click(function() {
        neptune_ang = 0.04;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var neptune_width = neptune_ang / fov_width;
        neptune_width = neptune_width * width
        jQuery("#solar_system_obj").css("width",neptune_width + "px");
        jQuery("#solar_system_obj").css("height",neptune_width + "px");
      });
    } else if (object_imaging_v.toUpperCase().trim() == "sun".toUpperCase()) {
      var height_fov = fov_height / fov_width;
      var width = jQuery("#card").width();
      jQuery("#average").addClass("active");
      jQuery("#apogee").removeClass("active");
      jQuery("#perigee").removeClass("active");
      jQuery("#size").fadeIn("slow");
      jQuery("#dso_big_fov").hide();
      jQuery(".alert-danger").hide();
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
      var sun_width = sun_ang / fov_width;
      sun_width = sun_width * width
      jQuery("#solar_system_obj").css("width",sun_width + "px");
      jQuery("#solar_system_obj").css("height",sun_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var sun_width = sun_ang / fov_width;
        sun_width = sun_width * width
        jQuery("#solar_system_obj").css("width",sun_width + "px");
        jQuery("#solar_system_obj").css("height",sun_width + "px");
      }
      jQuery("#apogee").click(function() {
        sun_ang = 31.45;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var sun_width = sun_ang / fov_width;
        sun_width = sun_width * width
        jQuery("#solar_system_obj").css("width",sun_width + "px");
        jQuery("#solar_system_obj").css("height",sun_width + "px");
      });
      jQuery("#average").click(function() {
        sun_ang = 31.992;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var sun_width = sun_ang / fov_width;
        sun_width = sun_width * width
        jQuery("#solar_system_obj").css("width",sun_width + "px");
        jQuery("#solar_system_obj").css("height",sun_width + "px");
      });
      jQuery("#perigee").click(function() {
        sun_ang = 32.53;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width * height_fov);
        var sun_width = sun_ang / fov_width;
        sun_width = sun_width * width
        jQuery("#solar_system_obj").css("width",sun_width + "px");
        jQuery("#solar_system_obj").css("height",sun_width + "px");
      });
    } else {
      jQuery("#size").hide();
      jQuery("#loading_bg").hide();
      jQuery("#solar_system_obj").hide();
      jQuery("#DSO_image").show();
      jQuery("#fov_move_controls").show();
      jQuery("#card2").css("background","none");
      jQuery("#card2").css("height", "auto");
      jQuery("#loading_text").show();
      jQuery("#card").hide();
      jQuery("#loading_bg").hide();
      jQuery("#dso_big_fov").hide();
      jQuery(".alert-danger").hide();
      scroll_bottom();

      if (fov_width * fov_height <= 14400) {

        if (coord_regex.test(object_imaging_v)) {
          var requestURL = "https://calm-eyrie-13472.herokuapp.com/https://api.arcsecond.io/objects/?coordinates=" + object_imaging_v.replace("+","%2B") + "&format=json&radius=10";
        } else if (ra_dec_regex.test(object_imaging_v)) {
          var ra_reg = object_imaging_v.match(ra_regex);
          var dec_reg = object_imaging_v.match(dec_regex);
          var ra_h = ra_reg[0].match(ra_h_regex);
          var ra_m = ra_reg[0].match(ra_m_regex);
          var ra_s = ra_reg[0].match(ra_s_regex);
          var dec_d = dec_reg[0].match(dec_d_regex);
          var dec_d_symbol = dec_d[1];
          dec_d_symbol = dec_d_symbol.replace("−","-");
          var dec_d_value = Number(dec_d[2]);
          var dec_m = dec_reg[0].match(dec_m_regex);
          var dec_s = dec_reg[0].match(dec_s_regex);

          ra_final = Number((ra_h[1] * 15) + (ra_m[1] * 1/4) + (ra_s[1] * 1/240));
          var dec1 = Number(dec_d_value);
          var dec2 = Number(dec_m[1]/60);
          var dec3 = Number(dec_s[1]/3600);
          dec_final = Number(dec_d_symbol + (dec1 + dec2 + dec3)).toFixed(3);
          var requestURL = "https://calm-eyrie-13472.herokuapp.com/https://api.arcsecond.io/objects/?coordinates=" + ra_final.toFixed(3) + " " + dec_final.replace("+","%2B") + "&format=json&radius=10";
        } else {
          var requestURL = "https://calm-eyrie-13472.herokuapp.com/https://api.arcsecond.io/objects/" + object_imaging_v + "/?format=json";
        }

        $.getJSON(requestURL, function (json) {
          if (coord_regex.test(object_imaging_v) || ra_dec_regex.test(object_imaging_v)) {
            if (json[0] == undefined) {
              ra = ra_final;
              dec = dec_final;
            } else {
              var coords = json[0].ICRS_coordinates;
              ra = coords.right_ascension;
              dec = coords.declination;
            }
          } else {
            var coords = json.ICRS_coordinates;
            ra = coords.right_ascension;
            dec = coords.declination;
          }

          loading_text.innerHTML = "Loading image... This may take a while.";
          scroll_bottom();

          if (fov_width * fov_height > 4900) {
            if (img_type == "DSS2") {
              image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov_width + "&y=" + fov_height + "&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
            } else if (img_type == "DSS1") {
              image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov_width + "&y=" + fov_height + "&mime-type=download-gif&Sky-Survey=DSS1&equinox=J2000&statsmode=VO";
            } else if (img_type == "SDSS") {
              if (resolution_width_v > 2048 || resolution_height_v > 2048) {
                res = res * 2;
                resolution_width_v = resolution_width_v / 2;
                resolution_height_v = resolution_height_v / 2;
                image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res.toFixed(2) + "&width=" + resolution_width_v + "&height=" + resolution_height_v;
              } else if (resolution_width_v > 4096 || resolution_height_v > 4096) {
                res = res * 3;
                resolution_width_v = resolution_width_v / 3;
                resolution_height_v = resolution_height_v / 3;
                image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res.toFixed(2) + "&width=" + resolution_width_v + "&height=" + resolution_height_v;
              } else if (resolution_width_v > 6144 || resolution_height_v > 6144) {
                res = res * 4;
                resolution_width_v = resolution_width_v / 4;
                resolution_height_v = resolution_height_v / 4;
                image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res.toFixed(2) + "&width=" + resolution_width_v + "&height=" + resolution_height_v;
              } else if (resolution_width_v > 8192 || resolution_height_v > 8192) {
                res = res * 5;
                resolution_width_v = resolution_width_v / 5;
                resolution_height_v = resolution_height_v / 5;
                image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res.toFixed(2) + "&width=" + resolution_width_v + "&height=" + resolution_height_v;
              } else if (resolution_width_v > 10240 || resolution_height_v > 10240) {
                res = res * 6;
                resolution_width_v = resolution_width_v / 6;
                resolution_height_v = resolution_height_v / 6;
                image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res.toFixed(2) + "&width=" + resolution_width_v + "&height=" + resolution_height_v;
              } else {
                image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res.toFixed(2) + "&width=" + resolution_width_v + "&height=" + resolution_height_v;
              }
            }
          } else {
            if (img_type == "DSS2" || img_type == "DSS1") {
              image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov_width + "&y=" + fov_height + "&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
            } else if (img_type == "SDSS") {
              var request = new XMLHttpRequest();
              request.onreadystatechange = function() {
                if (request.readyState === 4){
                  request.status;
                  if (request.status == 200) {
                    if (resolution_width_v > 2048 || resolution_height_v > 2048) {
                      res = res * 3;
                      resolution_width_v = resolution_width_v / 3;
                      resolution_height_v = resolution_height_v / 3;
                      image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res.toFixed(2) + "&width=" + resolution_width_v + "&height=" + resolution_height_v;
                    } else if (resolution_width_v > 4096 || resolution_height_v > 4096) {
                      res = res * 4;
                      resolution_width_v = resolution_width_v / 4;
                      resolution_height_v = resolution_height_v / 4;
                      image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res.toFixed(2) + "&width=" + resolution_width_v + "&height=" + resolution_height_v;
                    } else if (resolution_width_v > 6144 || resolution_height_v > 6144) {
                      res = res * 5;
                      resolution_width_v = resolution_width_v / 5;
                      resolution_height_v = resolution_height_v / 5;
                      image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res.toFixed(2) + "&width=" + resolution_width_v + "&height=" + resolution_height_v;
                    } else if (resolution_width_v > 8192 || resolution_height_v > 8192) {
                      res = res * 6;
                      resolution_width_v = resolution_width_v / 6;
                      resolution_height_v = resolution_height_v / 6;
                      image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res.toFixed(2) + "&width=" + resolution_width_v + "&height=" + resolution_height_v;
                    } else if (resolution_width_v > 10240 || resolution_height_v > 10240) {
                      res = res * 7;
                      resolution_width_v = resolution_width_v / 7;
                      resolution_height_v = resolution_height_v / 7;
                      image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res.toFixed(2) + "&width=" + resolution_width_v + "&height=" + resolution_height_v;
                    } else {
                      image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res.toFixed(2) + "&width=" + resolution_width_v + "&height=" + resolution_height_v;
                    }
                    img_type = "SDSS";
                    color();
                  } else {
                    jQuery("#option_sdss").removeClass("active");
                    jQuery("#option_dss").addClass("active");
                    jQuery("#option_dss").click();
                  }
                }
              };
              request.open("GET", "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + (res.toFixed(2)) * 8 + "&width=" + resolution_width_v / 8 + "&height=" + resolution_height_v / 8, true);
              request.send();
              jQuery("#table_btn_div").hide();
            }
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
        .fail(function(jqXHR, textStatus, errorThrown) {
          jQuery("#loading_text").fadeOut("slow");
          var error = document.getElementById("message");
          error.innerHTML = "Couldn't find '" + object_imaging_v.replace("%20"," ") + "'.";
          jQuery(".alert-danger").fadeIn("slow");
        });
      } else {
        var height_fov = fov_height / fov_width;
        var width = jQuery("#card").width();
        var image_big_fov = new Image();

        jQuery("#loading_bg").hide();
        jQuery(".alert-danger").hide();
        jQuery("#solar_system_obj").hide();
        jQuery("#DSO_image").show();
        jQuery("#fov_move_controls").show();
        jQuery("#card2").css("background","none");
        jQuery("#card2").css("height", "auto");
        jQuery("#loading_text").show();
        jQuery("#card").hide();
        jQuery("#dso_big_fov").hide();
        jQuery("#size").hide();
        scroll_bottom();

        if (coord_regex.test(object_imaging_v)) {
          var requestURL = "https://calm-eyrie-13472.herokuapp.com/https://api.arcsecond.io/objects/?coordinates=" + object_imaging_v.replace("+","%2B") + "&format=json&radius=10";
        } else if (ra_dec_regex.test(object_imaging_v)) {
          var ra_reg = object_imaging_v.match(ra_regex);
          var dec_reg = object_imaging_v.match(dec_regex);
          var ra_h = ra_reg[0].match(ra_h_regex);
          var ra_m = ra_reg[0].match(ra_m_regex);
          var ra_s = ra_reg[0].match(ra_s_regex);
          var dec_d = dec_reg[0].match(dec_d_regex);
          var dec_d_symbol = dec_d[1];
          dec_d_symbol = dec_d_symbol.replace("−","-");
          var dec_d_value = Number(dec_d[2]);
          var dec_m = dec_reg[0].match(dec_m_regex);
          var dec_s = dec_reg[0].match(dec_s_regex);

          ra_final = Number((ra_h[1] * 15) + (ra_m[1] * 1/4) + (ra_s[1] * 1/240));
          var dec1 = Number(dec_d_value);
          var dec2 = Number(dec_m[1]/60);
          var dec3 = Number(dec_s[1]/3600);
          dec_final = Number(dec_d_symbol + (dec1 + dec2 + dec3)).toFixed(3);
          var requestURL = "https://calm-eyrie-13472.herokuapp.com/https://api.arcsecond.io/objects/?coordinates=" + ra_final.toFixed(3) + " " + dec_final.replace("+","%2B") + "&format=json&radius=10";
        } else {
          var requestURL = "https://calm-eyrie-13472.herokuapp.com/https://api.arcsecond.io/objects/" + object_imaging_v + "/?format=json";
        }

        $.getJSON(requestURL, function (json) {
          if (coord_regex.test(object_imaging_v) || ra_dec_regex.test(object_imaging_v)) {
            if (json[0] == undefined) {
              ra = ra_final;
              dec = dec_final;
            } else {
              var coords = json[0].ICRS_coordinates;
              ra = coords.right_ascension;
              dec = coords.declination;
            }
          } else {
            var coords = json.ICRS_coordinates;
            ra = coords.right_ascension;
            dec = coords.declination;
          }

          loading_text.innerHTML = "Loading image... This may take a while.";
          scroll_bottom();

          if (img_type == "DSS2") {
            image_big_fov.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=120&y=120&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
          } else if (img_type == "DSS1") {
            image_big_fov.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=120&y=120&mime-type=download-gif&Sky-Survey=DSS1&equinox=J2000&statsmode=VO";
          } else if (img_type == "SDSS") {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function() {
              if (request.readyState === 4){
                request.status;
                if (request.status == 200) {
                  if (resolution_width_v > 2048 || resolution_height_v > 2048) {
                    res = res * 3;
                    resolution_width_v = resolution_width_v / 3;
                    resolution_height_v = resolution_height_v / 3;
                    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res.toFixed(2) + "&width=" + resolution_width_v + "&height=" + resolution_height_v;
                  } else if (resolution_width_v > 4096 || resolution_height_v > 4096) {
                    res = res * 4;
                    resolution_width_v = resolution_width_v / 4;
                    resolution_height_v = resolution_height_v / 4;
                    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res.toFixed(2) + "&width=" + resolution_width_v + "&height=" + resolution_height_v;
                  } else if (resolution_width_v > 6144 || resolution_height_v > 6144) {
                    res = res * 5;
                    resolution_width_v = resolution_width_v / 5;
                    resolution_height_v = resolution_height_v / 5;
                    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res.toFixed(2) + "&width=" + resolution_width_v + "&height=" + resolution_height_v;
                  } else if (resolution_width_v > 8192 || resolution_height_v > 8192) {
                    res = res * 6;
                    resolution_width_v = resolution_width_v / 6;
                    resolution_height_v = resolution_height_v / 6;
                    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res.toFixed(2) + "&width=" + resolution_width_v + "&height=" + resolution_height_v;
                  } else if (resolution_width_v > 10240 || resolution_height_v > 10240) {
                    res = res * 7;
                    resolution_width_v = resolution_width_v / 7;
                    resolution_height_v = resolution_height_v / 7;
                    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res.toFixed(2) + "&width=" + resolution_width_v + "&height=" + resolution_height_v;
                  } else {
                    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res.toFixed(2) + "&width=" + resolution_width_v + "&height=" + resolution_height_v;
                  }
                  img_type = "SDSS";
                  color();
                } else {
                  jQuery("#option_sdss").removeClass("active");
                  jQuery("#option_dss").addClass("active");
                  jQuery("#option_dss").click();
                }
              }
            };
            request.open("GET", "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + (res.toFixed(2)) * 8 + "&width=" + resolution_width_v / 8 + "&height=" + resolution_height_v / 8, true);
            request.send();
            jQuery("#table_btn_div").hide();
          }

          image.onload = function() {
            jQuery("#card").fadeIn("slow");
            jQuery("#loading_text").fadeOut("slow");
            scroll_bottom_load();
          }

          image_big_fov.onload = function() {
            jQuery("#card").fadeIn("slow");
            jQuery("#loading_text").fadeOut("slow");
            scroll_bottom_load();

            jQuery("#loading_bg").hide();
            jQuery("#card2").show();
            jQuery("#card2").css("background","url(images/ui/black_square.png)");
            jQuery("#card2").css("height", width * height_fov);
            jQuery("#dso_big_fov").show();
            jQuery("#DSO_image").hide();
            jQuery("#fov_move_controls").hide();
            jQuery("#dso_big_fov").css("background","url(" + image_big_fov.src + ")");
            jQuery("#dso_big_fov").css("backgroundSize","contain");
            jQuery("#dso_big_fov").css("backgroundPosition","center");
            var dso_width = 120 / fov_width;
            dso_width = dso_width * width
            jQuery("#dso_big_fov").css("width",dso_width + "px");
            jQuery("#dso_big_fov").css("height",dso_width + "px");
            scroll_bottom_load();
            window.onresize = function() {
              var width = jQuery("#card").width();
              jQuery("#card2").css("height", width * height_fov);
              var dso_width = 120 / fov_width;
              dso_width = dso_width * width
              jQuery("#dso_big_fov").css("width",dso_width + "px");
              jQuery("#dso_big_fov").css("height",dso_width + "px");
            }
          }
          image.onerror = function() {
            jQuery("#loading_text").fadeOut("slow");
          }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          jQuery("#loading_text").fadeOut("slow");
          var error = document.getElementById("message");
          error.innerHTML = "Couldn't find '" + object_imaging_v.replace("%20"," ") + "'.";
          jQuery(".alert-danger").fadeIn("slow");
        });
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

  option_dss();

  moon_ang = 31.717;
  sun_ang = 31.992;
  mercury_ang = 0.146;
  venus_ang = 0.631;
  mars_ang = 0.238;
  jupiter_ang = 0.665;
  saturn_ang = 0.653;
  uranus_ang = 0.062;
  neptune_ang = 0.038;

  loading_text.innerHTML = "Loading...";


  if (telescope_flength_obs_v != "" && eyepiece_afov_v != "" && eyepiece_flength_v != "" && object_observing_v != "") {
    var magnification = telescope_flength_obs_v / eyepiece_flength_v;
    fov = eyepiece_afov_v / magnification;
    fov = fov * 60;

    fov_width_text.innerHTML = "FoV size: " + fov.toFixed(2) + " arcminutes";
    resolution_text.innerHTML = "Magnification: " + magnification.toFixed(2) + "x";
    fov_height_text.innerHTML = "";

    if (object_observing_v.toUpperCase().trim() == "moon".toUpperCase()) {
      var height_fov = fov;
      var width = jQuery("#card").width();
      jQuery("#average").addClass("active");
      jQuery("#apogee").removeClass("active");
      jQuery("#perigee").removeClass("active");
      jQuery("#size").fadeIn("slow");
      jQuery("#dso_big_fov").hide();
      jQuery(".alert-danger").hide();
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
      var moon_width = moon_ang / fov;
      moon_width = moon_width * width;
      jQuery("#solar_system_obj").css("width",moon_width + "px");
      jQuery("#solar_system_obj").css("height",moon_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var moon_width = moon_ang / fov;
        moon_width = moon_width * width
        jQuery("#solar_system_obj").css("width",moon_width + "px");
        jQuery("#solar_system_obj").css("height",moon_width + "px");
      }
      jQuery("#apogee").click(function() {
        moon_ang = 29.333;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var moon_width = moon_ang / fov;
        moon_width = moon_width * width
        jQuery("#solar_system_obj").css("width",moon_width + "px");
        jQuery("#solar_system_obj").css("height",moon_width + "px");
      });
      jQuery("#average").click(function() {
        moon_ang = 31.717;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var moon_width = moon_ang / fov;
        moon_width = moon_width * width
        jQuery("#solar_system_obj").css("width",moon_width + "px");
        jQuery("#solar_system_obj").css("height",moon_width + "px");
      });
      jQuery("#perigee").click(function() {
        moon_ang = 34.1;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var moon_width = moon_ang / fov;
        moon_width = moon_width * width
        jQuery("#solar_system_obj").css("width",moon_width + "px");
        jQuery("#solar_system_obj").css("height",moon_width + "px");
      });
    } else if (object_observing_v.toUpperCase().trim() == "mercury".toUpperCase()) {
      var height_fov = fov;
      var width = jQuery("#card").width();
      jQuery("#average").addClass("active");
      jQuery("#apogee").removeClass("active");
      jQuery("#perigee").removeClass("active");
      jQuery("#size").fadeIn("slow");
      jQuery("#dso_big_fov").hide();
      jQuery(".alert-danger").hide();
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
      var mercury_width = mercury_ang / fov;
      mercury_width = mercury_width * width
      jQuery("#solar_system_obj").css("width",mercury_width + "px");
      jQuery("#solar_system_obj").css("height",mercury_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var mercury_width = mercury_ang / fov;
        mercury_width = mercury_width * width
        jQuery("#solar_system_obj").css("width",mercury_width + "px");
        jQuery("#solar_system_obj").css("height",mercury_width + "px");
      }
      jQuery("#apogee").click(function() {
        mercury_ang = 0.075;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var mercury_width = mercury_ang / fov;
        mercury_width = mercury_width * width
        jQuery("#solar_system_obj").css("width",mercury_width + "px");
        jQuery("#solar_system_obj").css("height",mercury_width + "px");
      });
      jQuery("#average").click(function() {
        mercury_ang = 0.146;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var mercury_width = mercury_ang / fov;
        mercury_width = mercury_width * width
        jQuery("#solar_system_obj").css("width",mercury_width + "px");
        jQuery("#solar_system_obj").css("height",mercury_width + "px");
      });
      jQuery("#perigee").click(function() {
        mercury_ang = 0.216;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var mercury_width = mercury_ang / fov;
        mercury_width = mercury_width * width
        jQuery("#solar_system_obj").css("width",mercury_width + "px");
        jQuery("#solar_system_obj").css("height",mercury_width + "px");
      });
    } else if (object_observing_v.toUpperCase().trim() == "venus".toUpperCase()) {
      var height_fov = fov;
      var width = jQuery("#card").width();
      jQuery("#average").addClass("active");
      jQuery("#apogee").removeClass("active");
      jQuery("#perigee").removeClass("active");
      jQuery("#size").fadeIn("slow");
      jQuery("#dso_big_fov").hide();
      jQuery(".alert-danger").hide();
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
      var venus_width = venus_ang / fov;
      venus_width = venus_width * width
      jQuery("#solar_system_obj").css("width",venus_width + "px");
      jQuery("#solar_system_obj").css("height",venus_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var venus_width = venus_ang / fov;
        venus_width = venus_width * width
        jQuery("#solar_system_obj").css("width",venus_width + "px");
        jQuery("#solar_system_obj").css("height",venus_width + "px");
      }
      jQuery("#apogee").click(function() {
        venus_ang = 0.161;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var venus_width = venus_ang / fov;
        venus_width = venus_width * width
        jQuery("#solar_system_obj").css("width",venus_width + "px");
        jQuery("#solar_system_obj").css("height",venus_width + "px");
      });
      jQuery("#average").click(function() {
        venus_ang = 0.631;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var venus_width = venus_ang / fov;
        venus_width = venus_width * width
        jQuery("#solar_system_obj").css("width",venus_width + "px");
        jQuery("#solar_system_obj").css("height",venus_width + "px");
      });
      jQuery("#perigee").click(function() {
        venus_ang = 1.1;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var venus_width = venus_ang / fov;
        venus_width = venus_width * width
        jQuery("#solar_system_obj").css("width",venus_width + "px");
        jQuery("#solar_system_obj").css("height",venus_width + "px");
      });
    } else if (object_observing_v.toUpperCase().trim() == "mars".toUpperCase()) {
      var height_fov = fov;
      var width = jQuery("#card").width();
      jQuery("#average").addClass("active");
      jQuery("#apogee").removeClass("active");
      jQuery("#perigee").removeClass("active");
      jQuery("#size").fadeIn("slow");
      jQuery("#dso_big_fov").hide();
      jQuery(".alert-danger").hide();
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
      var mars_width = mars_ang / fov;
      mars_width = mars_width * width
      jQuery("#solar_system_obj").css("width",mars_width + "px");
      jQuery("#solar_system_obj").css("height",mars_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var mars_width = mars_ang / fov;
        mars_width = mars_width * width
        jQuery("#solar_system_obj").css("width",mars_width + "px");
        jQuery("#solar_system_obj").css("height",mars_width + "px");
      }
      jQuery("#apogee").click(function() {
        mars_ang = 0.0583;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var mars_width = mars_ang / fov;
        mars_width = mars_width * width
        jQuery("#solar_system_obj").css("width",mars_width + "px");
        jQuery("#solar_system_obj").css("height",mars_width + "px");
      });
      jQuery("#average").click(function() {
        mars_ang = 0.238;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var mars_width = mars_ang / fov;
        mars_width = mars_width * width
        jQuery("#solar_system_obj").css("width",mars_width + "px");
        jQuery("#solar_system_obj").css("height",mars_width + "px");
      });
      jQuery("#perigee").click(function() {
        mars_ang = 0.418;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var mars_width = mars_ang / fov;
        mars_width = mars_width * width
        jQuery("#solar_system_obj").css("width",mars_width + "px");
        jQuery("#solar_system_obj").css("height",mars_width + "px");
      });
    } else if (object_observing_v.toUpperCase().trim() == "jupiter".toUpperCase()) {
      var height_fov = fov;
      var width = jQuery("#card").width();
      jQuery("#average").addClass("active");
      jQuery("#apogee").removeClass("active");
      jQuery("#perigee").removeClass("active");
      jQuery("#size").fadeIn("slow");
      jQuery("#dso_big_fov").hide();
      jQuery(".alert-danger").hide();
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
      var jupiter_width = jupiter_ang / fov;
      jupiter_width = jupiter_width * width
      jQuery("#solar_system_obj").css("width",jupiter_width + "px");
      jQuery("#solar_system_obj").css("height",jupiter_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var jupiter_width = jupiter_ang / fov;
        jupiter_width = jupiter_width * width
        jQuery("#solar_system_obj").css("width",jupiter_width + "px");
        jQuery("#solar_system_obj").css("height",jupiter_width + "px");
      }
      jQuery("#apogee").click(function() {
        jupiter_ang = 0.496;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var jupiter_width = jupiter_ang / fov;
        jupiter_width = jupiter_width * width
        jQuery("#solar_system_obj").css("width",jupiter_width + "px");
        jQuery("#solar_system_obj").css("height",jupiter_width + "px");
      });
      jQuery("#average").click(function() {
        jupiter_ang = 0.665;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var jupiter_width = jupiter_ang / fov;
        jupiter_width = jupiter_width * width
        jQuery("#solar_system_obj").css("width",jupiter_width + "px");
        jQuery("#solar_system_obj").css("height",jupiter_width + "px");
      });
      jQuery("#perigee").click(function() {
        jupiter_ang = 0.835;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var jupiter_width = jupiter_ang / fov;
        jupiter_width = jupiter_width * width
        jQuery("#solar_system_obj").css("width",jupiter_width + "px");
        jQuery("#solar_system_obj").css("height",jupiter_width + "px");
      });
    } else if (object_observing_v.toUpperCase().trim() == "saturn".toUpperCase()) {
      var height_fov = fov;
      var width = jQuery("#card").width();
      jQuery("#average").addClass("active");
      jQuery("#apogee").removeClass("active");
      jQuery("#perigee").removeClass("active");
      jQuery("#size").fadeIn("slow");
      jQuery("#dso_big_fov").hide();
      jQuery(".alert-danger").hide();
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
      var saturn_width = saturn_ang / fov;
      saturn_width = saturn_width * width
      jQuery("#solar_system_obj").css("width",saturn_width + "px");
      jQuery("#solar_system_obj").css("height",saturn_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var saturn_width = saturn_ang / fov;
        saturn_width = saturn_width * width
        jQuery("#solar_system_obj").css("width",saturn_width + "px");
        jQuery("#solar_system_obj").css("height",saturn_width + "px");
      }
      jQuery("#apogee").click(function() {
        saturn_ang = 0.583;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var saturn_width = saturn_ang / fov;
        saturn_width = saturn_width * width
        jQuery("#solar_system_obj").css("width",saturn_width + "px");
        jQuery("#solar_system_obj").css("height",saturn_width + "px");
      });
      jQuery("#average").click(function() {
        saturn_ang = 0.653;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var saturn_width = saturn_ang / fov;
        saturn_width = saturn_width * width
        jQuery("#solar_system_obj").css("width",saturn_width + "px");
        jQuery("#solar_system_obj").css("height",saturn_width + "px");
      });
      jQuery("#perigee").click(function() {
        saturn_ang = 0.723;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var saturn_width = saturn_ang / fov;
        saturn_width = saturn_width * width
        jQuery("#solar_system_obj").css("width",saturn_width + "px");
        jQuery("#solar_system_obj").css("height",saturn_width + "px");
      });
    } else if (object_observing_v.toUpperCase().trim() == "uranus".toUpperCase()) {
      var height_fov = fov;
      var width = jQuery("#card").width();
      jQuery("#average").addClass("active");
      jQuery("#apogee").removeClass("active");
      jQuery("#perigee").removeClass("active");
      jQuery("#size").fadeIn("slow");
      jQuery("#dso_big_fov").hide();
      jQuery(".alert-danger").hide();
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
      var uranus_width = uranus_ang / fov;
      uranus_width = uranus_width * width
      jQuery("#solar_system_obj").css("width",uranus_width + "px");
      jQuery("#solar_system_obj").css("height",uranus_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var uranus_width = uranus_ang / fov;
        uranus_width = uranus_width * width
        jQuery("#solar_system_obj").css("width",uranus_width + "px");
        jQuery("#solar_system_obj").css("height",uranus_width + "px");
      }
      jQuery("#apogee").click(function() {
        uranus_ang = 0.055;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var uranus_width = uranus_ang / fov;
        uranus_width = uranus_width * width
        jQuery("#solar_system_obj").css("width",uranus_width + "px");
        jQuery("#solar_system_obj").css("height",uranus_width + "px");
      });
      jQuery("#average").click(function() {
        uranus_ang = 0.062;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var uranus_width = uranus_ang / fov;
        uranus_width = uranus_width * width
        jQuery("#solar_system_obj").css("width",uranus_width + "px");
        jQuery("#solar_system_obj").css("height",uranus_width + "px");
      });
      jQuery("#perigee").click(function() {
        uranus_ang = 0.068;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var uranus_width = uranus_ang / fov;
        uranus_width = uranus_width * width
        jQuery("#solar_system_obj").css("width",uranus_width + "px");
        jQuery("#solar_system_obj").css("height",uranus_width + "px");
      });
    } else if (object_observing_v.toUpperCase().trim() == "neptune".toUpperCase()) {
      var height_fov = fov;
      var width = jQuery("#card").width();
      jQuery("#average").addClass("active");
      jQuery("#apogee").removeClass("active");
      jQuery("#perigee").removeClass("active");
      jQuery("#size").fadeIn("slow");
      jQuery("#dso_big_fov").hide();
      jQuery(".alert-danger").hide();
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
      var neptune_width = neptune_ang / fov;
      neptune_width = neptune_width * width
      jQuery("#solar_system_obj").css("width",neptune_width + "px");
      jQuery("#solar_system_obj").css("height",neptune_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var neptune_width = neptune_ang / fov;
        neptune_width = neptune_width * width
        jQuery("#solar_system_obj").css("width",neptune_width + "px");
        jQuery("#solar_system_obj").css("height",neptune_width + "px");
      }
      jQuery("#apogee").click(function() {
        neptune_ang = 0.036;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var neptune_width = neptune_ang / fov;
        neptune_width = neptune_width * width
        jQuery("#solar_system_obj").css("width",neptune_width + "px");
        jQuery("#solar_system_obj").css("height",neptune_width + "px");
      });
      jQuery("#average").click(function() {
        neptune_ang = 0.038;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var neptune_width = neptune_ang / fov;
        neptune_width = neptune_width * width
        jQuery("#solar_system_obj").css("width",neptune_width + "px");
        jQuery("#solar_system_obj").css("height",neptune_width + "px");
      });
      jQuery("#perigee").click(function() {
        neptune_ang = 0.04;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var neptune_width = neptune_ang / fov;
        neptune_width = neptune_width * width
        jQuery("#solar_system_obj").css("width",neptune_width + "px");
        jQuery("#solar_system_obj").css("height",neptune_width + "px");
      });
    } else if (object_observing_v.toUpperCase().trim() == "sun".toUpperCase()) {
      var height_fov = fov;
      var width = jQuery("#card").width();
      jQuery("#average").addClass("active");
      jQuery("#apogee").removeClass("active");
      jQuery("#perigee").removeClass("active");
      jQuery("#size").fadeIn("slow");
      jQuery("#dso_big_fov").hide();
      jQuery(".alert-danger").hide();
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
      var sun_width = sun_ang / fov;
      sun_width = sun_width * width
      jQuery("#solar_system_obj").css("width",sun_width + "px");
      jQuery("#solar_system_obj").css("height",sun_width + "px");
      scroll_bottom_load();
      window.onresize = function() {
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var sun_width = sun_ang / fov;
        sun_width = sun_width * width
        jQuery("#solar_system_obj").css("width",sun_width + "px");
        jQuery("#solar_system_obj").css("height",sun_width + "px");
      }
      jQuery("#apogee").click(function() {
        sun_ang = 31.45;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var sun_width = sun_ang / fov;
        sun_width = sun_width * width
        jQuery("#solar_system_obj").css("width",sun_width + "px");
        jQuery("#solar_system_obj").css("height",sun_width + "px");
      });
      jQuery("#average").click(function() {
        sun_ang = 31.992;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var sun_width = sun_ang / fov;
        sun_width = sun_width * width
        jQuery("#solar_system_obj").css("width",sun_width + "px");
        jQuery("#solar_system_obj").css("height",sun_width + "px");
      });
      jQuery("#perigee").click(function() {
        sun_ang = 32.53;
        var width = jQuery("#card").width();
        jQuery("#card2").css("height", width);
        var sun_width = sun_ang / fov;
        sun_width = sun_width * width
        jQuery("#solar_system_obj").css("width",sun_width + "px");
        jQuery("#solar_system_obj").css("height",sun_width + "px");
      });
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
      jQuery("#dso_big_fov").hide();
      jQuery(".alert-danger").hide();
      jQuery("#size").hide();
      scroll_bottom();

      if (fov * fov <= 14400) {

        if (coord_regex.test(object_observing_v)) {
          var requestURL = "https://calm-eyrie-13472.herokuapp.com/https://api.arcsecond.io/objects/?coordinates=" + object_observing_v.replace("+","%2B") + "&format=json&radius=10";
        } else if (ra_dec_regex.test(object_observing_v)) {
          var ra_reg = object_observing_v.match(ra_regex);
          var dec_reg = object_observing_v.match(dec_regex);
          var ra_h = ra_reg[0].match(ra_h_regex);
          var ra_m = ra_reg[0].match(ra_m_regex);
          var ra_s = ra_reg[0].match(ra_s_regex);
          var dec_d = dec_reg[0].match(dec_d_regex);
          var dec_d_symbol = dec_d[1];
          dec_d_symbol = dec_d_symbol.replace("−","-");
          var dec_d_value = Number(dec_d[2]);
          var dec_m = dec_reg[0].match(dec_m_regex);
          var dec_s = dec_reg[0].match(dec_s_regex);

          ra_final = Number((ra_h[1] * 15) + (ra_m[1] * 1/4) + (ra_s[1] * 1/240));
          var dec1 = Number(dec_d_value);
          var dec2 = Number(dec_m[1]/60);
          var dec3 = Number(dec_s[1]/3600);
          dec_final = Number(dec_d_symbol + (dec1 + dec2 + dec3)).toFixed(3);
          var requestURL = "https://calm-eyrie-13472.herokuapp.com/https://api.arcsecond.io/objects/?coordinates=" + ra_final.toFixed(3) + " " + dec_final.replace("+","%2B") + "&format=json&radius=10";
        } else {
          var requestURL = "https://calm-eyrie-13472.herokuapp.com/https://api.arcsecond.io/objects/" + object_observing_v + "/?format=json";
        }

        $.getJSON(requestURL, function (json) {
          if (coord_regex.test(object_observing_v) || ra_dec_regex.test(object_observing_v)) {
            if (json[0] == undefined) {
              ra = ra_final;
              dec = dec_final;
            } else {
              var coords = json[0].ICRS_coordinates;
              ra = coords.right_ascension;
              dec = coords.declination;
            }
          } else {
            var coords = json.ICRS_coordinates;
            ra = coords.right_ascension;
            dec = coords.declination;
          }

          loading_text.innerHTML = "Loading image... This may take a while.";
          scroll_bottom();

          if (fov > 70) {
            if (img_type == "DSS2") {
              image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov + "&y=" + fov + "&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
            } else if (img_type == "DSS1") {
              image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov + "&y=" + fov + "&mime-type=download-gif&Sky-Survey=DSS1&equinox=J2000&statsmode=VO";
            }
          } else {
            image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov + "&y=" + fov + "&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
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
        .fail(function(jqXHR, textStatus, errorThrown) {
          jQuery("#loading_text").fadeOut("slow");
          var error = document.getElementById("message");
          error.innerHTML = "Couldn't find '" + object_observing_v.replace("%20"," ") + "'.";
          jQuery(".alert-danger").fadeIn("slow");
        });
      } else {
        var height_fov = fov;
        var width = jQuery("#card").width();
        var image_big_fov_obs = new Image();

        jQuery("#loading_bg").hide();
        jQuery(".alert-danger").hide();
        jQuery("#solar_system_obj").hide();
        jQuery("#DSO_image").show();
        jQuery("#fov_move_controls").show();
        jQuery("#card2").css("background","none");
        jQuery("#card2").css("height", "auto");
        jQuery("#loading_text").show();
        jQuery("#card").hide();
        jQuery("#dso_big_fov").hide();
        jQuery("#size").hide();
        scroll_bottom();

        if (coord_regex.test(object_observing_v)) {
          var requestURL = "https://calm-eyrie-13472.herokuapp.com/https://api.arcsecond.io/objects/?coordinates=" + object_observing_v.replace("+","%2B") + "&format=json&radius=10";
        } else if (ra_dec_regex.test(object_observing_v)) {
          var ra_reg = object_observing_v.match(ra_regex);
          var dec_reg = object_observing_v.match(dec_regex);
          var ra_h = ra_reg[0].match(ra_h_regex);
          var ra_m = ra_reg[0].match(ra_m_regex);
          var ra_s = ra_reg[0].match(ra_s_regex);
          var dec_d = dec_reg[0].match(dec_d_regex);
          var dec_d_symbol = dec_d[1];
          dec_d_symbol = dec_d_symbol.replace("−","-");
          var dec_d_value = Number(dec_d[2]);
          var dec_m = dec_reg[0].match(dec_m_regex);
          var dec_s = dec_reg[0].match(dec_s_regex);

          ra_final = Number((ra_h[1] * 15) + (ra_m[1] * 1/4) + (ra_s[1] * 1/240));
          var dec1 = Number(dec_d_value);
          var dec2 = Number(dec_m[1]/60);
          var dec3 = Number(dec_s[1]/3600);
          dec_final = Number(dec_d_symbol + (dec1 + dec2 + dec3)).toFixed(3);
          var requestURL = "https://calm-eyrie-13472.herokuapp.com/https://api.arcsecond.io/objects/?coordinates=" + ra_final.toFixed(3) + " " + dec_final.replace("+","%2B") + "&format=json&radius=10";
        } else {
          var requestURL = "https://calm-eyrie-13472.herokuapp.com/https://api.arcsecond.io/objects/" + object_observing_v + "/?format=json";
        }

        $.getJSON(requestURL, function (json) {
          if (coord_regex.test(object_observing_v) || ra_dec_regex.test(object_observing_v)) {
            if (json[0] == undefined) {
              ra = ra_final;
              dec = dec_final;
            } else {
              var coords = json[0].ICRS_coordinates;
              ra = coords.right_ascension;
              dec = coords.declination;
            }
          } else {
            var coords = json.ICRS_coordinates;
            ra = coords.right_ascension;
            dec = coords.declination;
          }

          loading_text.innerHTML = "Loading image... This may take a while.";
          scroll_bottom();

          if (img_type == "DSS2") {
            image_big_fov_obs.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=120&y=120&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
          } else if (img_type == "DSS1") {
            image_big_fov_obs.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=120&y=120&mime-type=download-gif&Sky-Survey=DSS1&equinox=J2000&statsmode=VO";
          }

          image_big_fov_obs.onload = function() {
            jQuery("#card").fadeIn("slow");
            jQuery("#loading_text").fadeOut("slow");
            scroll_bottom_load();

            jQuery("#loading_bg").hide();
            jQuery("#card2").show();
            jQuery("#card2").css("background","url(images/ui/black_square.png)");
            jQuery("#card2").css("height", width);
            jQuery("#dso_big_fov").show();
            jQuery("#DSO_image").hide();
            jQuery("#fov_move_controls").hide();
            jQuery("#dso_big_fov").css("background","url(" + image_big_fov_obs.src + ")");
            jQuery("#dso_big_fov").css("backgroundSize","contain");
            jQuery("#dso_big_fov").css("backgroundPosition","center");
            var dso_width = 120 / fov;
            dso_width = dso_width * width
            jQuery("#dso_big_fov").css("width",dso_width + "px");
            jQuery("#dso_big_fov").css("height",dso_width + "px");
            scroll_bottom_load();
            window.onresize = function() {
              var width = jQuery("#card").width();
              jQuery("#card2").css("height", width);
              var dso_width = 120 / fov;
              dso_width = dso_width * width
              jQuery("#dso_big_fov").css("width",dso_width + "px");
              jQuery("#dso_big_fov").css("height",dso_width + "px");
            }
          }
          image.onerror = function() {
            jQuery("#loading_text").fadeOut("slow");
          }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          jQuery("#loading_text").fadeOut("slow");
          var error = document.getElementById("message");
          error.innerHTML = "Couldn't find '" + object_observing_v.replace("%20"," ") + "'.";
          jQuery(".alert-danger").fadeIn("slow");
        });
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
  } else if (img_type == "SDSS") {
    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res.toFixed(2) + "&width=" + resolution_width_v + "&height=" + resolution_height_v;
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
  } else if (img_type == "SDSS") {
    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res.toFixed(2) + "&width=" + resolution_width_v + "&height=" + resolution_height_v;
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
  } else if (img_type == "SDSS") {
    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res.toFixed(2) + "&width=" + resolution_width_v + "&height=" + resolution_height_v;
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
  } else if (img_type == "SDSS") {
    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res.toFixed(2) + "&width=" + resolution_width_v + "&height=" + resolution_height_v;
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
  var cat_array = ["M","NGC","PGC","Arp","HCG","Gum","VdB"];
  var messier_numbers = Math.floor(Math.random() * 110) + 1;
  var pgc_numbers = Math.floor(Math.random() * 130000) + 1;
  var ngc_numbers = Math.floor(Math.random() * 7840) + 1;
  var arp_numbers = Math.floor(Math.random() * 338) + 1;
  var hcg_numbers = Math.floor(Math.random() * 100) + 1;
  var gum_numbers = Math.floor(Math.random() * 85) + 1;
  var vdb_numbers = Math.floor(Math.random() * 159) + 1;
  var catalog_array = Math.floor(Math.random() * 7);
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
  } else if (catalog_array == 5) {
    number_final = gum_numbers;
  } else if (catalog_array == 6) {
    number_final = vdb_numbers;
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

function dss_check() {
  if (img_type != "SDSS") {
    if (document.getElementById("dss_check").checked) {
      img_type = "DSS1";
    } else {
      img_type = "DSS2";
    }
  }
}

function option_sdss() {
  img_type = "SDSS";
  fov_img();
  color();
}

function option_dss() {
  if (document.getElementById("dss_check").checked) {
    img_type = "DSS1";
  } else {
    img_type = "DSS2";
  }
  fov_img();
  black_white();
}

function black_white() {
  $('#DSO_image').css('-webkit-filter','grayscale(100%)');
  $('#DSO_image').css('filter','grayscale(100%)');
}

function color() {
  $('#DSO_image').css('-webkit-filter','grayscale(0%)');
  $('#DSO_image').css('filter','grayscale(0%)');
}
