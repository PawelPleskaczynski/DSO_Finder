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

function load() {
  const proxyURL = "https://cors-anywhere.herokuapp.com/";
  const requestURL = "https://api.arcsecond.io/objects/" + getVar("obj") + "/?format=json";
  $.getJSON(proxyURL + requestURL, function(json) {
      var name = json.name;
      var coords = json.ICRS_coordinates;
      ra = coords.right_ascension;
      dec = coords.declination;
      title.innerHTML = bigLetter(name);
      card_ra.innerHTML = "RA: " + ra;
      card_dec.innerHTML = "DEC: " + dec;
      var table_data = json.aliases;

      createTable();

      function createTable() {
        var columns = addAllColumnHeaders(table_data);

        for (var i = 0 ; i < table_data.length ; i++) {
          var row$ = $('<tr/>');
          for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
              var cellValue = table_data[i][columns[colIndex]];

              if (cellValue == null) { cellValue = ""; }

              row$.append($('<td/>').html(cellValue));
            }
            $("#table").append(row$);
          }
        }

        function addAllColumnHeaders(table_data) {
          var columnSet = [];
          var headerTr$ = $('<tr/>');

          for (var i = 0 ; i < table_data.length ; i++) {
            var rowHash = table_data[i];
            for (var key in rowHash) {
              if ($.inArray(key, columnSet) == -1){
                  columnSet.push(key);
                  headerTr$.append($('<th/>').html(key));
               }
             }
           }
           $("#table").append(headerTr$);

           return columnSet;
         }


      document.getElementById("link_simbad").href = "http://simbad.u-strasbg.fr/simbad/sim-basic?Ident=" + name + "&submit=SIMBAD+search"

      preloadImage("http://archive.eso.org/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=30.000000&y=30.000000&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO");
      preloadImage("http://archive.eso.org/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=30.000000&y=30.000000&mime-type=download-gif&Sky-Survey=DSS2-blue&equinox=J2000&statsmode=VO");
      preloadImage("http://archive.eso.org/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=30.000000&y=30.000000&mime-type=download-gif&Sky-Survey=DSS2-infrared&equinox=J2000&statsmode=VO");
      preloadImage("http://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=3.5&width=512&height=512&opt=L");

      image.src = "http://archive.eso.org/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=30.000000&y=30.000000&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";

      image.onload = function() {
        jQuery("#card").fadeIn("slow");
        jQuery("#loading_text").fadeOut("slow");
        jQuery("#table").fadeIn("slow");
      }

    });
}

function option_r() {
  jQuery("#loading_text_img").show();
  image.onload = function () {
     jQuery("#loading_text_img").hide();
  }
  image.src = "http://archive.eso.org/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=30.000000&y=30.000000&mime-type=download-gif&Sky-Survey=DSS2-red&equinox=J2000&statsmode=VO";
}
function option_b() {
  jQuery("#loading_text_img").show();
  image.onload = function () {
     jQuery("#loading_text_img").hide();
  }
  image.src = "http://archive.eso.org/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=30.000000&y=30.000000&mime-type=download-gif&Sky-Survey=DSS2-blue&equinox=J2000&statsmode=VO";
}
function option_ir() {
  jQuery("#loading_text_img").show();
  image.onload = function () {
     jQuery("#loading_text_img").hide();
  }
  image.src = "http://archive.eso.org/dss/dss/image?ra=" + ra + "&dec=" + dec + "&x=30.000000&y=30.000000&mime-type=download-gif&Sky-Survey=DSS2-infrared&equinox=J2000&statsmode=VO";
}
function option_sdss() {
  jQuery("#loading_text_img").show();
  image.onload = function () {
     jQuery("#loading_text_img").hide();
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

function preloadImage(url)
{
    var img = new Image();
    img.src = url;
}
