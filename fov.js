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
var fov;
var img_type;

var loading_text = document.getElementById("loading_text");

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
    loading_text.innerHTML = "Loading...";

    if (fov_width * fov_height <= 14400) {

      jQuery("#loading_text").show();
      jQuery("#card").hide();
      jQuery("#loading_bg").hide();
      scroll_bottom();

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
  var object_observing_v = object_observing.value;
  loading_text.innerHTML = "Loading...";


  if (telescope_flength_obs_v != "" && eyepiece_afov_v != "" && eyepiece_flength_v != "" && object_observing_v != "") {
    var magnification = telescope_flength_obs_v / eyepiece_flength_v;
    fov = eyepiece_afov_v / magnification;
    fov = fov * 60;

    fov_width_text.innerHTML = "FoV size: " + fov.toFixed(2) + " arcminutes";
    resolution_text.innerHTML = "Magnification: " + magnification.toFixed(2) + "x";
    fov_height_text.innerHTML = "";

    if (fov <= 120) {

      jQuery("#loading_text").show();
      jQuery("#card").hide();
      jQuery("#loading_bg").hide();
      scroll_bottom();

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
