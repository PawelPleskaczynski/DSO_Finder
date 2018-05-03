var title = document.getElementById("cardtitle");
var card_ra_dec = document.getElementById("card_ra_dec");
var card_mag = document.getElementById("card_mag");
var button_r = document.getElementById("option_r");
var button_b = document.getElementById("option_b");
var button_ir = document.getElementById("option_ir");
var button_sdss = document.getElementById("option_sdss");
var ra;
var dec;
var image = document.getElementById("DSO_image");
var zoom_dss = 30;
var zoom_sdss = 3;
var img_type = "";
var is_coords = getVar("input_type") == "coordinates";
var mediaquery = window.matchMedia("(max-width: 1024px)");
var name;

window.onLoad = load();
window.onLoad = jQuery("#loading_text").fadeIn("slow");

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

function load() {
  if (is_coords) {
    var requestURL = "https://calm-eyrie-13472.herokuapp.com/https://api.arcsecond.io/objects/?coordinates=" + getVar("obj") + "&format=json&radius=10";
    json();
    jQuery("#link_left").attr("onclick","ra_plus()");
    jQuery("#link_right").attr("onclick","ra_minus()");
    jQuery("#link_up").attr("onclick","dec_plus()");
    jQuery("#link_down").attr("onclick","dec_minus()");

    jQuery("#link_left").show();
    jQuery("#link_right").show();
    jQuery("#link_up").show();
    jQuery("#link_down").show();
  } else if (getVar("obj").toUpperCase() == "sun".toUpperCase()) {
    document.getElementById("cardtitle").innerHTML = "Sun in white light";
    image.src = "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_HMIIC.jpg";
    image.onload = function() {
      jQuery("#loadingtextdiv").hide();
      jQuery(".card-text").hide();
      jQuery("#obs").hide();
      jQuery("#sun_btn").show();
      jQuery("#zoom_ra_dec_btns").hide();
      img_type = "wl_sun_img";
      jQuery("#card").fadeIn("slow");
    }
    color();
  } else if (getVar("obj").toUpperCase() == "moon".toUpperCase()) {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var day_final = day + (hour / 24);

    var phase = moonPhase(day_final,month,year);
    phase_round = Math.round(moonPhase(day_final,month,year));

    if (phase_round == 0) {
      phase_round = "New";
    } else if (phase_round == 1) {
      phase_round = "Waxing Crescent";
    } else if (phase_round == 2) {
      phase_round = "Quarter";
    } else if (phase_round == 3) {
      phase_round = "Waxing Gibbous";
    } else if (phase_round == 4) {
      phase_round = "Full";
    } else if (phase_round == 5) {
      phase_round = "Waning Gibbous";
    } else if (phase_round == 6) {
      phase_round = "Last Quarter";
    } else if (phase_round == 7) {
      phase_round = "Waning Crescent";
    } else if (phase_round == 8) {
      phase_round = "New";
    }
    if (phase <= 4) {
      phase = phase/4;
      phase = phase * 100;
    } else {
      phase = phase - 4;
      phase = phase/4;
      phase = 1-phase;
      phase = phase * 1000;
    }
    console.log(phase);

    document.getElementById("cardtitle").innerHTML = phase_round + " Moon";

    if (phase >= 0 && phase < 10) {
      image.src = "images/moon/moon_1.jpg"
    } else if (phase >= 10 && phase < 20) {
      image.src = "images/moon/moon_2.jpg"
    } else if (phase >= 20 && phase < 30) {
      image.src = "images/moon/moon_3.jpg"
    } else if (phase >= 30 && phase < 40) {
      image.src = "images/moon/moon_4.jpg"
    } else if (phase >= 40 && phase < 50) {
      image.src = "images/moon/moon_5.jpg"
    } else if (phase >= 50 && phase < 60) {
      image.src = "images/moon/moon_6.jpg"
    } else if (phase >= 60 && phase < 70) {
      image.src = "images/moon/moon_7.jpg"
    } else if (phase >= 70 && phase < 80) {
      image.src = "images/moon/moon_8.jpg"
    } else if (phase >= 80 && phase < 85) {
      image.src = "images/moon/moon_9.jpg"
    } else if (phase >= 85 && phase < 91) {
      image.src = "images/moon/moon_10.jpg"
    } else if (phase >= 91 && phase <= 100) {
      image.src = "images/moon/moon_12.jpg"
    } else if (phase >= 910 && phase < 1000) {
      image.src = "images/moon/moon_13.jpg"
    } else if (phase >= 800 && phase < 850) {
      image.src = "images/moon/moon_14.jpg"
    } else if (phase >= 700 && phase < 800) {
      image.src = "images/moon/moon_15.jpg"
    } else if (phase >= 600 && phase < 700) {
      image.src = "images/moon/moon_16.jpg"
    } else if (phase >= 500 && phase < 600) {
      image.src = "images/moon/moon_17.jpg"
    } else if (phase >= 400 && phase < 500) {
      image.src = "images/moon/moon_18.jpg"
    } else if (phase >= 300 && phase < 400) {
      image.src = "images/moon/moon_19.jpg"
    } else if (phase >= 200 && phase < 300) {
      image.src = "images/moon/moon_20.jpg"
    } else if (phase >= 100 && phase < 200) {
      image.src = "images/moon/moon_21.jpg"
    } else if (phase >= 0 && phase < 100) {
      image.src = "images/moon/moon_22.jpg"
    }

    image.onload = function() {
      jQuery("#loadingtextdiv").hide();
      jQuery(".card-text").hide();
      jQuery("#obs").hide();
      jQuery("#zoom_ra_dec_btns").hide();
      jQuery("#card").fadeIn("slow");
    }
  } else {
    var requestURL = "https://calm-eyrie-13472.herokuapp.com/https://api.arcsecond.io/objects/" + getVar("obj") + "/?format=json";
    json();
    jQuery("#link_left").attr("onclick","ra_plus()");
    jQuery("#link_right").attr("onclick","ra_minus()");
    jQuery("#link_up").attr("onclick","dec_plus()");
    jQuery("#link_down").attr("onclick","dec_minus()");

    jQuery("#link_left").show();
    jQuery("#link_right").show();
    jQuery("#link_up").show();
    jQuery("#link_down").show();
  }

  function json() {
    $.getJSON(requestURL, function(json) {
      if (is_coords) {
        if (json[0] == undefined) {
          document.getElementById("loading_text").innerHTML = "Loading image…";

          ra = getVar("ra");
          dec = getVar("dec");

          $(".card-title").hide();
          $(".card-text").hide();
          $("#table_div").hide();

          var request = new XMLHttpRequest();
          request.onreadystatechange = function() {
            if (request.readyState === 4){
              request.status;
              if (request.status == 200) {
                jQuery("#btn_sdss").show();
                image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + ".5&width=512&height=512";
                img_type = "SDSS";
                color();
              } else {
                jQuery("#btn_no_sdss").show();
                image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + zoom_dss + ".000000&y=" + zoom_dss + ".000000&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
                img_type = "DSS_R";
              }
            }
          };
          request.open("GET", "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + ".5&width=128&height=128", true);
          request.send();
          jQuery("#table_btn_div").hide();

          image.onload = function() {
            jQuery("#card").fadeIn("slow");
            jQuery("#loading_text").fadeOut("slow");
          }


          image.onerror = function() {
            image.onerror = "";
            image.src = "img_error.png";
          }

        } else {
          var result = json[0];
          name = result.name;
          var coords = result.ICRS_coordinates;
          ra = coords.right_ascension;
          dec = coords.declination;
          title.innerHTML = bigLetter(name);
          card_ra_dec.innerHTML = "RA: " + ra + "&middot; DEC: " + dec;
          var table_data_object_types = result.object_types;
          var table_data_aliases = result.aliases;
          var table_data_fluxes = result.fluxes;

          document.title = name + " - DSO Finder";

          document.getElementById("raplus").onclick = "ra_plus()";
          document.getElementById("raminus").onclick = "ra_minus()";
          document.getElementById("decplus").onclick = "dec_plus()";
          document.getElementById("decminus").onclick = "dec_minus()";
        }
      } else {
        name = json.name;
        var coords = json.ICRS_coordinates;
        if (coords == null || coords == undefined) {
          if (getVar("obj").includes("%20")) {
            window.open("object.html?obj=" + getVar("obj").replace("%20",""),"_self");
          } else {
            var error = document.getElementById("error_message");
            error.innerHTML = "An error occured while processing query '" + getVar("obj") + "'.";
            jQuery("#loading_text").fadeOut("slow");
            jQuery(".alert").fadeIn("slow");
          }
        }
        document.title = name + " - DSO Finder";
        ra = coords.right_ascension;
        dec = coords.declination;
        title.innerHTML = bigLetter(name);
        card_ra_dec.innerHTML = "RA " + ra + "  &middot;  DEC " + dec;
        var table_data_object_types = json.object_types;
        var table_data_aliases = json.aliases;
        var table_data_fluxes = json.fluxes;
      }

      document.getElementById("loading_text").innerHTML = "Loading image…";

      if (table_data_object_types[0] != undefined) {
        createTable_object_types();
      } else {
        jQuery("#table_type").hide();
        jQuery("#table_type_p").hide();
        jQuery("#table_btn_div").hide();
      }

      if (table_data_aliases[0] != undefined) {
        createTable_aliases();
      } else {
        jQuery("#table_aliases").hide();
        jQuery("#table_aliases_p").hide();
        jQuery("#table_btn_div").hide();
      }

      if (table_data_fluxes[0] != undefined) {
        createTable_fluxes();
      } else {
        jQuery("#table_fluxes").hide();
        jQuery("#table_fluxes_p").hide();
        jQuery("#table_btn_div").hide();
      }

      function createTable_object_types() {
        var columns = addAllColumnHeaders_object_types(table_data_object_types);

        for (var i = 0 ; i < table_data_object_types.length ; i++) {
          var row$ = $('<tr/>');
          for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
            var cellValue = table_data_object_types[i][columns[colIndex]];

            if (cellValue == null) { cellValue = ""; }

            row$.append($('<td/>').html(cellValue));
          }
          $("#table_type").append(row$);
        }
      }

      function addAllColumnHeaders_object_types(table_data_object_types) {
        var columnSet = [];
        var headerTr$ = $('<tr/>');

        for (var i = 0 ; i < table_data_object_types.length ; i++) {
          var rowHash = table_data_object_types[i];
          for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1){
              columnSet.push(key);
              headerTr$.append($('<th/>').html(key));
            }
          }
        }
        $("#table_type").append(headerTr$);

        return columnSet;
      }

      function createTable_aliases() {
        var columns = addAllColumnHeaders_aliases(table_data_aliases);

        for (var i = 0 ; i < table_data_aliases.length ; i++) {
          var row$ = $('<tr/>');
          for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
            var cellValue = table_data_aliases[i][columns[colIndex]];

            if (cellValue == null) { cellValue = ""; }

            row$.append($('<td/>').html(cellValue));
          }
          $("#table_aliases").append(row$);
        }
      }

      function addAllColumnHeaders_aliases(table_data_aliases) {
        var columnSet = [];
        var headerTr$ = $('<tr/>');

        for (var i = 0 ; i < table_data_aliases.length ; i++) {
          var rowHash = table_data_aliases[i];
          for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1){
              columnSet.push(key);
              headerTr$.append($('<th/>').html(key));
            }
          }
        }
        $("#table_aliases").append(headerTr$);

        return columnSet;
      }

      function createTable_fluxes() {
        var columns = addAllColumnHeaders_fluxes(table_data_fluxes);

        for (var i = 0 ; i < table_data_fluxes.length ; i++) {
          var row$ = $('<tr/>');
          for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
            var cellValue = table_data_fluxes[i][columns[colIndex]];

            if (cellValue == null) { cellValue = ""; }

            row$.append($('<td/>').html(cellValue));
          }
          $("#table_fluxes").append(row$);
        }
      }

      function addAllColumnHeaders_fluxes(table_data_fluxes) {
        var columnSet = [];
        var headerTr$ = $('<tr/>');

        for (var i = 0 ; i < table_data_fluxes.length ; i++) {
          var rowHash = table_data_fluxes[i];
          for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1){
              columnSet.push(key);
              headerTr$.append($('<th/>').html(key));
            }
          }
        }
        $("#table_fluxes").append(headerTr$);

        return columnSet;
      }

      document.title = name + " - DSO Finder";
      document.getElementById("link_simbad").href = "http://simbad.u-strasbg.fr/simbad/sim-basic?Ident=" + name + "&submit=SIMBAD+search";

      var request = new XMLHttpRequest();
      request.onreadystatechange = function() {
        if (request.readyState === 4){
          request.status;
          if (request.status == 200) {
            jQuery("#btn_sdss").show();
            image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + ".5&width=512&height=512";
            img_type = "SDSS";
            color();
          } else {
            jQuery("#btn_no_sdss").show();
            image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + zoom_dss + ".000000&y=" + zoom_dss + ".000000&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
            img_type = "DSS_R";
          }
        }
      };
      request.open("GET", "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + ".5&width=128&height=128", true);
      request.send();

      image.onload = function() {
        jQuery("#card").fadeIn("slow");
        jQuery("#loading_text").fadeOut("slow");
        function hideTable(mediaquery) {
          if (mediaquery.matches) {
            jQuery("#table_div").hide();
            if (table_data_object_types[0] == undefined && table_data_aliases[0] == undefined && table_data_fluxes[0] == undefined) {
              jQuery("#table_btn_div").hide();
            } else {
              jQuery("#table_btn_div").fadeIn("slow");
            }
          } else {
            jQuery("#table_div").fadeIn("slow");
          }
        }
        hideTable(mediaquery);
        mediaquery.addListener(hideTable);
      }


      image.onerror = function() {
        image.onerror = "";
        image.src = "img_error.png";
      }


      var fluxes = table_data_fluxes;
      if (fluxes[0] != null && fluxes[0] != undefined) {
        for (var i = 0; i < fluxes.length; i++) {
          var flux = fluxes[i];
          if (fluxes[i].name == "V") {
            if (flux.value != null || flux.value != undefined) {
              var mag_vis = (flux.value).toFixed(2);
              card_mag.innerHTML = "Visual magnitude: " + mag_vis + " mag";
              jQuery("#card_mag").attr("style","display: inline-block;");
              if (mag_vis <= 6) {
                jQuery("#card_mag").attr("data-original-title","The object is extremely easy to view through a telescope.");
              } else if (mag_vis > 6 && mag_vis <= 8) {
                jQuery("#card_mag").attr("data-original-title","The object is easy to view through a telescope.");
              } else if (mag_vis > 8 && mag_vis <= 10) {
                jQuery("#card_mag").attr("data-original-title","The object is moderately easy to view through a telescope.");
              } else if (mag_vis > 10 && mag_vis <= 11) {
                jQuery("#card_mag").attr("data-original-title","The object is moderately hard to view through a telescope.");
              } else if (mag_vis > 11 && mag_vis <= 13) {
                jQuery("#card_mag").attr("data-original-title","The object is hard to view through a telescope.");
              } else if (mag_vis > 13) {
                jQuery("#card_mag").attr("data-original-title","The object is challenging to view through a telescope.");
              }
            } else {
              jQuery("#card_mag").hide();
            }
          }
        }
      } else {
        jQuery("#card_mag").hide();
      }

    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      jQuery("#loading_text").fadeOut("slow");
      var error = document.getElementById("error_message");
      var error_link = document.getElementById("error_link");
      error.innerHTML = "Couldn't find '" + getVar("obj").replace("%20"," ") + "'.";
      jQuery(".alert").fadeIn("slow");
      if (getVar("obj").match(/ncg/i)) {
        error_link.innerHTML = "Did you mean " + getVar("obj").replace(/ncg/i,"NGC").replace("%20"," ") + "?";
        error_link.href = "object.html?obj=" + getVar("obj").replace(/ncg/i,"NGC"),"_self";
      }
      if (getVar("obj").match(/pcg/i)) {
        error_link.innerHTML = "Did you mean " + getVar("obj").replace(/pcg/i,"PGC").replace("%20"," ") + "?";
        error_link.href = "object.html?obj=" + getVar("obj").replace(/pcg/i,"PGC"),"_self";
      }
      if (getVar("obj").match(/ucg/i)) {
        error_link.innerHTML = "Did you mean " + getVar("obj").replace(/ucg/i,"UGC").replace("%20"," ") + "?";
        error_link.href = "object.html?obj=" + getVar("obj").replace(/ucg/i,"UGC"),"_self";
      }
      if (getVar("obj").match(/hgc/i)) {
        error_link.innerHTML = "Did you mean " + getVar("obj").replace(/hgc/i,"HCG").replace("%20"," ") + "?";
        error_link.href = "object.html?obj=" + getVar("obj").replace(/hgc/i,"HCG"),"_self";
      }
      if (getVar("obj").match(/apr/i)) {
        error_link.innerHTML = "Did you mean " + getVar("obj").replace(/apr/i,"Arp").replace("%20"," ") + "?";
        error_link.href = "object.html?obj=" + getVar("obj").replace(/apr/i,"Arp"),"_self";
      }
      if (getVar("lucky") == "true") {
        lucky();
      }
    });
  }
}

function zoomin() {
  if (img_type == "DSS_R" || img_type == "DSS_B" || img_type == "DSS_IR") {
    zoom_dss = zoom_dss - 5;
  } else if (img_type == "SDSS") {
    zoom_sdss = zoom_sdss - 1;
  }

  if (zoom_dss >= 5) {
    jQuery("#loading_bg").show();
    image.onload = function () {
      jQuery("#loading_bg").hide();
    }
    if (img_type == "DSS_R") {
      image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + zoom_dss + ".000000&y=" + zoom_dss + ".000000&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
      black_white();
    } else if (img_type == "DSS_B") {
      image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + zoom_dss + ".000000&y=" + zoom_dss + ".000000&mime-type=download-gif&Sky-Survey=DSS2-blue&equinox=J2000&statsmode=VO";
      black_white();
    } else if (img_type == "DSS_IR") {
      image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + zoom_dss + ".000000&y=" + zoom_dss + ".000000&mime-type=download-gif&Sky-Survey=DSS2-infrared&equinox=J2000&statsmode=VO";
      black_white();
    } else if (img_type == "SDSS") {
      if (zoom_sdss >= 0) {
        image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + ".5&width=512&height=512";
        color();
      } else {
        zoom_sdss = 0;
        jQuery("#loading_bg").hide();
      }
    }
  }
  if (zoom_dss < 5) {
    zoom_dss = 5;
  }
}

function zoomout() {
  if (img_type == "DSS_R" || img_type == "DSS_B" || img_type == "DSS_IR") {
    zoom_dss = zoom_dss + 5;
  } else if (img_type == "SDSS") {
    zoom_sdss = zoom_sdss + 1;
  }

  if (zoom_dss <= 120) {
    jQuery("#loading_bg").show();
    image.onload = function () {
      jQuery("#loading_bg").hide();
    }
    if (img_type == "DSS_R") {
      image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + zoom_dss + ".000000&y=" + zoom_dss + ".000000&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
      black_white();
    } else if (img_type == "DSS_B") {
      image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + zoom_dss + ".000000&y=" + zoom_dss + ".000000&mime-type=download-gif&Sky-Survey=DSS2-blue&equinox=J2000&statsmode=VO";
      black_white();
    } else if (img_type == "DSS_IR") {
      image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + zoom_dss + ".000000&y=" + zoom_dss + ".000000&mime-type=download-gif&Sky-Survey=DSS2-infrared&equinox=J2000&statsmode=VO";
      black_white();
    } else if (img_type == "SDSS") {
      image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + ".5&width=512&height=512";
      color();
    }
  }
  if (zoom_dss > 120) {
    zoom_dss = 120;
  }
}

function option_r() {
  zoom_dss = 30;
  jQuery("#loading_bg").show();
  image.onload = function () {
     jQuery("#loading_bg").hide();
     black_white();
     img_type = "DSS_R";
  }
  image.onerror = function() {
    image.onerror = "";
    image.src = "img_error.png";
  }
  image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + zoom_dss + ".000000&y=" + zoom_dss + ".000000&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
}
function option_b() {
  zoom_dss = 30;
  jQuery("#loading_bg").show();
  image.onload = function () {
     jQuery("#loading_bg").hide();
     black_white();
     img_type = "DSS_B";
  }
  image.onerror = function() {
    image.onerror = "";
    image.src = "img_error.png";
  }
  image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + zoom_dss + ".000000&y=" + zoom_dss + ".000000&mime-type=download-gif&Sky-Survey=DSS2-blue&equinox=J2000&statsmode=VO";
}
function option_ir() {
  zoom_dss = 30;
  jQuery("#loading_bg").show();
  image.onload = function () {
     jQuery("#loading_bg").hide();
     black_white();
     img_type = "DSS_IR";
  }
  image.onerror = function() {
    image.onerror = "";
    image.src = "img_error.png";
  }
  image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + zoom_dss + ".000000&y=" + zoom_dss + ".000000&mime-type=download-gif&Sky-Survey=DSS2-infrared&equinox=J2000&statsmode=VO";
}
function option_sdss() {
  zoom_sdss = 3;
  jQuery("#loading_bg").show();
  image.onload = function () {
     jQuery("#loading_bg").hide();
     color();
     img_type = "SDSS";
  }
  image.onerror = function() {
    image.onerror = "";
    image.src = "img_error.png";
  }
  image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + ".5&width=512&height=512";
}

function bigLetter(string)
{
    string = string.split(" ");

    for (var i = 0, x = string.length; i < x; i++) {
        string[i] = string[i][0].toUpperCase() + string[i].substr(1);
    }

    return string.join(" ");
}

function getVar(variable){
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0; i<vars.length; i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
  }
  return(false);
}

function openDSO() {
  var object_name = document.getElementById("input_name").value;
  var coord_regex = /^(?:(|[0-9][0-9][0-9]|[0-9][0-9]|[0-9])(.|)(|[0-9][0-9][0-9]|[0-9][0-9]|[0-9])( |)([-+])(|[0-9][0-9][0-9]|[0-9][0-9]|[0-9])(.|)([0-9][0-9][0-9]|[0-9][0-9]|[0-9]))$/
  var ra_dec_regex = /^(?:([0-9]|[0-9][0-9])(h|H)(| )([0-9]|[0-9][0-9])(m|M)(| )([0-9]|[0-9][0-9]|[0-9].[0-9]|[0-9].[0-9][0-9]|[0-9].[0-9][0-9][0-9]|[0-9][0-9].[0-9]|[0-9][0-9].[0-9][0-9]|[0-9][0-9].[0-9][0-9][0-9])(s|S)(| )(|[+-−])([0-9]|[0-9][0-9])(d|D|°)(| )([0-9]|[0-9][0-9])(m|M|′|')(| )([0-9]|[0-9][0-9]|[0-9].[0-9]|[0-9].[0-9][0-9]|[0-9].[0-9][0-9][0-9]|[0-9][0-9].[0-9]|[0-9][0-9].[0-9][0-9]|[0-9][0-9].[0-9][0-9][0-9])(s|S|″|"))$/
  var ra_regex = /([0-9]|[0-9][0-9])(h|H)(| )([0-9]|[0-9][0-9])(m|M)(| )([0-9]|[0-9][0-9]|[0-9].[0-9]|[0-9].[0-9][0-9]|[0-9].[0-9][0-9][0-9]|[0-9][0-9].[0-9]|[0-9][0-9].[0-9][0-9]|[0-9][0-9].[0-9][0-9][0-9])(s|S)/
  var dec_regex = /(|[+-−])([0-9]|[0-9][0-9])(d|D|°)(| )([0-9]|[0-9][0-9])(m|M|′|')(| )([0-9]|[0-9][0-9]|[0-9].[0-9]|[0-9].[0-9][0-9]|[0-9].[0-9][0-9][0-9]|[0-9][0-9].[0-9]|[0-9][0-9].[0-9][0-9]|[0-9][0-9].[0-9][0-9][0-9])(s|S|″|")/
  var ra_h_regex = /([0-9]|[0-9][0-9])(h|H)/
  var ra_m_regex = /([0-9]|[0-9][0-9])(m|M)/
  var ra_s_regex = /(([0-9].[0-9])|([0-9][0-9].[0-9][0-9])|([0-9][0-9].[0-9][0-9][0-9])|([0-9])|([0-9][0-9]))(s|S)/
  var dec_d_regex = /(|[+-−])([0-9]|[0-9][0-9])(d|D|°)/
  var dec_m_regex = /([0-9]|[0-9][0-9])(m|M|′|')/
  var dec_s_regex = /(([0-9].[0-9])|([0-9][0-9].[0-9][0-9])|([0-9][0-9].[0-9][0-9][0-9])|([0-9])|([0-9][0-9]))(s|S|″|")/
  if (!object_name == null || !object_name == "") {
    if (coord_regex.test(object_name)) {
      window.open("object.html?obj=" + object_name.replace("+","%2B") +"&input_type=coordinates","_self");
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
      window.open("object.html?obj=" + ra_final.toFixed(3) + " " + dec_final.replace("+","%2B") + "&ra=" + ra_final.toFixed(3) + "&dec=" + dec_final.replace("+","%2B") + "&input_type=coordinates","_self");
    } else {
      if (object_name.match(/sun/i)) {
        window.open("object.html?obj=sun","_self")
      } else if (object_name.match(/moon/i)) {
        window.open("object.html?obj=moon","_self")
      } else {
        window.open("object.html?obj=" + object_name,"_self");
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
  if (img_type == "DSS_R") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + zoom_dss + ".000000&y=" + zoom_dss + ".000000&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
    black_white();
  } else if (img_type == "DSS_B") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + zoom_dss + ".000000&y=" + zoom_dss + ".000000&mime-type=download-gif&Sky-Survey=DSS2-blue&equinox=J2000&statsmode=VO";
    black_white();
  } else if (img_type == "DSS_IR") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + zoom_dss + ".000000&y=" + zoom_dss + ".000000&mime-type=download-gif&Sky-Survey=DSS2-infrared&equinox=J2000&statsmode=VO";
    black_white();
  } else if (img_type == "SDSS") {
    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + ".5&width=512&height=512";
    color();
  }
}

function ra_minus() {
  ra = +ra - 0.1;

  jQuery("#loading_bg").show();
  image.onload = function () {
    jQuery("#loading_bg").hide();
  }
  if (img_type == "DSS_R") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + zoom_dss + ".000000&y=" + zoom_dss + ".000000&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
    black_white();
  } else if (img_type == "DSS_B") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + zoom_dss + ".000000&y=" + zoom_dss + ".000000&mime-type=download-gif&Sky-Survey=DSS2-blue&equinox=J2000&statsmode=VO";
    black_white();
  } else if (img_type == "DSS_IR") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + zoom_dss + ".000000&y=" + zoom_dss + ".000000&mime-type=download-gif&Sky-Survey=DSS2-infrared&equinox=J2000&statsmode=VO";
    black_white();
  } else if (img_type == "SDSS") {
    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + ".5&width=512&height=512";
    color();
  }
}

function dec_plus() {
  dec = +dec + 0.1;

  jQuery("#loading_bg").show();
  image.onload = function () {
    jQuery("#loading_bg").hide();
  }
  if (img_type == "DSS_R") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + zoom_dss + ".000000&y=" + zoom_dss + ".000000&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
    black_white();
  } else if (img_type == "DSS_B") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + zoom_dss + ".000000&y=" + zoom_dss + ".000000&mime-type=download-gif&Sky-Survey=DSS2-blue&equinox=J2000&statsmode=VO";
    black_white();
  } else if (img_type == "DSS_IR") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + zoom_dss + ".000000&y=" + zoom_dss + ".000000&mime-type=download-gif&Sky-Survey=DSS2-infrared&equinox=J2000&statsmode=VO";
    black_white();
  } else if (img_type == "SDSS") {
    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + ".5&width=512&height=512";
    color();
  }
}

function dec_minus() {
  dec = +dec - 0.1;

  jQuery("#loading_bg").show();
  image.onload = function () {
    jQuery("#loading_bg").hide();
  }
  if (img_type == "DSS_R") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + zoom_dss + ".000000&y=" + zoom_dss + ".000000&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
    black_white();
  } else if (img_type == "DSS_B") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + zoom_dss + ".000000&y=" + zoom_dss + ".000000&mime-type=download-gif&Sky-Survey=DSS2-blue&equinox=J2000&statsmode=VO";
    black_white();
  } else if (img_type == "DSS_IR") {
    image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + zoom_dss + ".000000&y=" + zoom_dss + ".000000&mime-type=download-gif&Sky-Survey=DSS2-infrared&equinox=J2000&statsmode=VO";
    black_white();
  } else if (img_type == "SDSS") {
    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + ".5&width=512&height=512";
    color();
  }
}

function wl_sun() {
  jQuery("#loading_bg").show();
  image.onload = function () {
     jQuery("#loading_bg").hide();
     document.getElementById("cardtitle").innerHTML = "Sun in white light";
  }
  image.onerror = function() {
    image.onerror = "";
    image.src = "img_error.png";
  }
  image.src = "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_HMIIC.jpg";
}

function ha_sun() {
  jQuery("#loading_bg").show();
  image.onload = function () {
     jQuery("#loading_bg").hide();
     document.getElementById("cardtitle").innerHTML = "Sun in H-alpha";
  }
  image.onerror = function() {
    image.onerror = "";
    image.src = "img_error.png";
  }
  image.src = "https://www.daystarfilters.com/latest_gong_color.jpg";
}

function black_white() {
  $('#DSO_image').css('-webkit-filter','grayscale(100%)');
  $('#DSO_image').css('filter','grayscale(100%)');
}

function color() {
  $('#DSO_image').css('-webkit-filter','grayscale(0%)');
  $('#DSO_image').css('filter','grayscale(0%)');
}

function moonPhase(day, month, year) { /* based on https://www.subsystems.us/uploads/9/8/9/4/98948044/moonphase.pdf*/
  if (month < 3) {
    year = year - 1;
    month = month + 12;
  }
  var a = year / 100;
  var b = a / 4;
  var c = 2 - a + b;
  var e = 365.25 * (year + 4716);
  var f = 30.6001 * (month + 1);
  var julian = c + day + e + f - 1524.5;
  julian = julian - 2458224;
  var julian = julian / 29.530589;
  var julian_int = parseInt(julian);
  julian = julian - julian_int;
  julian_int = julian * 8;
  console.log(julian_int);
  if (Math.ceil(julian_int) > 8) {
    julian_int = 0;
  }
  return julian_int;
}

function showTable() {
  jQuery("#table_div").fadeIn("slow");
  jQuery("#show_table_btn").addClass("btn-expand-none");
  jQuery("#table_btn_div").removeClass("table_btn_div");
  jQuery("#table_btn_div").addClass("table_btn_div_small");
  jQuery("#table_btn_div").fadeOut(500);
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

var input_name = document.getElementById("input_name");

input_name.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("find_btn").click();
  }
});
