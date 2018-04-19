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

window.onLoad = load();
window.onLoad = jQuery("#loading_text").fadeIn("slow");

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

function load() {
  var proxyURL = "https://calm-eyrie-13472.herokuapp.com/";
  var requestURL = "https://calm-eyrie-13472.herokuapp.com/https://api.arcsecond.io/objects/" + getVar("obj") + "/?format=json";
  var finalUrl = proxyURL + requestURL;
  $.getJSON(requestURL, function(json) {
      var name = json.name;
      var coords = json.ICRS_coordinates;
      if (coords == null || coords == "null") {
        jQuery("#loading_text").fadeOut("slow");
        jQuery(".alert").fadeIn("slow");
      }
      ra = coords.right_ascension;
      dec = coords.declination;
      title.innerHTML = bigLetter(name);
      card_ra.innerHTML = "RA: " + ra;
      card_dec.innerHTML = "DEC: " + dec;
      var table_data_object_types = json.object_types;
      var table_data_aliases = json.aliases;
      var table_data_fluxes = json.fluxes;

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

      preloadImage("https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + zoom_dss + ".000000&y=" + zoom_dss + ".000000&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO");
      preloadImage("https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + zoom_dss + ".000000&y=" + zoom_dss + ".000000&mime-type=download-gif&Sky-Survey=DSS2-blue&equinox=J2000&statsmode=VO");
      preloadImage("https://https-proxy-dss.herokuapp.com/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=" + zoom_dss + ".000000&y=" + zoom_dss + ".000000&mime-type=download-gif&Sky-Survey=DSS2-infrared&equinox=J2000&statsmode=VO");
      preloadImage("https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + ".5&width=512&height=512&opt=L");

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

    });
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

function preloadImage(url){
    var img = new Image();
    img.src = url;
}

function openDSO() {
  var object_name = document.getElementById("input_name").value;
  window.open("object.html?obj=" + object_name,"_self");
}

function black_white() {
  $('#DSO_image').css('-webkit-filter','grayscale(100%)');
  $('#DSO_image').css('filter','grayscale(100%)');
}

function color() {
  $('#DSO_image').css('-webkit-filter','grayscale(0%)');
  $('#DSO_image').css('filter','grayscale(0%)');
}
