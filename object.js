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

window.onLoad = load();
window.onLoad = jQuery("#loading_text").fadeIn("slow");

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

function load() {
  const proxyURL = "https://cors-anywhere.herokuapp.com/";
  const requestURL = "https://api.arcsecond.io/objects/" + getVar("obj") + "/?format=json";
  $.getJSON(proxyURL + requestURL, function(json) {
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

      document.getElementById("loading_text").innerHTML = "Loading image...";

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

      preloadImage("http://archive.eso.org/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=30.000000&y=30.000000&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO");
      preloadImage("http://archive.eso.org/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=30.000000&y=30.000000&mime-type=download-gif&Sky-Survey=DSS2-blue&equinox=J2000&statsmode=VO");
      preloadImage("http://archive.eso.org/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=30.000000&y=30.000000&mime-type=download-gif&Sky-Survey=DSS2-infrared&equinox=J2000&statsmode=VO");
      preloadImage("http://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=3.5&width=512&height=512&opt=L");

      image.src = "http://archive.eso.org/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=30.000000&y=30.000000&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";

      image.onload = function() {
        jQuery("#card").fadeIn("slow");
        jQuery("#loading_text").fadeOut("slow");
        jQuery("#table_div").fadeIn("slow");
      }

      image.onerror = function() {
        image.onerror = "";
        image.src = "img_error.png";
      }

    });
}

function option_r() {
  jQuery("#loading_text_img").show();
  image.onload = function () {
     jQuery("#loading_text_img").hide();
     black_white();
  }
  image.onerror = function() {
    image.onerror = "";
    image.src = "img_error.png";
  }
  image.src = "http://archive.eso.org/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=30.000000&y=30.000000&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
}
function option_b() {
  jQuery("#loading_text_img").show();
  image.onload = function () {
     jQuery("#loading_text_img").hide();
     black_white();
  }
  image.onerror = function() {
    image.onerror = "";
    image.src = "img_error.png";
  }
  image.src = "http://archive.eso.org/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=30.000000&y=30.000000&mime-type=download-gif&Sky-Survey=DSS2-blue&equinox=J2000&statsmode=VO";
}
function option_ir() {
  jQuery("#loading_text_img").show();
  image.onload = function () {
     jQuery("#loading_text_img").hide();
     black_white();
  }
  image.onerror = function() {
    image.onerror = "";
    image.src = "img_error.png";
  }
  image.src = "http://archive.eso.org/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=30.000000&y=30.000000&mime-type=download-gif&Sky-Survey=DSS2-infrared&equinox=J2000&statsmode=VO";
}
function option_sdss() {
  jQuery("#loading_text_img").show();
  image.onload = function () {
     jQuery("#loading_text_img").hide();
     color();
  }
  image.onerror = function() {
    image.onerror = "";
    image.src = "img_error.png";
  }
  image.src = "http://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=3.5&width=512&height=512&opt=L";
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
