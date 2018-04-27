var title = document.getElementById("cardtitle");
var card_ra = document.getElementById("card_ra");
var card_dec = document.getElementById("card_dec");
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

window.onLoad = load();
window.onLoad = jQuery("#loading_text").fadeIn("slow");

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

function load() {
  if (is_coords) {
    var requestURL = "https://calm-eyrie-13472.herokuapp.com/https://api.arcsecond.io/objects/?coordinates=" + getVar("obj") + "&format=json&radius=10";
    json();
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
  } else {
    var requestURL = "https://calm-eyrie-13472.herokuapp.com/https://api.arcsecond.io/objects/" + getVar("obj") + "/?format=json";
    json();
  }

  function json() {
    $.getJSON(requestURL, function(json) {
      if (is_coords) {
        if (json.name == null) {
          document.getElementById("loading_text").innerHTML = "Loading image…";

          image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + getVar("ra") + "&dec=" + getVar("dec") + "&x=" + zoom_dss + ".000000&y=" + zoom_dss + ".000000&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";

          $(".card-title").hide();
          $(".card-text").hide();
          $("#table_div").hide();

          ra = getVar("ra");
          dec = getVar("dec");

          image.onload = function() {
            jQuery("#card").fadeIn("slow");
            jQuery("#loading_text").fadeOut("slow");
            img_type = "DSS_R";
          }

          image.onerror = function() {
            image.onerror = "";
            image.src = "img_error.png";
          }

        } else {
          var name_first = json;
          var result = name_first[0];
          var name = result.name;
          var coords = result.ICRS_coordinates;
          ra = coords.right_ascension;
          dec = coords.declination;
          title.innerHTML = bigLetter(name);
          card_ra.innerHTML = "RA: " + ra;
          card_dec.innerHTML = "DEC: " + dec;
          var table_data_object_types = result.object_types;
          var table_data_aliases = result.aliases;
          var table_data_fluxes = result.fluxes;

          document.getElementById("raplus").onclick = "ra_plus()";
          document.getElementById("raminus").onclick = "ra_minus()";
          document.getElementById("decplus").onclick = "dec_plus()";
          document.getElementById("decminus").onclick = "dec_minus()";
        }
      } else {
        var name = json.name;
        var coords = json.ICRS_coordinates;
        ra = coords.right_ascension;
        dec = coords.declination;
        title.innerHTML = bigLetter(name);
        card_ra.innerHTML = "RA: " + ra;
        card_dec.innerHTML = "DEC: " + dec;
        var table_data_object_types = json.object_types;
        var table_data_aliases = json.aliases;
        var table_data_fluxes = json.fluxes;
      }

      document.getElementById("loading_text").innerHTML = "Loading image…";

      createTable_object_types();
      createTable_aliases();
      createTable_fluxes();

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


      document.getElementById("link_simbad").href = "http://simbad.u-strasbg.fr/simbad/sim-basic?Ident=" + name + "&submit=SIMBAD+search";

      image.src = "https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + zoom_dss + ".000000&y=" + zoom_dss + ".000000&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";

      image.onload = function() {
        jQuery("#card").fadeIn("slow");
        jQuery("#loading_text").fadeOut("slow");
        jQuery("#table_div").fadeIn("slow");
        img_type = "DSS_R";
      }

      image.onerror = function() {
        image.onerror = "";
        image.src = "img_error.png";
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
        image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + ".5&width=512&height=512&opt=L";
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
      image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + ".5&width=512&height=512&opt=L";
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
  image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + ".5&width=512&height=512&opt=L";
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
    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + ".5&width=512&height=512&opt=L";
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
    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + ".5&width=512&height=512&opt=L";
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
    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + ".5&width=512&height=512&opt=L";
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
    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + ".5&width=512&height=512&opt=L";
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
