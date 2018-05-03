//Imaging
var telescope_flength = document.getElementById("flength_input");
var pixel_size = document.getElementById("pixsize");
var resolution_width = document.getElementById("reswidth");
var resolution_height = document.getElementById("resheight");
var object_imaging = document.getElementById("object_name_img");
var image = document.getElementById("DSO_image");
var fov_width_text = document.getElementById("fov_width_text");
var fov_height_text = document.getElementById("fov_height_text");
var resolution_text = document.getElementById("resolution_text");


//Observing
var telescope_flength_obs = document.getElementById("flength_input_obs");
var eyepiece_afov = document.getElementById("afov");
var eyepiece_flength = document.getElementById("eyepiece_flength");
var object_observing = document.getElementById("object_name_obs");

var fov_width;
var fov_height;

var loading_text = document.getElementById("loading_text");

function imaging() {
  jQuery("#img_mode").show();
  jQuery("#obs_mode").hide();
}

function observing() {
  jQuery("#img_mode").hide();
  jQuery("#obs_mode").show();
}

function fov_img() {
  var telescope_flength_v = telescope_flength.value;
  var pixel_size_v = pixel_size.value;
  var resolution_width_v = resolution_width.value;
  var resolution_height_v = resolution_height.value;
  var object_imaging_v = object_imaging.value;

  if (telescope_flength_v != "" && pixel_size_v != "" && resolution_width_v != "" && resolution_height_v != "" && object_imaging_v != "") {
    var sensor_width = pixel_size_v * 0.001 * resolution_width_v;
    var sensor_height = pixel_size_v * 0.001 * resolution_height_v;
    fov_width = 3438 * sensor_width / telescope_flength_v;
    fov_height = 3438 * sensor_height / telescope_flength_v;
    var res = 206 * pixel_size_v / telescope_flength_v;

    fov_width_text.innerHTML = "Width: " + fov_width.toFixed(2) + " arcminutes";
    fov_height_text.innerHTML = "Height: " + fov_height.toFixed(2) + " arcminutes";
    resolution_text.innerHTML = "Resolution: " + res.toFixed(2) + " arcseconds/px"

    if (fov_width <= 120 && fov_height <= 120) {

      jQuery("#loading_text").show();
      jQuery("#card").hide();
      jQuery("#loading_bg").hide();
      scroll_bottom();

      var requestURL = "https://calm-eyrie-13472.herokuapp.com/https://api.arcsecond.io/objects/" + object_imaging_v + "/?format=json";

      $.getJSON(requestURL, function (json) {
        var coords = json.ICRS_coordinates;
        ra = coords.right_ascension;
        dec = coords.declination;

        loading_text.innerHTML = "Loading image... This may take a while."

        image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov_width + "&y=" + fov_height + "&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";

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

function fov_obs() {
  var telescope_flength_obs_v = telescope_flength_obs.value;
  var eyepiece_afov_v = eyepiece_afov.value;
  var eyepiece_flength_v = eyepiece_flength.value;
  var object_imaging_v = object_imaging.value;

  var magnification = telescope_flength_obs_v / eyepiece_flength_v;
  var fov = eyepiece_afov_v / magnification;
}

function ra_plus() {
  ra = +ra + 0.1;

  jQuery("#loading_bg").show();
  image.onload = function () {
    jQuery("#loading_bg").hide();
  }
  image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov_width + "&y=" + fov_height + "&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
}

function ra_minus() {
  ra = +ra - 0.1;

  jQuery("#loading_bg").show();
  image.onload = function () {
    jQuery("#loading_bg").hide();
  }
  image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov_width + "&y=" + fov_height + "&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
}

function dec_plus() {
  dec = +dec + 0.1;

  jQuery("#loading_bg").show();
  image.onload = function () {
    jQuery("#loading_bg").hide();
  }
  image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov_width + "&y=" + fov_height + "&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
}

function dec_minus() {
  dec = +dec - 0.1;

  jQuery("#loading_bg").show();
  image.onload = function () {
    jQuery("#loading_bg").hide();
  }
  image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov_width + "&y=" + fov_height + "&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
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
