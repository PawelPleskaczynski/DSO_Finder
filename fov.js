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

    fov_width_text.innerHTML = "Width: " + fov_width.toFixed(2) + " arcminutes";
    fov_height_text.innerHTML = "Height: " + fov_height.toFixed(2) + " arcminutes";
    resolution_text.innerHTML = "Resolution: " + res.toFixed(2) + " arcseconds/px"
    loading_text.innerHTML = "Loading...";

    if (object_imaging_v.toUpperCase().trim() == "moon".toUpperCase()) {
      load_solar_system_obj_img("moon", 29.333, moon_ang, 34.1, fov_height, fov_width);
      restart_pos();
      drag_obj();
    } else if (object_imaging_v.toUpperCase().trim() == "mercury".toUpperCase()) {
      load_solar_system_obj_img("mercury", 0.075, mercury_ang, 0.216, fov_height, fov_width);
      restart_pos();
      drag_obj();
    } else if (object_imaging_v.toUpperCase().trim() == "venus".toUpperCase()) {
      load_solar_system_obj_img("venus", 0.161, venus_ang, 1.1, fov_height, fov_width);
      restart_pos();
      drag_obj();
    } else if (object_imaging_v.toUpperCase().trim() == "mars".toUpperCase()) {
      load_solar_system_obj_img("mars", 0.0583, mars_ang, 0.418, fov_height, fov_width);
      restart_pos();
      drag_obj();
    } else if (object_imaging_v.toUpperCase().trim() == "jupiter".toUpperCase()) {
      load_solar_system_obj_img("jupiter", 0.496, jupiter_ang, 0.835, fov_height, fov_width);
      restart_pos();
      drag_obj();
    } else if (object_imaging_v.toUpperCase().trim() == "saturn".toUpperCase()) {
      load_solar_system_obj_img("saturn", 0.583, saturn_ang, 0.723, fov_height, fov_width);
      restart_pos();
      drag_obj();
    } else if (object_imaging_v.toUpperCase().trim() == "uranus".toUpperCase()) {
      load_solar_system_obj_img("uranus", 0.055, uranus_ang, 0.068, fov_height, fov_width);
      restart_pos();
      drag_obj();
    } else if (object_imaging_v.toUpperCase().trim() == "neptune".toUpperCase()) {
      load_solar_system_obj_img("neptune", 0.036, neptune_ang, 0.04, fov_height, fov_width);
      restart_pos();
      drag_obj();
    } else if (object_imaging_v.toUpperCase().trim() == "sun".toUpperCase()) {
      load_solar_system_obj_img("sun", 31.45, sun_ang, 32.53, fov_height, fov_width);
      restart_pos();
      drag_obj();
    } else if (object_imaging_v.toUpperCase().trim() == "iss".toUpperCase() || object_imaging_v.toUpperCase().trim() == "international space station".toUpperCase()) {
      iss_img(fov_height, fov_width);
      restart_pos();
      drag_obj();
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
              image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov_width + "&y=" + fov_height + "&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
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
            jQuery("#card").fadeIn("slow");
            jQuery("#loading_text").hide();
            scroll_bottom_load();
            function mediaquery(query) {
              if (query.matches) {
                jQuery(".small_img_div").fadeIn("slow");
              } else {
                jQuery(".small_img_div").hide();
              }
            }
            var query = window.matchMedia("(min-width: 1024px)")
            mediaquery(query);
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
            jQuery("#card").fadeIn("slow");
            jQuery("#loading_text").fadeOut("slow");
            scroll_bottom_load();
            function mediaquery(query) {
              if (query.matches) {
                jQuery(".small_img_div").fadeIn("slow");
              } else {
                jQuery(".small_img_div").hide();
              }
            }
            var query = window.matchMedia("(min-width: 1024px)")
            mediaquery(query);
          }

          image_big_fov.onload = function() {
            jQuery("#card").fadeIn("slow");
            jQuery("#loading_text").fadeOut("slow");
            scroll_bottom_load();

            function mediaquery(query) {
              if (query.matches) {
                jQuery(".small_img_div").fadeIn("slow");
              } else {
                jQuery(".small_img_div").hide();
              }
            }
            var query = window.matchMedia("(min-width: 1024px)")
            mediaquery(query);

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
      load_solar_system_obj_obs("moon", 29.333, moon_ang, 34.1, fov);
      restart_pos();
      drag_obj();
    } else if (object_observing_v.toUpperCase().trim() == "mercury".toUpperCase()) {
      load_solar_system_obj_obs("mercury", 0.075, mercury_ang, 0.216, fov);
      restart_pos();
      drag_obj();
    } else if (object_observing_v.toUpperCase().trim() == "venus".toUpperCase()) {
      load_solar_system_obj_obs("venus", 0.161, venus_ang, 1.1, fov);
      restart_pos();
      drag_obj();
    } else if (object_observing_v.toUpperCase().trim() == "mars".toUpperCase()) {
      load_solar_system_obj_obs("mars", 0.0583, mars_ang, 0.418, fov);
      restart_pos();
      drag_obj();
    } else if (object_observing_v.toUpperCase().trim() == "jupiter".toUpperCase()) {
      load_solar_system_obj_obs("jupiter", 0.496, jupiter_ang, 0.835, fov);
      restart_pos();
      drag_obj();
    } else if (object_observing_v.toUpperCase().trim() == "saturn".toUpperCase()) {
      load_solar_system_obj_obs("saturn", 0.583, saturn_ang, 0.723, fov);
      restart_pos();
      drag_obj();
    } else if (object_observing_v.toUpperCase().trim() == "uranus".toUpperCase()) {
      load_solar_system_obj_obs("uranus", 0.055, uranus_ang, 0.068, fov);
      restart_pos();
      drag_obj();
    } else if (object_observing_v.toUpperCase().trim() == "neptune".toUpperCase()) {
      load_solar_system_obj_obs("neptune", 0.036, neptune_ang, 0.04, fov);
      restart_pos();
      drag_obj();
    } else if (object_observing_v.toUpperCase().trim() == "sun".toUpperCase()) {
      load_solar_system_obj_obs("sun", 31.45, sun_ang, 32.53, fov);
      restart_pos();
      drag_obj();
    } else if (object_observing_v.toUpperCase().trim() == "iss".toUpperCase() || object_observing_v.toUpperCase().trim() == "international space station".toUpperCase()) {
       iss_obs(fov);
       restart_pos();
       drag_obj();
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
              image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov + "&y=" + fov + "&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
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
            jQuery("#card").fadeIn("slow");
            jQuery("#loading_text").fadeOut("slow");
            scroll_bottom_load();
            function mediaquery(query) {
              if (query.matches) {
                jQuery(".small_img_div").fadeIn("slow");
              } else {
                jQuery(".small_img_div").hide();
              }
            }
            var query = window.matchMedia("(min-width: 1024px)")
            mediaquery(query);
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
              jQuery("#card").fadeIn("slow");
              jQuery("#loading_text").fadeOut("slow");
              scroll_bottom_load();
              function mediaquery(query) {
                if (query.matches) {
                  jQuery(".small_img_div").fadeIn("slow");
                } else {
                  jQuery(".small_img_div").hide();
                }
              }
              var query = window.matchMedia("(min-width: 1024px)")
              mediaquery(query);
            }

          image_big_fov_obs.onload = function() {
            jQuery("#card").fadeIn("slow");
            jQuery("#loading_text").fadeOut("slow");
            scroll_bottom_load();

            function mediaquery(query) {
              if (query.matches) {
                jQuery(".small_img_div").fadeIn("slow");
              } else {
                jQuery(".small_img_div").hide();
              }
            }
            var query = window.matchMedia("(min-width: 1024px)")
            mediaquery(query);

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
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov_width + "&y=" + fov_height + "&mime-type=download-gif&Sky-Survey=DSS1&equinox=J2000&statsmode=VO";
  } else if (img_type == "DSS2") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov_width + "&y=" + fov_height + "&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
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
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov_width + "&y=" + fov_height + "&mime-type=download-gif&Sky-Survey=DSS1&equinox=J2000&statsmode=VO";
  } else if (img_type == "DSS2") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov_width + "&y=" + fov_height + "&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
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
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov_width + "&y=" + fov_height + "&mime-type=download-gif&Sky-Survey=DSS1&equinox=J2000&statsmode=VO";
  } else if (img_type == "DSS2") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov_width + "&y=" + fov_height + "&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
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
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov_width + "&y=" + fov_height + "&mime-type=download-gif&Sky-Survey=DSS1&equinox=J2000&statsmode=VO";
  } else if (img_type == "DSS2") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov_width + "&y=" + fov_height + "&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
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
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov + "&y=" + fov + "&mime-type=download-gif&Sky-Survey=DSS1&equinox=J2000&statsmode=VO";
  } else if (img_type == "DSS2") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov + "&y=" + fov + "&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
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
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov + "&y=" + fov + "&mime-type=download-gif&Sky-Survey=DSS1&equinox=J2000&statsmode=VO";
  } else if (img_type == "DSS2") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov + "&y=" + fov + "&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
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
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov + "&y=" + fov + "&mime-type=download-gif&Sky-Survey=DSS1&equinox=J2000&statsmode=VO";
  } else if (img_type == "DSS2") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov + "&y=" + fov + "&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
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
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov + "&y=" + fov + "&mime-type=download-gif&Sky-Survey=DSS1&equinox=J2000&statsmode=VO";
  } else if (img_type == "DSS2") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + fov + "&y=" + fov + "&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
  } else if (img_type == "SDSS") {
    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + (fov * 60 / 1024) + "&width=1024&height=1024";
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
  function mediaquery(query) {
    if (query.matches) {
      jQuery(".small_img_div").fadeIn("slow");
    } else {
      jQuery(".small_img_div").hide();
    }
  }
  var query = window.matchMedia("(min-width: 1024px)")
  mediaquery(query);
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
    if (fovwidth * fovheight > 400) {
      jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/moon.jpg)");
    } else if (fovwidth * fovheight <= 400 && fovwidth * fovheight >= 64) {
      jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/moon_medium.jpg)");
    } else if (fovwidth * fovheight < 64) {
      jQuery("#solar_system_obj").css("background","url(images/ui/solar_system/moon_big.jpg)");
    }
  } else {
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
  function mediaquery(query) {
    if (query.matches) {
      jQuery(".small_img_div").fadeIn("slow");
    } else {
      jQuery(".small_img_div").hide();
    }
  }
  var query = window.matchMedia("(min-width: 1024px)")
  mediaquery(query);
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
  function mediaquery(query) {
    if (query.matches) {
      jQuery(".small_img_div").fadeIn("slow");
    } else {
      jQuery(".small_img_div").hide();
    }
  }
  var query = window.matchMedia("(min-width: 1024px)")
  mediaquery(query);
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
  function mediaquery(query) {
    if (query.matches) {
      jQuery(".small_img_div").fadeIn("slow");
    } else {
      jQuery(".small_img_div").hide();
    }
  }
  var query = window.matchMedia("(min-width: 1024px)")
  mediaquery(query);
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

function make_small() {
  if (jQuery("#small_link").text() == "The image is too big, make it smaller.") {
    anime({
      targets: "#card",
      scale: 0.66,
      easing: 'easeInOutQuart',
      duration: 600
    });
    jQuery("#small_link").text("Make size normal.");
  } else {
    anime({
      targets: "#card",
      scale: 1,
      easing: 'easeInOutQuart',
      duration: 600
    });
    jQuery("#small_link").text("The image is too big, make it smaller.");
  }
}
