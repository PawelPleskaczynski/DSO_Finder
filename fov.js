//Imaging
var telescope_flength = document.getElementById("flength_input");
var pixel_size = document.getElementById("pixsize");
var resolution_width = document.getElementById("reswidth");
var resolution_height = document.getElementById("resheight");
var object_imaging = document.getElementById("object_name_img");
var image = document.getElementById("DSO_image");
var barlow_input = document.getElementById("barlow_input");
var proportions;
var fov_width_secs;
var sdss_height;
var res_sdss;


//Observing
var telescope_flength_obs = document.getElementById("flength_input");
var eyepiece_afov = document.getElementById("afov");
var eyepiece_flength = document.getElementById("eyepiece_flength");
var object_observing = document.getElementById("object_name_obs");

var fov_width_text = document.getElementById("fov_width_text");
var fov_height_text = document.getElementById("fov_height_text");
var resolution_text = document.getElementById("resolution_text");
var px_size_text = document.getElementById("px_size_text");
var fov_width;
var fov_height;
var fov;
var img_type = "SDSS";
var res;

var solar_system_obj = document.getElementById("solar_system_obj");
var mousePosition;
var offset = [0,0];
var isDown = false;

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
  jQuery("#small_link").text("Fit image to screen.");
  jQuery("#card").css("transform","scale(1)");
  jQuery(".small_img_div").hide();
  jQuery("#survey_div_obs").show();
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
  img_type = "SDSS";
  jQuery(".form-control").each(function(){
      jQuery(this).css("backgroundColor","#fff");
      jQuery(this).removeClass("is-invalid");
  });
}

function observing() {
  jQuery("#small_link").text("Fit image to screen.");
  jQuery("#card").css("transform","scale(1)");
  jQuery(".small_img_div").hide();
  jQuery("#survey_div_obs").show();
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
  img_type = "SDSS";
  jQuery(".form-control").each(function(){
      jQuery(this).css("backgroundColor","#fff");
      jQuery(this).removeClass("is-invalid");
  });
}


function fov_img() {
  jQuery("#small_link").text("Fit image to screen.");
  jQuery("#card").css("transform","scale(1)");
  jQuery(".small_img_div").hide();
  px_size_text.innerHTML = "";
  jQuery("#survey_div").show();
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

    proportions = fov_height / fov_width;
    fov_width_secs = fov_width * 60;
    sdss_height = 960 * proportions;
    sdss_height = Math.round(sdss_height);
    res_sdss = fov_width_secs / 960;
    res_sdss = res_sdss.toFixed(2);

    if (fov_width > 60) {
      fov_width_new = fov_width / 60;
      fov_width_text.innerHTML = "Width: " + fov_width_new.toFixed(2) + " degrees";
    } else {
      fov_width_text.innerHTML = "Width: " + fov_width.toFixed(2) + " arcminutes";
    }

    if (fov_height > 60) {
      fov_height_new = fov_height / 60;
      fov_height_text.innerHTML = "Height: " + fov_height_new.toFixed(2) + " degrees";
    } else {
      fov_height_text.innerHTML = "Height: " + fov_height.toFixed(2) + " arcminutes";
    }

    if (res > 60) {
      res_new = res / 60;
      resolution_text.innerHTML = "Resolution: " + res_new.toFixed(2) + " degrees/px";
    } else {
      resolution_text.innerHTML = "Resolution: " + res.toFixed(2) + " arcseconds/px"
    }

    loading_text.innerHTML = "Loading...";

    if (object_imaging_v.toUpperCase().trim() == "moon".toUpperCase()) {
      jQuery(".find_obj_div").fadeIn("slow");
      load_solar_system_obj_img("moon", 29.333, moon_ang, 34.1, fov_height, fov_width);
      restart_pos();
      drag_obj();
      if (jQuery("#card").height() > jQuery(window).height() - 70) {
        jQuery(".small_img_div").fadeIn("slow");
      } else {
        jQuery(".small_img_div").hide();
      }
    } else if (object_imaging_v.toUpperCase().trim() == "mercury".toUpperCase()) {
      jQuery(".find_obj_div").hide();
      load_solar_system_obj_img("mercury", 0.075, mercury_ang, 0.216, fov_height, fov_width);
      restart_pos();
      drag_obj();
      if (jQuery("#card").height() > jQuery(window).height() - 70) {
        jQuery(".small_img_div").fadeIn("slow");
      } else {
        jQuery(".small_img_div").hide();
      }
    } else if (object_imaging_v.toUpperCase().trim() == "venus".toUpperCase()) {
      jQuery(".find_obj_div").hide();
      load_solar_system_obj_img("venus", 0.161, venus_ang, 1.1, fov_height, fov_width);
      restart_pos();
      drag_obj();
      if (jQuery("#card").height() > jQuery(window).height() - 70) {
        jQuery(".small_img_div").fadeIn("slow");
      } else {
        jQuery(".small_img_div").hide();
      }
    } else if (object_imaging_v.toUpperCase().trim() == "mars".toUpperCase()) {
      jQuery(".find_obj_div").hide();
      load_solar_system_obj_img("mars", 0.0583, mars_ang, 0.418, fov_height, fov_width);
      restart_pos();
      drag_obj();
      if (jQuery("#card").height() > jQuery(window).height() - 70) {
        jQuery(".small_img_div").fadeIn("slow");
      } else {
        jQuery(".small_img_div").hide();
      }
    } else if (object_imaging_v.toUpperCase().trim() == "jupiter".toUpperCase()) {
      jQuery(".find_obj_div").hide();
      load_solar_system_obj_img("jupiter", 0.496, jupiter_ang, 0.835, fov_height, fov_width);
      restart_pos();
      drag_obj();
      if (jQuery("#card").height() > jQuery(window).height() - 70) {
        jQuery(".small_img_div").fadeIn("slow");
      } else {
        jQuery(".small_img_div").hide();
      }
    } else if (object_imaging_v.toUpperCase().trim() == "saturn".toUpperCase()) {
      jQuery(".find_obj_div").hide();
      load_solar_system_obj_img("saturn", 0.583, saturn_ang, 0.723, fov_height, fov_width);
      restart_pos();
      drag_obj();
      if (jQuery("#card").height() > jQuery(window).height() - 70) {
        jQuery(".small_img_div").fadeIn("slow");
      } else {
        jQuery(".small_img_div").hide();
      }
    } else if (object_imaging_v.toUpperCase().trim() == "uranus".toUpperCase()) {
      jQuery(".find_obj_div").hide();
      load_solar_system_obj_img("uranus", 0.055, uranus_ang, 0.068, fov_height, fov_width);
      restart_pos();
      drag_obj();
      if (jQuery("#card").height() > jQuery(window).height() - 70) {
        jQuery(".small_img_div").fadeIn("slow");
      } else {
        jQuery(".small_img_div").hide();
      }
    } else if (object_imaging_v.toUpperCase().trim() == "neptune".toUpperCase()) {
      jQuery(".find_obj_div").hide();
      load_solar_system_obj_img("neptune", 0.036, neptune_ang, 0.04, fov_height, fov_width);
      restart_pos();
      drag_obj();
      if (jQuery("#card").height() > jQuery(window).height() - 70) {
        jQuery(".small_img_div").fadeIn("slow");
      } else {
        jQuery(".small_img_div").hide();
      }
    } else if (object_imaging_v.toUpperCase().trim() == "sun".toUpperCase()) {
      jQuery(".find_obj_div").fadeIn("slow");
      load_solar_system_obj_img("sun", 31.45, sun_ang, 32.53, fov_height, fov_width);
      restart_pos();
      drag_obj();
      if (jQuery("#card").height() > jQuery(window).height() - 70) {
        jQuery(".small_img_div").fadeIn("slow");
      } else {
        jQuery(".small_img_div").hide();
      }
    } else if (object_imaging_v.toUpperCase().trim() == "iss".toUpperCase() || object_imaging_v.toUpperCase().trim() == "international space station".toUpperCase()) {
      jQuery(".find_obj_div").hide();
      iss_img(fov_height, fov_width);
      restart_pos();
      drag_obj();
      if (jQuery("#card").height() > jQuery(window).height() - 70) {
        jQuery(".small_img_div").fadeIn("slow");
      } else {
        jQuery(".small_img_div").hide();
      }
    } else {
      jQuery(".find_obj_div").hide();
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

      if (fov_width * fov_height <= 8100) {

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
              image.src = "https://node-dss-resizer.herokuapp.com/?width=1024&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + fov_width + "ANDy=" + fov_height + "ANDmime-type=download-gifANDSky-Survey=DSS2-redANDequinox=J2000ANDstatsmode=VO";
            } else if (img_type == "DSS1") {
              image.src = "https://node-dss-resizer.herokuapp.com/?width=1024&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + fov_width + "ANDy=" + fov_height + "ANDmime-type=download-gifANDSky-Survey=DSS1ANDequinox=J2000ANDstatsmode=VO";
            } else if (img_type == "SDSS") {
              var request = new XMLHttpRequest();
              request.onreadystatechange = function() {
                if (request.readyState === 4){
                  request.status;
                  if (request.status == 200) {
                    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res_sdss + "&width=" + 960 + "&height=" + sdss_height;
                    img_type = "SDSS";
                    color();
                  } else {
                    jQuery("#option_sdss").removeClass("active");
                    jQuery("#option_dss").addClass("active");
                    jQuery("#option_dss").click();
                  }
                }
              };
              request.open("GET", "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res_sdss * 4 + "&width=" + 960 / 4 + "&height=" + sdss_height / 4, true);
              request.send();
            }
          } else {
            if (img_type == "DSS2" || img_type == "DSS1") {
              image.src = "https://node-dss-resizer.herokuapp.com/?width=1024&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + fov_width + "ANDy=" + fov_height + "ANDmime-type=download-gifANDSky-Survey=DSS2-redANDequinox=J2000ANDstatsmode=VO";
            } else if (img_type == "SDSS") {
              var request = new XMLHttpRequest();
              request.onreadystatechange = function() {
                if (request.readyState === 4){
                  request.status;
                  if (request.status == 200) {
                    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res_sdss + "&width=" + 960 + "&height=" + sdss_height;
                    img_type = "SDSS";
                    color();
                  } else {
                    jQuery("#option_sdss").removeClass("active");
                    jQuery("#option_dss").addClass("active");
                    jQuery("#option_dss").click();
                  }
                }
              };
              request.open("GET", "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res_sdss * 4 + "&width=" + 960 / 4 + "&height=" + sdss_height / 4, true);
              request.send();
            }
          }

          image.onload = function() {
            jQuery(".find_obj_div").fadeIn("slow");
            jQuery("#card").fadeIn("slow");
            jQuery("#loading_text").hide();
            scroll_bottom_load();
            if (jQuery("#card").height() > jQuery(window).height() - 70) {
              jQuery(".small_img_div").fadeIn("slow");
            } else {
              jQuery(".small_img_div").hide();
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
            image_big_fov.src = "https://node-dss-resizer.herokuapp.com/?width=1024&url=ra=" + ra + "ANDdec=" + dec + "ANDx=90ANDy=90ANDmime-type=download-gifANDSky-Survey=DSS2-redANDequinox=J2000ANDstatsmode=VO";
          } else if (img_type == "DSS1") {
            image_big_fov.src = "https://node-dss-resizer.herokuapp.com/?width=1024&url=ra=" + ra + "ANDdec=" + dec + "ANDx=90ANDy=90ANDmime-type=download-gifANDSky-Survey=DSS1ANDequinox=J2000ANDstatsmode=VO";
          } else if (img_type == "SDSS") {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function() {
              if (request.readyState === 4){
                request.status;
                if (request.status == 200) {
                  image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res_sdss + "&width=" + 960 + "&height=" + sdss_height;
                  img_type = "SDSS";
                  color();
                } else {
                  jQuery("#option_sdss").removeClass("active");
                  jQuery("#option_dss").addClass("active");
                  jQuery("#option_dss").click();
                }
              }
            };
            request.open("GET", "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res_sdss * 4 + "&width=" + 960 / 4 + "&height=" + sdss_height / 4, true);
            request.send();

          }

          image.onload = function() {
            jQuery(".find_obj_div").fadeIn("slow");
            jQuery("#card").fadeIn("slow");
            jQuery("#loading_text").fadeOut("slow");
            scroll_bottom_load();
            if (jQuery("#card").height() > jQuery(window).height() - 70) {
              jQuery(".small_img_div").fadeIn("slow");
            } else {
              jQuery(".small_img_div").hide();
            }
          }

          image_big_fov.onload = function() {
            jQuery(".find_obj_div").fadeIn("slow");
            jQuery("#card").fadeIn("slow");
            jQuery("#loading_text").fadeOut("slow");
            scroll_bottom_load();

            if (jQuery("#card").height() > jQuery(window).height() - 70) {
              jQuery(".small_img_div").fadeIn("slow");
            } else {
              jQuery(".small_img_div").hide();
            }

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
            var dso_width = 90 / fov_width;
            dso_width = dso_width * width
            jQuery("#dso_big_fov").css("width",dso_width + "px");
            jQuery("#dso_big_fov").css("height",dso_width + "px");
            scroll_bottom_load();
            window.onresize = function() {
              var width = jQuery("#card").width();
              jQuery("#card2").css("height", width * height_fov);
              var dso_width = 90 / fov_width;
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
  } else {
    jQuery(".form-control").each(function(){
      if(jQuery(this).val() == "") {
        anime({
          targets: this,
          backgroundColor: '#A13D33',
          direction: 'reverse',
          easing: 'easeOutCubic',
          duration: 850
        });
        jQuery(this).addClass("is-invalid");
      }
    });
    micron.getEle("#btn1").interaction("shake").duration(".45").timing("ease-out");
  }
}

function fov_obs() {
  jQuery("#small_link").text("Fit image to screen.");
  jQuery("#card").css("transform","scale(1)");
  jQuery(".small_img_div").hide();
  px_size_text.innerHTML = "";
  jQuery("#survey_div_obs").show();
  var telescope_flength_obs_v = telescope_flength_obs.value;
  var eyepiece_afov_v = eyepiece_afov.value;
  var eyepiece_flength_v = eyepiece_flength.value;
  var object_observing_v = object_observing.value;
  var barlow_input_v = barlow_input.value;
  if (barlow_input_v) {
    telescope_flength_obs_v = telescope_flength_obs_v * barlow_input_v;
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

  loading_text.innerHTML = "Loading...";


  if (telescope_flength_obs_v != "" && eyepiece_afov_v != "" && eyepiece_flength_v != "" && object_observing_v != "") {
    var magnification = telescope_flength_obs_v / eyepiece_flength_v;
    fov = eyepiece_afov_v / magnification;
    fov = fov * 60;

    fov_width_text.innerHTML = "FoV size: " + fov.toFixed(2) + " arcminutes";
    resolution_text.innerHTML = "Magnification: " + magnification.toFixed(2) + "x";
    fov_height_text.innerHTML = "";

    if (object_observing_v.toUpperCase().trim() == "moon".toUpperCase()) {
      jQuery(".find_obj_div").fadeIn("slow");
      load_solar_system_obj_obs("moon", 29.333, moon_ang, 34.1, fov);
      restart_pos();
      drag_obj();
      if (jQuery("#card").height() > jQuery(window).height() - 70) {
        jQuery(".small_img_div").fadeIn("slow");
      } else {
        jQuery(".small_img_div").hide();
      }
    } else if (object_observing_v.toUpperCase().trim() == "mercury".toUpperCase()) {
      jQuery(".find_obj_div").hide();
      load_solar_system_obj_obs("mercury", 0.075, mercury_ang, 0.216, fov);
      restart_pos();
      drag_obj();
      if (jQuery("#card").height() > jQuery(window).height() - 70) {
        jQuery(".small_img_div").fadeIn("slow");
      } else {
        jQuery(".small_img_div").hide();
      }
    } else if (object_observing_v.toUpperCase().trim() == "venus".toUpperCase()) {
      jQuery(".find_obj_div").hide();
      load_solar_system_obj_obs("venus", 0.161, venus_ang, 1.1, fov);
      restart_pos();
      drag_obj();
      if (jQuery("#card").height() > jQuery(window).height() - 70) {
        jQuery(".small_img_div").fadeIn("slow");
      } else {
        jQuery(".small_img_div").hide();
      }
    } else if (object_observing_v.toUpperCase().trim() == "mars".toUpperCase()) {
      jQuery(".find_obj_div").hide();
      load_solar_system_obj_obs("mars", 0.0583, mars_ang, 0.418, fov);
      restart_pos();
      drag_obj();
      if (jQuery("#card").height() > jQuery(window).height() - 70) {
        jQuery(".small_img_div").fadeIn("slow");
      } else {
        jQuery(".small_img_div").hide();
      }
    } else if (object_observing_v.toUpperCase().trim() == "jupiter".toUpperCase()) {
      jQuery(".find_obj_div").hide();
      load_solar_system_obj_obs("jupiter", 0.496, jupiter_ang, 0.835, fov);
      restart_pos();
      drag_obj();
      if (jQuery("#card").height() > jQuery(window).height() - 70) {
        jQuery(".small_img_div").fadeIn("slow");
      } else {
        jQuery(".small_img_div").hide();
      }
    } else if (object_observing_v.toUpperCase().trim() == "saturn".toUpperCase()) {
      jQuery(".find_obj_div").hide();
      load_solar_system_obj_obs("saturn", 0.583, saturn_ang, 0.723, fov);
      restart_pos();
      drag_obj();
      if (jQuery("#card").height() > jQuery(window).height() - 70) {
        jQuery(".small_img_div").fadeIn("slow");
      } else {
        jQuery(".small_img_div").hide();
      }
    } else if (object_observing_v.toUpperCase().trim() == "uranus".toUpperCase()) {
      jQuery(".find_obj_div").hide();
      load_solar_system_obj_obs("uranus", 0.055, uranus_ang, 0.068, fov);
      restart_pos();
      drag_obj();
      if (jQuery("#card").height() > jQuery(window).height() - 70) {
        jQuery(".small_img_div").fadeIn("slow");
      } else {
        jQuery(".small_img_div").hide();
      }
    } else if (object_observing_v.toUpperCase().trim() == "neptune".toUpperCase()) {
      jQuery(".find_obj_div").hide();
      load_solar_system_obj_obs("neptune", 0.036, neptune_ang, 0.04, fov);
      restart_pos();
      drag_obj();
      if (jQuery("#card").height() > jQuery(window).height() - 70) {
        jQuery(".small_img_div").fadeIn("slow");
      } else {
        jQuery(".small_img_div").hide();
      }
    } else if (object_observing_v.toUpperCase().trim() == "sun".toUpperCase()) {
      jQuery(".find_obj_div").fadeIn("slow");
      load_solar_system_obj_obs("sun", 31.45, sun_ang, 32.53, fov);
      restart_pos();
      drag_obj();
      if (jQuery("#card").height() > jQuery(window).height() - 70) {
        jQuery(".small_img_div").fadeIn("slow");
      } else {
        jQuery(".small_img_div").hide();
      }
    } else if (object_observing_v.toUpperCase().trim() == "iss".toUpperCase() || object_observing_v.toUpperCase().trim() == "international space station".toUpperCase()) {
      jQuery(".find_obj_div").hide();
       iss_obs(fov);
       restart_pos();
       drag_obj();
       if (jQuery("#card").height() > jQuery(window).height() - 70) {
         jQuery(".small_img_div").fadeIn("slow");
       } else {
         jQuery(".small_img_div").hide();
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
      jQuery("#dso_big_fov").hide();
      jQuery(".alert-danger").hide();
      jQuery("#size").hide();
      jQuery("#survey_div_obs").show();
      scroll_bottom();

      if (fov * fov <= 8100) {

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
              image.src = "https://node-dss-resizer.herokuapp.com/?width=1024&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + fov + "ANDy=" + fov + "ANDmime-type=download-gifANDSky-Survey=DSS2-redANDequinox=J2000ANDstatsmode=VO";
            } else if (img_type == "DSS1") {
              image.src = "https://node-dss-resizer.herokuapp.com/?width=1024&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + fov + "ANDy=" + fov + "ANDmime-type=download-gifANDSky-Survey=DSS1ANDequinox=J2000ANDstatsmode=VO";
            } else if (img_type == "SDSS") {
               var request = new XMLHttpRequest();
               request.onreadystatechange = function() {
                 if (request.readyState === 4){
                   request.status;
                   if (request.status == 200) {
                     image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + (fov * 60 / 1024) + "&width=1024&height=1024";
                     img_type = "SDSS";
                     color();
                   } else {
                     jQuery("#option_sdss_obs").removeClass("active");
                     jQuery("#option_dss_obs").addClass("active");
                     jQuery("#option_dss_obs").click();
                   }
                 }
               };
               request.open("GET", "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + (fov * 60) / 1024 + "&width=1024&height=1024", true);
               request.send();
             }
          } else {
            if (img_type == "DSS2" || img_type == "DSS1") {
              image.src = "https://node-dss-resizer.herokuapp.com/?width=1024&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + fov + "ANDy=" + fov + "ANDmime-type=download-gifANDSky-Survey=DSS2-redANDequinox=J2000ANDstatsmode=VO";
            } else if (img_type == "SDSS") {
                var request = new XMLHttpRequest();
                request.onreadystatechange = function() {
                  if (request.readyState === 4){
                    request.status;
                    if (request.status == 200) {
                      image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + (fov * 60) / 1024 + "&width=1024&height=1024";
                      img_type = "SDSS";
                      color();
                    } else {
                      jQuery("#option_sdss_obs").removeClass("active");
                      jQuery("#option_dss_obs").addClass("active");
                      jQuery("#option_dss_obs").click();
                    }
                  }
                };
                request.open("GET", "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + (fov * 60) / 1024 + "&width=1024&height=1024", true);
                request.send();
              }
            }


          image.onload = function() {
            jQuery(".find_obj_div").fadeIn("slow");
            jQuery("#card").fadeIn("slow");
            jQuery("#loading_text").fadeOut("slow");
            scroll_bottom_load();
            if (jQuery("#card").height() > jQuery(window).height() - 70) {
              jQuery(".small_img_div").fadeIn("slow");
            } else {
              jQuery(".small_img_div").hide();
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
            image_big_fov_obs.src = "https://node-dss-resizer.herokuapp.com/?width=1024&url=ra=" + ra + "ANDdec=" + dec + "ANDx=90ANDy=90ANDmime-type=download-gifANDSky-Survey=DSS2-redANDequinox=J2000ANDstatsmode=VO";
          } else if (img_type == "DSS1") {
            image_big_fov_obs.src = "https://node-dss-resizer.herokuapp.com/?width=1024&url=ra=" + ra + "ANDdec=" + dec + "ANDx=90ANDy=90ANDmime-type=download-gifANDSky-Survey=DSS1ANDequinox=J2000ANDstatsmode=VO";
          } else if (img_type == "SDSS") {
              var request = new XMLHttpRequest();
              request.onreadystatechange = function() {
                if (request.readyState === 4){
                  request.status;
                  if (request.status == 200) {
                    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + (fov * 60 / 1024) + "&width=1024&height=1024";
                    img_type = "SDSS";
                    color();
                  } else {
                    jQuery("#option_sdss_obs").removeClass("active");
                    jQuery("#option_dss_obs").addClass("active");
                    jQuery("#option_dss_obs").click();
                  }
                }
              };
              request.open("GET", "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + (fov * 60) / 1024 + "&width=1024&height=1024", true);
              request.send();
            }

            image.onload = function() {
              jQuery(".find_obj_div").fadeIn("slow");
              jQuery("#card").fadeIn("slow");
              jQuery("#loading_text").fadeOut("slow");
              scroll_bottom_load();
              if (jQuery("#card").height() > jQuery(window).height() - 70) {
                jQuery(".small_img_div").fadeIn("slow");
              } else {
                jQuery(".small_img_div").hide();
              }
            }

          image_big_fov_obs.onload = function() {
            jQuery(".find_obj_div").fadeIn("slow");
            jQuery("#card").fadeIn("slow");
            jQuery("#loading_text").fadeOut("slow");
            scroll_bottom_load();

            if (jQuery("#card").height() > jQuery(window).height() - 70) {
              jQuery(".small_img_div").fadeIn("slow");
            } else {
              jQuery(".small_img_div").hide();
            }

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
            var dso_width = 90 / fov;
            dso_width = dso_width * width
            jQuery("#dso_big_fov").css("width",dso_width + "px");
            jQuery("#dso_big_fov").css("height",dso_width + "px");
            scroll_bottom_load();
            window.onresize = function() {
              var width = jQuery("#card").width();
              jQuery("#card2").css("height", width);
              var dso_width = 90 / fov;
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
  } else {
    jQuery(".form-control").each(function(){
      if(jQuery(this).val() == "") {
        anime({
          targets: this,
          backgroundColor: '#A13D33',
          direction: 'reverse',
          easing: 'easeOutCubic',
          duration: 850
        });
        jQuery(this).addClass("is-invalid");
      }
    });
    micron.getEle("#btn2").interaction("shake").duration(".45").timing("ease-out");
  }
}


function ra_plus() {
  ra = +ra + 0.1;

  jQuery("#loading_bg").show();
  image.onload = function () {
    jQuery("#loading_bg").hide();
  }
  if (img_type == "DSS1") {
    image.src = "https://node-dss-resizer.herokuapp.com/?width=1024&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + fov_width + "ANDy=y=" + fov_height + "ANDmime-type=download-gifANDSky-Survey=DSS1ANDequinox=J2000ANDstatsmode=VO";
  } else if (img_type == "DSS2") {
    image.src = "https://node-dss-resizer.herokuapp.com/?width=1024&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + fov_width + "ANDy=y=" + fov_height + "ANDmime-type=download-gifANDSky-Survey=DSS2-redANDequinox=J2000ANDstatsmode=VO";
  } else if (img_type == "SDSS") {
    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res_sdss + "&width=" + 960 + "&height=" + sdss_height;
  }
}

function ra_minus() {
  ra = +ra - 0.1;

  jQuery("#loading_bg").show();
  image.onload = function () {
    jQuery("#loading_bg").hide();
  }
  if (img_type == "DSS1") {
    image.src = "https://node-dss-resizer.herokuapp.com/?width=1024&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + fov_width + "ANDy=y=" + fov_height + "ANDmime-type=download-gifANDSky-Survey=DSS1ANDequinox=J2000ANDstatsmode=VO";
  } else if (img_type == "DSS2") {
    image.src = "https://node-dss-resizer.herokuapp.com/?width=1024&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + fov_width + "ANDy=y=" + fov_height + "ANDmime-type=download-gifANDSky-Survey=DSS2-redANDequinox=J2000ANDstatsmode=VO";
  } else if (img_type == "SDSS") {
    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res_sdss + "&width=" + 960 + "&height=" + sdss_height;
  }
}

function dec_plus() {
  dec = +dec + 0.1;

  jQuery("#loading_bg").show();
  image.onload = function () {
    jQuery("#loading_bg").hide();
  }
  if (img_type == "DSS1") {
    image.src = "https://node-dss-resizer.herokuapp.com/?width=1024&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + fov_width + "ANDy=y=" + fov_height + "ANDmime-type=download-gifANDSky-Survey=DSS1ANDequinox=J2000ANDstatsmode=VO";
  } else if (img_type == "DSS2") {
    image.src = "https://node-dss-resizer.herokuapp.com/?width=1024&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + fov_width + "ANDy=y=" + fov_height + "ANDmime-type=download-gifANDSky-Survey=DSS2-redANDequinox=J2000ANDstatsmode=VO";
  } else if (img_type == "SDSS") {
    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res_sdss + "&width=" + 960 + "&height=" + sdss_height;
  }
}

function dec_minus() {
  dec = +dec - 0.1;

  jQuery("#loading_bg").show();
  image.onload = function () {
    jQuery("#loading_bg").hide();
  }
  if (img_type == "DSS1") {
    image.src = "https://node-dss-resizer.herokuapp.com/?width=1024&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + fov_width + "ANDy=y=" + fov_height + "ANDmime-type=download-gifANDSky-Survey=DSS1ANDequinox=J2000ANDstatsmode=VO";
  } else if (img_type == "DSS2") {
    image.src = "https://node-dss-resizer.herokuapp.com/?width=1024&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + fov_width + "ANDy=y=" + fov_height + "ANDmime-type=download-gifANDSky-Survey=DSS2-redANDequinox=J2000ANDstatsmode=VO";
  } else if (img_type == "SDSS") {
    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res_sdss + "&width=" + 960 + "&height=" + sdss_height;
  }
}

function ra_plus_obs() {
  ra = +ra + 0.1;

  jQuery("#loading_bg").show();
  image.onload = function () {
    jQuery("#loading_bg").hide();
  }
  if (img_type == "DSS1") {
    image.src = "https://node-dss-resizer.herokuapp.com/?width=1024&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + fov_width + "ANDy=y=" + fov_height + "ANDmime-type=download-gifANDSky-Survey=DSS1ANDequinox=J2000ANDstatsmode=VO";
  } else if (img_type == "DSS2") {
    image.src = "https://node-dss-resizer.herokuapp.com/?width=1024&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + fov_width + "ANDy=y=" + fov_height + "ANDmime-type=download-gifANDSky-Survey=DSS2-redANDequinox=J2000ANDstatsmode=VO";
  } else if (img_type == "SDSS") {
    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + res_sdss + "&width=" + 960 + "&height=" + sdss_height;
  }
}

function ra_minus_obs() {
  ra = +ra - 0.1;

  jQuery("#loading_bg").show();
  image.onload = function () {
    jQuery("#loading_bg").hide();
  }
  if (img_type == "DSS1") {
    image.src = "https://node-dss-resizer.herokuapp.com/?width=1024&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + fov + "ANDy=y=" + fov + "ANDmime-type=download-gifANDSky-Survey=DSS1ANDequinox=J2000ANDstatsmode=VO";
  } else if (img_type == "DSS2") {
    image.src = "https://node-dss-resizer.herokuapp.com/?width=1024&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + fov + "ANDy=y=" + fov + "ANDmime-type=download-gifANDSky-Survey=DSS2-redANDequinox=J2000ANDstatsmode=VO";
  } else if (img_type == "SDSS") {
    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + (fov * 60 / 1024) + "&width=1024&height=1024";
  }
}

function dec_plus_obs() {
  dec = +dec + 0.1;

  jQuery("#loading_bg").show();
  image.onload = function () {
    jQuery("#loading_bg").hide();
  }
  if (img_type == "DSS1") {
    image.src = "https://node-dss-resizer.herokuapp.com/?width=1024&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + fov + "ANDy=y=" + fov + "ANDmime-type=download-gifANDSky-Survey=DSS1ANDequinox=J2000ANDstatsmode=VO";
  } else if (img_type == "DSS2") {
    image.src = "https://node-dss-resizer.herokuapp.com/?width=1024&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + fov + "ANDy=y=" + fov + "ANDmime-type=download-gifANDSky-Survey=DSS2-redANDequinox=J2000ANDstatsmode=VO";
  } else if (img_type == "SDSS") {
    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + (fov * 60 / 1024) + "&width=1024&height=1024";
  }
}

function dec_minus_obs() {
  dec = +dec - 0.1;

  jQuery("#loading_bg").show();
  image.onload = function () {
    jQuery("#loading_bg").hide();
  }
  if (img_type == "DSS1") {
    image.src = "https://node-dss-resizer.herokuapp.com/?width=1024&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + fov + "ANDy=y=" + fov + "ANDmime-type=download-gifANDSky-Survey=DSS1ANDequinox=J2000ANDstatsmode=VO";
  } else if (img_type == "DSS2") {
    image.src = "https://node-dss-resizer.herokuapp.com/?width=1024&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + fov + "ANDy=y=" + fov + "ANDmime-type=download-gifANDSky-Survey=DSS2-redANDequinox=J2000ANDstatsmode=VO";
  } else if (img_type == "SDSS") {
    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + (fov * 60 / 1024) + "&width=1024&height=1024";
  }
}

function scroll_bottom() {
  jQuery('html, body').animate({
    scrollTop: $("#loading_text").offset().top
  }, 1000);
};

function scroll_bottom_load() {
  jQuery('html, body').animate({
    scrollTop: jQuery('#card').offset().top - 80
  }, 1000);
};

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
  anime({
    targets: 'body',
    opacity: 0,
    easing: 'easeInOutQuart',
    duration: 400,
    complete: function(anim) {
      window.open("object.html?obj=" + lucky_obj + "&lucky=true&barslide=true","_self");
    }
  });
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

function option_sdss_obs() {
  img_type = "SDSS";
  fov_obs();
  color();
}

function option_dss_obs() {
  if (document.getElementById("dss_check").checked) {
    img_type = "DSS1";
  } else {
    img_type = "DSS2";
  }
  fov_obs();
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

function load_solar_system_obj_img(type, min, avg, max, fovheight, fovwidth) {
  if (jQuery("#card").height() > jQuery(window).height() - 70) {
    jQuery(".small_img_div").fadeIn("slow");
  } else {
    jQuery(".small_img_div").hide();
  }
  jQuery("#solar_system_obj").css("border-radius","50%");
  jQuery("#survey_div").hide();
  var heightfov = fovheight / fovwidth;
  var width = jQuery("#card").width();
  var obj_ang = avg;
  var px_size = (obj_ang * 60) / res.toFixed(2);
  var widthpx = jQuery("#reswidth").val()
  var heightpx = jQuery("#resheight").val()
  if (px_size < widthpx || px_size < heightpx) {
    px_size_text.innerHTML = "Object size: " + Math.floor(px_size) + "px";
  } else {
    px_size_text.innerHTML = "";
  }
  jQuery("#average").addClass("active");
  jQuery("#apogee").removeClass("active");
  jQuery("#perigee").removeClass("active");
  jQuery("#size").fadeIn("slow");
  jQuery("#dso_big_fov").hide();
  jQuery(".alert-danger").hide();
  jQuery("#loading_bg").hide();
  jQuery("#card2").show();
  jQuery("#card2").css("background","url(images/ui/black_square.png)");
  jQuery("#card2").css("height", width * heightfov);
  jQuery("#card").show();
  jQuery("#solar_system_obj").show();
  jQuery("#DSO_image").hide();
  jQuery("#fov_move_controls").hide();
  if (type == "moon") {
    jQuery("#solar_system_obj").css("zoom","1");
    if (fovwidth * fovheight > 400) {
      jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/moon.jpg)");
    } else if (fovwidth * fovheight <= 400 && fovwidth * fovheight >= 64) {
      jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/moon_medium.jpg)");
    } else if (fovwidth * fovheight < 64) {
      jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/moon_big.jpg)");
    }
  } else if (type == "sun") {
    jQuery("#solar_system_obj").css("zoom","1.097");
    if (fovwidth * fovheight > 400) {
      jQuery("#solar_system_obj").css("background","url(https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_HMII.jpg)");
    } else if (fovwidth * fovheight <= 400 && fovwidth * fovheight >= 64) {
      jQuery("#solar_system_obj").css("background","url(https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_HMII.jpg)");
    } else if (fovwidth * fovheight < 64) {
      jQuery("#solar_system_obj").css("background","url(https://sdo.gsfc.nasa.gov/assets/img/latest/latest_2048_HMII.jpg)");
    }
  } else {
    jQuery("#solar_system_obj").css("zoom","1");
    jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/" + type + ".jpg)");
  }
  jQuery("#solar_system_obj").css("backgroundSize","contain");
  jQuery("#solar_system_obj").css("backgroundPosition","center");
  var object_width = obj_ang / fovwidth;
  object_width = object_width * width
  jQuery("#solar_system_obj").css("width",object_width + "px");
  jQuery("#solar_system_obj").css("height",object_width + "px");
  scroll_bottom_load();
  window.onresize = function() {
    var width = jQuery("#card").width();
    jQuery("#card2").css("height", width * heightfov);
    var object_width = obj_ang / fovwidth;
    object_width = object_width * width
    jQuery("#solar_system_obj").css("width",object_width + "px");
    jQuery("#solar_system_obj").css("height",object_width + "px");
  }
  jQuery("#apogee").click(function() {
    obj_ang = min;
    var width = jQuery("#card").width();
    jQuery("#card2").css("height", width * heightfov);
    var object_width = obj_ang / fovwidth;
    object_width = object_width * width
    jQuery("#solar_system_obj").css("width",object_width + "px");
    jQuery("#solar_system_obj").css("height",object_width + "px");
    var px_size = (obj_ang * 60) / res.toFixed(2);
    var widthpx = jQuery("#reswidth").val()
    var heightpx = jQuery("#resheight").val()
    if (px_size < widthpx || px_size < heightpx) {
      px_size_text.innerHTML = "Object size: " + Math.floor(px_size) + "px";
    } else {
      px_size_text.innerHTML = "";
    }
  });
  jQuery("#average").click(function() {
    obj_ang = avg;
    var width = jQuery("#card").width();
    jQuery("#card2").css("height", width * heightfov);
    var object_width = obj_ang / fovwidth;
    object_width = object_width * width
    jQuery("#solar_system_obj").css("width",object_width + "px");
    jQuery("#solar_system_obj").css("height",object_width + "px");
    var px_size = (obj_ang * 60) / res.toFixed(2);
    var widthpx = jQuery("#reswidth").val()
    var heightpx = jQuery("#resheight").val()
    if (px_size < widthpx || px_size < heightpx) {
      px_size_text.innerHTML = "Object size: " + Math.floor(px_size) + "px";
    } else {
      px_size_text.innerHTML = "";
    }
  });
  jQuery("#perigee").click(function() {
    obj_ang = max;
    var width = jQuery("#card").width();
    jQuery("#card2").css("height", width * heightfov);
    var object_width = obj_ang / fovwidth;
    object_width = object_width * width
    jQuery("#solar_system_obj").css("width",object_width + "px");
    jQuery("#solar_system_obj").css("height",object_width + "px");
    var px_size = (obj_ang * 60) / res.toFixed(2);
    var widthpx = jQuery("#reswidth").val()
    var heightpx = jQuery("#resheight").val()
    if (px_size < widthpx || px_size < heightpx) {
      px_size_text.innerHTML = "Object size: " + Math.floor(px_size) + "px";
    } else {
      px_size_text.innerHTML = "";
    }
  });
}

function load_solar_system_obj_obs(type, min, avg, max, fov) {
  if (jQuery("#card").height() > jQuery(window).height() - 70) {
    jQuery(".small_img_div").fadeIn("slow");
  } else {
    jQuery(".small_img_div").hide();
  }
  px_size_text.innerHTML = "";
  jQuery("#solar_system_obj").css("border-radius","50%");
  jQuery("#survey_div_obs").hide();
  var heightfov = fov;
  var width = jQuery("#card").width();
  var obj_ang = avg;
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
  if (type == "moon") {
    if (fov > 20) {
      jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/moon.jpg)");
    } else if (fov <= 20 && fov > 8) {
      jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/moon_medium.jpg)");
    } else {
      jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/moon_big.jpg)");
    }
  } else {
    jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/" + type + ".jpg)");
  }
  jQuery("#solar_system_obj").css("backgroundSize","contain");
  jQuery("#solar_system_obj").css("backgroundPosition","center");
  var object_width = obj_ang / fov;
  object_width = object_width * width
  jQuery("#solar_system_obj").css("width",object_width + "px");
  jQuery("#solar_system_obj").css("height",object_width + "px");
  scroll_bottom_load();
  window.onresize = function() {
    var width = jQuery("#card").width();
    jQuery("#card2").css("height", width);
    var object_width = obj_ang / fov;
    object_width = object_width * width
    jQuery("#solar_system_obj").css("width",object_width + "px");
    jQuery("#solar_system_obj").css("height",object_width + "px");
  }
  jQuery("#apogee").click(function() {
    obj_ang = min;
    var width = jQuery("#card").width();
    jQuery("#card2").css("height", width);
    var object_width = obj_ang / fov;
    object_width = object_width * width
    jQuery("#solar_system_obj").css("width",object_width + "px");
    jQuery("#solar_system_obj").css("height",object_width + "px");
    px_size_text.innerHTML = "";
  });
  jQuery("#average").click(function() {
    obj_ang = avg;
    var width = jQuery("#card").width();
    jQuery("#card2").css("height", width);
    var object_width = obj_ang / fov;
    object_width = object_width * width
    jQuery("#solar_system_obj").css("width",object_width + "px");
    jQuery("#solar_system_obj").css("height",object_width + "px");
    px_size_text.innerHTML = "";
  });
  jQuery("#perigee").click(function() {
    obj_ang = max;
    var width = jQuery("#card").width();
    jQuery("#card2").css("height", width);
    var object_width = obj_ang / fov;
    object_width = object_width * width
    jQuery("#solar_system_obj").css("width",object_width + "px");
    jQuery("#solar_system_obj").css("height",object_width + "px");
    px_size_text.innerHTML = "";
  });
}

function iss_img(fovheight, fovwidth) {
  if (jQuery("#card").height() > jQuery(window).height() - 70) {
    jQuery(".small_img_div").fadeIn("slow");
  } else {
    jQuery(".small_img_div").hide();
  }
  jQuery("#size").hide();
  jQuery("#solar_system_obj").css("border-radius","0%");
  jQuery("#survey_div").hide();
  var heightfov = fovheight / fovwidth;
  var width = jQuery("#card").width();
  var obj_ang = 1;
  var px_size = (obj_ang * 60) / res.toFixed(2);
  var widthpx = jQuery("#reswidth").val()
  var heightpx = jQuery("#resheight").val()
  if (px_size < widthpx || px_size < heightpx) {
    px_size_text.innerHTML = "Object size: " + Math.floor(px_size) + "px";
  } else {
    px_size_text.innerHTML = "";
  }
  jQuery("#dso_big_fov").hide();
  jQuery(".alert-danger").hide();
  jQuery("#loading_bg").hide();
  jQuery("#card2").show();
  jQuery("#card2").css("background","url(images/ui/black_square.png)");
  jQuery("#card2").css("height", width * heightfov);
  jQuery("#card").show();
  jQuery("#solar_system_obj").show();
  jQuery("#DSO_image").hide();
  jQuery("#fov_move_controls").hide();
  jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/iss.png)");
  jQuery("#solar_system_obj").css("backgroundSize","contain");
  jQuery("#solar_system_obj").css("backgroundPosition","center");
  var object_width = obj_ang / fovwidth;
  object_width = object_width * width
  jQuery("#solar_system_obj").css("width",object_width + "px");
  jQuery("#solar_system_obj").css("height",object_width + "px");
  scroll_bottom_load();
  window.onresize = function() {
    var width = jQuery("#card").width();
    jQuery("#card2").css("height", width * heightfov);
    var object_width = obj_ang / fovwidth;
    object_width = object_width * width
    jQuery("#solar_system_obj").css("width",object_width + "px");
    jQuery("#solar_system_obj").css("height",object_width + "px");
  }
}

function iss_obs() {
  if (jQuery("#card").height() > jQuery(window).height() - 70) {
    jQuery(".small_img_div").fadeIn("slow");
  } else {
    jQuery(".small_img_div").hide();
  }
  px_size_text.innerHTML = "";
  jQuery("#size").hide();
  jQuery("#solar_system_obj").css("border-radius","0%");
  jQuery("#survey_div_obs").hide();
  var heightfov = fov;
  var width = jQuery("#card").width();
  var obj_ang = 1;
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
  jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/iss.png)");
  jQuery("#solar_system_obj").css("backgroundSize","contain");
  jQuery("#solar_system_obj").css("backgroundPosition","center");
  var object_width = obj_ang / fov;
  object_width = object_width * width
  jQuery("#solar_system_obj").css("width",object_width + "px");
  jQuery("#solar_system_obj").css("height",object_width + "px");
  scroll_bottom_load();
  window.onresize = function() {
    var width = jQuery("#card").width();
    jQuery("#card2").css("height", width);
    var object_width = obj_ang / fov;
    object_width = object_width * width
    jQuery("#solar_system_obj").css("width",object_width + "px");
    jQuery("#solar_system_obj").css("height",object_width + "px");
  }
}

function restart_pos() {
  jQuery("#solar_system_obj").css("position","absolute");
  jQuery("#solar_system_obj").css("left","50%");
  jQuery("#solar_system_obj").css("top","50%");
  jQuery("#solar_system_obj").css("transform","translate(-50%, -50%)");
}

function drag_obj() {
  solar_system_obj.addEventListener('mousedown', function(e) {
    isDown = true;
    offset = [
      solar_system_obj.offsetLeft - e.clientX,
      solar_system_obj.offsetTop - e.clientY
    ];
  }, true);

  document.addEventListener('mouseup', function() {
    isDown = false;
  }, true);

  document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (isDown) {
      mousePosition = {
        x : event.clientX,
        y : event.clientY
      };
      solar_system_obj.style.left = (mousePosition.x + offset[0]) + 'px';
      solar_system_obj.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
  }, true);
}

function check_if_not_empty() {
  jQuery(".form-control").each(function(){
    if (jQuery(this).val() != "") {
      jQuery(this).css("backgroundColor","#fff");
      jQuery(this).removeClass("is-invalid");
    }
  });
}

function check_obs() {
  if (jQuery("#object_name_img").val().toUpperCase() == "sun".toUpperCase()) {
    jQuery("#survey_div").fadeOut("slow");
  } else if (jQuery("#object_name_img").val().toUpperCase() == "moon".toUpperCase()) {
    jQuery("#survey_div").fadeOut("slow");
  } else if (jQuery("#object_name_img").val().toUpperCase() == "mercury".toUpperCase()) {
    jQuery("#survey_div").fadeOut("slow");
  } else if (jQuery("#object_name_img").val().toUpperCase() == "venus".toUpperCase()) {
    jQuery("#survey_div").fadeOut("slow");
  } else if (jQuery("#object_name_img").val().toUpperCase() == "mars".toUpperCase()) {
    jQuery("#survey_div").fadeOut("slow");
  } else if (jQuery("#object_name_img").val().toUpperCase() == "jupiter".toUpperCase()) {
    jQuery("#survey_div").fadeOut("slow");
  } else if (jQuery("#object_name_img").val().toUpperCase() == "saturn".toUpperCase()) {
    jQuery("#survey_div").fadeOut("slow");
  } else if (jQuery("#object_name_img").val().toUpperCase() == "uranus".toUpperCase()) {
    jQuery("#survey_div").fadeOut("slow");
  } else if (jQuery("#object_name_img").val().toUpperCase() == "neptune".toUpperCase()) {
    jQuery("#survey_div").fadeOut("slow");
  } else if (jQuery("#object_name_img").val().toUpperCase() == "iss".toUpperCase() || jQuery("#object_name_img").val().toUpperCase() == "international space station".toUpperCase()) {
    jQuery("#survey_div").fadeOut("slow");
  } else {
    jQuery("#survey_div").fadeIn("slow");
  }
}

function check_obs_obs() {
  if (jQuery("#object_name_obs").val().toUpperCase() == "sun".toUpperCase()) {
    jQuery("#survey_div").fadeOut("slow");
  } else if (jQuery("#object_name_obs").val().toUpperCase() == "moon".toUpperCase()) {
    jQuery("#survey_div").fadeOut("slow");
  } else if (jQuery("#object_name_obs").val().toUpperCase() == "mercury".toUpperCase()) {
    jQuery("#survey_div").fadeOut("slow");
  } else if (jQuery("#object_name_obs").val().toUpperCase() == "venus".toUpperCase()) {
    jQuery("#survey_div").fadeOut("slow");
  } else if (jQuery("#object_name_obs").val().toUpperCase() == "mars".toUpperCase()) {
    jQuery("#survey_div").fadeOut("slow");
  } else if (jQuery("#object_name_obs").val().toUpperCase() == "jupiter".toUpperCase()) {
    jQuery("#survey_div").fadeOut("slow");
  } else if (jQuery("#object_name_obs").val().toUpperCase() == "saturn".toUpperCase()) {
    jQuery("#survey_div").fadeOut("slow");
  } else if (jQuery("#object_name_obs").val().toUpperCase() == "uranus".toUpperCase()) {
    jQuery("#survey_div").fadeOut("slow");
  } else if (jQuery("#object_name_obs").val().toUpperCase() == "neptune".toUpperCase()) {
    jQuery("#survey_div").fadeOut("slow");
  } else if (jQuery("#object_name_obs").val().toUpperCase() == "iss".toUpperCase() || jQuery("#object_name_img").val().toUpperCase() == "international space station".toUpperCase()) {
    jQuery("#survey_div").fadeOut("slow");
  } else {
    jQuery("#survey_div").fadeIn("slow");
  }
}

function make_small() {
  if (jQuery("#small_link").text() == "Fit image to screen.") {
    var card_height = jQuery("#card").height();
    var screen_height = jQuery(window).height() - 90;
    var card_scale = screen_height / card_height;
    anime({
      targets: "#card",
      scale: card_scale,
      easing: 'easeInOutQuart',
      duration: 600,
      complete: function(anim) {
        jQuery('html, body').animate({
          scrollTop: jQuery('#card').offset().top - 75
        }, 300);
      }
    });
    jQuery("#small_link").text("Make size normal.");
  } else {
    anime({
      targets: "#card",
      scale: 1,
      easing: 'easeInOutQuart',
      duration: 600
    });
    jQuery("#small_link").text("Fit image to screen.");
  }
}

function find_obj() {
  var object_name;
  var obj_img = document.getElementById("object_name_img").value;
  var obj_obs = document.getElementById("object_name_obs").value;
  if (obj_img != "" && obj_img != null) {
    object_name = obj_img;
  } else if (obj_obs != "" && obj_obs != null) {
    object_name = obj_obs;
  }
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
  if (object_name != null && object_name != "") {
    if (coord_regex.test(object_name)) {
      anime({
        targets: 'body',
        opacity: 0,
        easing: 'easeInOutQuart',
        duration: 400,
        complete: function(anim) {
          window.open("object.html?obj=" + object_name.replace("+","%2B") +"&input_type=coordinates&barslide=true","_self");
        }
      });
    } else if (ra_dec_regex.test(object_name)) {
      var ra = object_name.match(ra_regex);
      var dec = object_name.match(dec_regex);
      var ra_h = ra[0].match(ra_h_regex);
      var ra_m = ra[0].match(ra_m_regex);
      var ra_s = ra[0].match(ra_s_regex);
      var dec_d = dec[0].match(dec_d_regex);
      var dec_d_symbol = dec_d[1];
      dec_d_symbol = dec_d_symbol.replace("−","-");
      var dec_d_value = Number(dec_d[2]);
      var dec_m = dec[0].match(dec_m_regex);
      var dec_s = dec[0].match(dec_s_regex);

      var ra_final = Number((ra_h[1] * 15) + (ra_m[1] * 1/4) + (ra_s[1] * 1/240));
      var dec1 = Number(dec_d_value);
      var dec2 = Number(dec_m[1]/60);
      var dec3 = Number(dec_s[1]/3600);
      var dec_final = Number(dec_d_symbol + (dec1 + dec2 + dec3)).toFixed(3);
      anime({
        targets: 'body',
        opacity: 0,
        easing: 'easeInOutQuart',
        duration: 400,
        complete: function(anim) {
          window.open("object.html?obj=" + ra_final.toFixed(3) + " " + dec_final.replace("+","%2B") + "&ra=" + ra_final.toFixed(3) + "&dec=" + dec_final.replace("+","%2B") + "&input_type=coordinates&barslide=true","_self");
        }
      });
    } else {
      if (object_name.match(/sun/i)) {
        anime({
          targets: 'body',
          opacity: 0,
          easing: 'easeInOutQuart',
          duration: 400,
          complete: function(anim) {
            window.open("object.html?obj=sun&barslide=true","_self")
          }
        });
      } else if (object_name.match(/moon/i)) {
        anime({
          targets: 'body',
          opacity: 0,
          easing: 'easeInOutQuart',
          duration: 400,
          complete: function(anim) {
            window.open("object.html?obj=moon&barslide=true","_self")
          }
        });
      } else {
        anime({
          targets: 'body',
          opacity: 0,
          easing: 'easeInOutQuart',
          duration: 400,
          complete: function(anim) {
            window.open("object.html?obj=" + object_name + "&barslide=true","_self");
          }
        });
      }
    }
  }
}

$.getJSON("cameras.json", function(json) {
  for (var i = 0; i < json.length; i++) {
    jQuery("#dropdown_cam_man").append("<li id=\"li_man_" + i + "\"><a href=\"javascript:void(0)\" class=\"dropdown_item_man\" id=\"id_man_" + i + "\">" + json[i].camera_manufacturer + "</a></li>");
    jQuery("#id_man_" + i).attr("onclick","add_dropdown_cameras(\"" + json[i].camera_manufacturer + "\")");
    jQuery("#li_man_" + i).attr("onclick","add_dropdown_cameras(\"" + json[i].camera_manufacturer + "\")");
  }
});

function add_dropdown_cameras(name) {
  jQuery(".dropdown_item_camera").remove();
  document.getElementById("camera_btn").innerHTML = "Choose camera model";
  $.getJSON("cameras.json", function(json) {
    var index = json.findIndex(function(item, i){
      return item.camera_manufacturer == name;
    });
    json = json[index].cameras;
    dropdown_add_cameras(json);
    document.getElementById("camera_man_btn").innerHTML = name;
  });
}

function dropdown_add_cameras(json) {
  jQuery(".dropdown_item_camera").remove();
  for (var i = 0; i < json.length; i++) {
    if (json[i].type == "camera") {
      jQuery("#dropdown_cam").append("<li id=\"id_li_" + i + "\"><a href=\"javascript:void(0)\" class=\"dropdown_item_camera\" id=\"id_" + i + "\">" + json[i].camera_name + "</a></li>");
      jQuery("#id_" + i).attr("onclick","input_camera_details(" + json[i].pixel_size + "," + json[i].resolution_width + "," + json[i].resolution_height + "," + "\"" + json[i].camera_name + "\"" + ")");
      jQuery("#id_li_" + i).attr("onclick","input_camera_details(" + json[i].pixel_size + "," + json[i].resolution_width + "," + json[i].resolution_height + "," + "\"" + json[i].camera_name + "\"" + ")");
    }
  }
}

function input_camera_details(pix_size, res_wdth, res_hght, cam_name) {
  jQuery("#pixsize").val(pix_size);
  jQuery("#reswidth").val(res_wdth);
  jQuery("#resheight").val(res_hght);
  document.getElementById("camera_btn").innerHTML = cam_name;
  check_if_not_empty();
}
