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
var zoom_sdss = 3.5;
var img_type = "";
var is_coords = getVar("input_type") == "coordinates";
var mediaquery = window.matchMedia("(max-width: 1024px)");
var name;
var slider = document.getElementById("slider");

jQuery(document).ready(function() {
  jQuery("#coords_icon").hide();
  jQuery("#mag_icon").hide();
  jQuery("#link_icon").hide();
  jQuery("#link_p").css("opacity","0");
  jQuery("#link_wikipedia").css("opacity","0");

  var slide = getVar("barslide");
  if (slide) {
    jQuery("#nonav_content").fadeIn("slow");
    anime({
      targets: '.navbar',
      translateY: "0%",
      duration: 500,
      easing: 'easeInOutQuart'
    });
  } else {
    jQuery(".navbar").css("transform","translateY(0)");
    jQuery("#nonav_content").fadeIn("slow");
  }
})

jQuery(document).ready(function() {
  jQuery("#loading_text").fadeIn("slow");
  load();
})

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

function load() {
  if (is_coords) {
    jQuery("#coords_icon").show();
    var requestURL = "https://cors-anywhere.herokuapp.com/https://api.arcsecond.io/objects/?coordinates=" + getVar("obj") + "&format=json&radius=10";
    json();
    jQuery("#link_left").attr("onclick","ra_plus()");
    jQuery("#link_right").attr("onclick","ra_minus()");
    jQuery("#link_up").attr("onclick","dec_plus()");
    jQuery("#link_down").attr("onclick","dec_minus()");

    jQuery("#link_left").show();
    jQuery("#link_right").show();
    jQuery("#link_up").show();
    jQuery("#link_down").show();
    jQuery("#slider_div").show();
  } else if (getVar("obj").toUpperCase() == "sun".toUpperCase()) {
    document.getElementById("cardtitle").innerHTML = "Sun in white light";
    image.src = "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_HMIIC.jpg";
    image.onload = function() {
      jQuery(".footer").css("opacity","1");
      jQuery("#loadingtextdiv").hide();
      jQuery("#card_ra_dec").hide();
      jQuery("#link_div").show();
      document.getElementById("link_simbad").innerHTML = "Images from SDO";
      document.getElementById("link_simbad").href = "https://sdo.gsfc.nasa.gov/";
      document.getElementById("link_wikipedia").href = "https://en.wikipedia.org/wiki/Sun";
      jQuery("#link_p").css("opacity","1");
      jQuery("#link_wikipedia").css("opacity","1");
      jQuery("#link_icon").show();
      jQuery("#link_simbad").show();
      jQuery("#obs").hide();
      jQuery("#sun_btn").show();
      jQuery("#zoom_ra_dec_btns").hide();
      img_type = "wl_sun_img";
      jQuery("#card").fadeIn(500);
      jQuery("#card").css("transform","scale(1.2)");
      anime({
        targets: '#card',
        scale: 1,
        duration: 1500
      });
    }

  } else if (getVar("obj").toUpperCase() == "moon".toUpperCase()) {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var timezone = date.getTimezoneOffset();
    timezone = timezone / 60 / 24;
    day = day + (hour / 24);
    day = day - timezone;
    var phase = moonPhase(day,month,year);
    phase_round = Math.round(moonPhase(day,month,year));

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

    document.getElementById("cardtitle").innerHTML = phase_round + " Moon";
    document.getElementById("iframe").setAttribute("src","https://quickmap.lroc.asu.edu/?layers=NrBsFYBoAZIRnpEoAsjZwLpNKG%2BscB2fDbMADlPnNAE5rDgjZWakiE2mAmOuqt3J9%2BjTOKQ9QPRkmBSuBcgGZoPQUskVVYicDhwo3OQbRCkBkueCroiskmVw1YrZ1f6d1uE48-lfsp43spWmp4M1urKMlEURLHhcChsDvIU9LoqPIkYcjH2NHqqypGkAHRQIKopWY7QymYVVTYNRkrFDQHG1WplrJUqDakwg-W%2BqWOtMdTQg8XSstWghXM84Cqg3c2bTQMbjhCz80PKGvv5DcE742H74ipEe4jVRNsDhkM8z3Of9evHP6tKSAg7Au6jT7FIjXPKvdppULndg2Ij9FFnEZMM6FbEUXIY7QeM7PLB6FJY-KiayqHjvDFqAlkzYQhDLWEY0DI3jxLGbdHYljE9w0hJ1YAob5LCV047KciShGjeVISUcuZ0B6q8D0tkS8BMhXgJVzDadOACy7QDnY6DQUlDBrEu18pAG13pLYedRHOKob0ZG3CDLcrXAcCGAgvcPJDwR1nkCOht0WuM8BD2cpERM5Y7ZrSgBP1Fw0u1K5mYIA&extent=-90%2C-25.89296936714001%2C90%2C26.24780686698097&proj=10");
    jQuery("#DSO_image").hide();
    jQuery(".footer").css("opacity","1");
    jQuery("#card_ra_dec").hide();
    jQuery("#link_div").show();
    document.getElementById("card_decs").innerHTML = "Map copyright - <a href=\"http://www.actgate.com/quickmap.html\">Applied Coherent Technology</a> and <a href=\"https://www.nasa.gov/mission_pages/LRO/main/index.html\">NASA LRO</a>.";
    jQuery("#card_decs").show();
    document.getElementById("link_simbad").innerHTML = "LRO Lunar Map";
    document.getElementById("link_simbad").href = "https://quickmap.lroc.asu.edu/";
    document.getElementById("link_wikipedia").href = "https://en.wikipedia.org/wiki/Moon";
    jQuery("#link_p").css("opacity","1");
    jQuery("#link_wikipedia").css("opacity","1");
    jQuery("#link_icon").show();
    jQuery("#link_simbad").show();
    jQuery("#loadingtextdiv").hide();
    jQuery("#obs").hide();
    jQuery("#zoom_ra_dec_btns").hide();
    jQuery("#card").fadeIn(500);
    jQuery("#card").css("transform","scale(1.2)");
    anime({
      targets: '#card',
      scale: 1,
      duration: 1500
    });
    var card_width = jQuery("#card").width();
    jQuery("#iframe").css("width", card_width);
    jQuery("#iframe").css("height", card_width);
    window.onresize = function() {
      var card_width = jQuery("#card").width();
      jQuery("#iframe").css("width", card_width);
      jQuery("#iframe").css("height", card_width);
    }
    jQuery("#iframe").show();
  } else {
    var requestURL = "https://cors-anywhere.herokuapp.com/https://api.arcsecond.io/objects/" + getVar("obj") + "/?format=json";
    json();
    jQuery("#link_left").attr("onclick","ra_plus()");
    jQuery("#link_right").attr("onclick","ra_minus()");
    jQuery("#link_up").attr("onclick","dec_plus()");
    jQuery("#link_down").attr("onclick","dec_minus()");

    jQuery("#link_left").show();
    jQuery("#link_right").show();
    jQuery("#link_up").show();
    jQuery("#link_down").show();
    jQuery("#coords_icon").show();
    jQuery("#link_icon").show();
    jQuery("#slider_div").show();
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
                image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + "&width=512&height=512";
                img_type = "SDSS";

                slider.setAttribute("min","5");
                slider.setAttribute("max","300");
                slider.setAttribute("value","30");
                update_fov();
              } else {
                jQuery("#btn_no_sdss").show();
                image.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-redANDequinox=J2000ANDstatsmode=VO";
                img_type = "DSS_R";
                slider.setAttribute("min","5");
                slider.setAttribute("max","90");
                slider.setAttribute("value","30");
                update_fov();
              }
            }
          };
          request.open("GET", "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + "&width=128&height=128", true);
          request.send();
          jQuery("#table_btn_div").hide();

          image.onload = function() {
            jQuery(".footer").css("opacity","1");
            jQuery("#card").fadeIn(500);
            jQuery("#card").css("transform","scale(1.2)");
            anime({
              targets: '#card',
              scale: 1,
              duration: 1500
            });
            jQuery("#loading_text").fadeOut("slow");
            preload();
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
        var requrl = "object_types.json";
        jQuery.getJSON(requrl, function(json) {
          for (var i = 0 ; i < table_data_object_types.length ; i++) {
            var row$ = $('<tr/>');
            for (var colIndex = 0 ; colIndex < 1 ; colIndex++) {
              var cellValue = table_data_object_types[i];

              function find_object(element) {
                return element.name == cellValue;
              }
              var element_index = json.findIndex(find_object);
              var value = json[element_index].value;
              cellValue = value;

              if (cellValue == null) { cellValue = ""; }

              row$.append($('<td/>').html(cellValue));
            }
            $("#table_type").append(row$);
          }
        });
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
      var messier_pattern = /^M\d+$|^M \d+$/;
      var number_pattern = /\d+/;
      if (getVar("input_type") != "coordinates") {
        if (messier_pattern.test(name)) {
          var name_new = number_pattern.exec(name);
          name = "Messier " + name_new;
        } else {
          name = name.toUpperCase();
          var no_space_pattern = /[a-zA-Z]+\d+/;
          var letters_pattern = /[a-zA-Z]+/;
          var number_pattern = /\d+/;
          if (no_space_pattern.test(name)) {
            var letters = letters_pattern.exec(name);
            var numbers = number_pattern.exec(name);
            name = letters + " " + numbers;
          }
        }
        var requrl = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&search=" + name;
        jQuery.getJSON(requrl, function(json) {
          var array = json[1];
          var array_desc = json[2];
          var array_link = json[3];
          function find_object(element) {
            return element.toUpperCase() == name.toUpperCase();
          }
          var element_index = array.findIndex(find_object);
          var description = array_desc[element_index];
          var link = array_link[element_index];
          if (description != "" && description != null && description != undefined) {
            document.getElementById("card_decs").innerHTML = description + "<a href=" + link + ">&nbsp;More...</a>";
          }
          if (link != "" && link != null && link != undefined) {
            document.getElementById("link_wikipedia").href = link;
            jQuery("#link_p").css("opacity","1");
            jQuery("#link_wikipedia").css("opacity","1");
          } else {
            jQuery("#link_p").css("opacity","0");
            jQuery("#link_wikipedia").css("opacity","0");
          }
          jQuery("#card_decs").fadeIn("slow");
        });
      } else {
        jQuery("#link_p").css("opacity","0");
        jQuery("#link_wikipedia").css("opacity","0");
      }

      var request = new XMLHttpRequest();
      request.onreadystatechange = function() {
        if (request.readyState === 4){
          request.status;
          if (request.status == 200) {
            jQuery("#btn_sdss").show();
            image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + "&width=512&height=512";
            img_type = "SDSS";

            slider.setAttribute("min","5");
            slider.setAttribute("max","300");
            slider.setAttribute("value","30");
            update_fov();
          } else {
            jQuery("#btn_no_sdss").show();
            image.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-redANDequinox=J2000ANDstatsmode=VO";
            img_type = "DSS_R";
            slider.setAttribute("min","5");
            slider.setAttribute("max","90");
            slider.setAttribute("value","30");
            update_fov();
          }
        }
      };
      request.open("GET", "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + "&width=128&height=128", true);
      request.send();

      image.onload = function() {
        jQuery(".footer").css("opacity","1");
        jQuery("#card").fadeIn(500);
        jQuery("#card").css("transform","scale(1.2)");
        anime({
          targets: '#card',
          scale: 1,
          duration: 1500
        });
        jQuery("#loading_text").fadeOut("slow");
        preload();
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
        window.scrollreveal = ScrollReveal();
        scrollreveal.reveal('#table_type_div');
        scrollreveal.reveal('#table_fluxes_div');
        scrollreveal.reveal('#table_aliases_div');
        scrollreveal.reveal('.footer');
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
              jQuery("#link_div").css("margin-top","-16px");
              jQuery("#mag_icon").show();
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
              jQuery("#mag_icon").hide();
            }
          }
        }
      } else {
        jQuery("#card_mag").hide();
        jQuery("#mag_icon").hide();
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
  update_fov();
  if (img_type == "DSS_R" || img_type == "DSS_B" || img_type == "DSS_IR") {
    zoom_dss = zoom_dss - 5;
  } else if (img_type == "SDSS") {
    zoom_sdss = zoom_sdss - 1;
  }

  if (zoom_dss >= 5) {
    jQuery("#loading_bg").show();
    image.onload = function () {
      jQuery("#loading_bg").hide();
      preload();
    }
    if (img_type == "DSS_R") {
      image.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-redANDequinox=J2000ANDstatsmode=VO";
      jQuery("#slider").val(zoom_dss * 10);
    } else if (img_type == "DSS_B") {
      image.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-blueANDequinox=J2000ANDstatsmode=VO";
      jQuery("#slider").val(zoom_dss * 10);
    } else if (img_type == "DSS_IR") {
      image.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-infraredANDequinox=J2000ANDstatsmode=VO";
      jQuery("#slider").val(zoom_dss * 10);
    } else if (img_type == "SDSS") {
      if (zoom_sdss >= 0) {
        image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + "&width=512&height=512";
        var zoom_sdss_slider_value = zoom_sdss / 10;
        jQuery("#slider").val(zoom_sdss_slider_value * 10 * 10);
      } else {
        zoom_sdss = 0;
        var zoom_sdss_slider_value = zoom_sdss / 10;
        jQuery("#loading_bg").hide();
        jQuery("#slider").val(zoom_sdss * 10);
      }
    }
  } else if (zoom_dss < 5) {
    zoom_dss = 5;
    jQuery("#slider").val(zoom_dss * 10);
  }
}

function zoomout() {
  update_fov();
  if (img_type == "DSS_R" || img_type == "DSS_B" || img_type == "DSS_IR") {
    zoom_dss = zoom_dss + 5;
    jQuery("#slider").val(zoom_dss * 10);
  } else if (img_type == "SDSS") {
    zoom_sdss = zoom_sdss + 1;
    var zoom_sdss_slider_value = zoom_sdss * 10;
    if (zoom_sdss_slider_value <= 300) {
      jQuery("#slider").val(zoom_sdss_slider_value);
    }
  }

  if (zoom_dss <= 120) {
    jQuery("#loading_bg").show();
    image.onload = function () {
      jQuery("#loading_bg").hide();
      preload();
    }
    if (img_type == "DSS_R") {
      image.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-redANDequinox=J2000ANDstatsmode=VO";
    } else if (img_type == "DSS_B") {
      image.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-blueANDequinox=J2000ANDstatsmode=VO";
    } else if (img_type == "DSS_IR") {
      image.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-infraredANDequinox=J2000ANDstatsmode=VO";
    } else if (img_type == "SDSS") {
      image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + "&width=512&height=512";
    }
  } else if (zoom_dss > 120) {
    zoom_dss = 120;
  }
}

function option_r() {
  slider.setAttribute("min","5");
  slider.setAttribute("max","90");
  jQuery("#slider").val(30);
  zoom_dss = 30;
  jQuery("#loading_bg").show();
  image.onload = function () {
     jQuery("#loading_bg").hide();

     img_type = "DSS_R";
     update_fov();
     preload();
  }
  image.onerror = function() {
    image.onerror = "";
    image.src = "img_error.png";
  }
  image.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-redANDequinox=J2000ANDstatsmode=VO";
}
function option_b() {
  slider.setAttribute("min","5");
  slider.setAttribute("max","90");
  jQuery("#slider").val(30);
  zoom_dss = 30;
  jQuery("#loading_bg").show();
  image.onload = function () {
     jQuery("#loading_bg").hide();

     img_type = "DSS_B";
     update_fov();
     preload();
  }
  image.onerror = function() {
    image.onerror = "";
    image.src = "img_error.png";
  }
  image.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-blueANDequinox=J2000ANDstatsmode=VO";
}
function option_ir() {
  slider.setAttribute("min","5");
  slider.setAttribute("max","90");
  jQuery("#slider").val(30);
  zoom_dss = 30;
  jQuery("#loading_bg").show();
  image.onload = function () {
     jQuery("#loading_bg").hide();

     img_type = "DSS_IR";
     update_fov();
     preload();
  }
  image.onerror = function() {
    image.onerror = "";
    image.src = "img_error.png";
  }
  image.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-infraredANDequinox=J2000ANDstatsmode=VO";
}
function option_sdss() {
  slider.setAttribute("min","5");
  slider.setAttribute("max","300");
  jQuery("#slider").val(30);
  zoom_sdss = 3;
  jQuery("#loading_bg").show();
  image.onload = function () {
     jQuery("#loading_bg").hide();

     img_type = "SDSS";
     update_fov();
     preload();
  }
  image.onerror = function() {
    image.onerror = "";
    image.src = "img_error.png";
  }
  image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + "&width=512&height=512";
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
  if (!object_name == null || !object_name == "") {
    if (coord_regex.test(object_name)) {
      anime({
        targets: '#nonav_content',
        opacity: 0,
        easing: 'easeInOutQuart',
        duration: 400,
        complete: function(anim) {
          window.open("object.html?obj=" + object_name.replace("+","%2B") +"&input_type=coordinates","_self");
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
        targets: '#nonav_content',
        opacity: 0,
        easing: 'easeInOutQuart',
        duration: 400,
        complete: function(anim) {
          window.open("object.html?obj=" + ra_final.toFixed(3) + " " + dec_final.replace("+","%2B") + "&ra=" + ra_final.toFixed(3) + "&dec=" + dec_final.replace("+","%2B") + "&input_type=coordinates","_self");
        }
      });
    } else {
      if (object_name.toUpperCase().trim() == "sun".toUpperCase().trim()) {
        anime({
          targets: '#nonav_content',
          opacity: 0,
          easing: 'easeInOutQuart',
          duration: 400,
          complete: function(anim) {
            window.open("object.html?obj=sun","_self")
          }
        });
      } else if (object_name.toUpperCase().trim() == "moon".toUpperCase().trim()) {
        anime({
          targets: '#nonav_content',
          opacity: 0,
          easing: 'easeInOutQuart',
          duration: 400,
          complete: function(anim) {
            window.open("object.html?obj=moon","_self")
          }
        });
      } else {
        anime({
          targets: '#nonav_content',
          opacity: 0,
          easing: 'easeInOutQuart',
          duration: 400,
          complete: function(anim) {
            window.open("object.html?obj=" + object_name,"_self");
          }
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
    preload();
  }
  if (img_type == "DSS_R") {
    image.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-redANDequinox=J2000ANDstatsmode=VO";

  } else if (img_type == "DSS_B") {
    image.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-blueANDequinox=J2000ANDstatsmode=VO";

  } else if (img_type == "DSS_IR") {
    image.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-infraredANDequinox=J2000ANDstatsmode=VO";

  } else if (img_type == "SDSS") {
    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + "&width=512&height=512";

  }
}

function ra_minus() {
  ra = +ra - 0.1;

  jQuery("#loading_bg").show();
  image.onload = function () {
    jQuery("#loading_bg").hide();
    preload();
  }
  if (img_type == "DSS_R") {
    image.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-redANDequinox=J2000ANDstatsmode=VO";

  } else if (img_type == "DSS_B") {
    image.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-blueANDequinox=J2000ANDstatsmode=VO";

  } else if (img_type == "DSS_IR") {
    image.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-infraredANDequinox=J2000ANDstatsmode=VO";

  } else if (img_type == "SDSS") {
    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + "&width=512&height=512";

  }
}

function dec_plus() {
  dec = +dec + 0.1;

  jQuery("#loading_bg").show();
  image.onload = function () {
    jQuery("#loading_bg").hide();
    preload();
  }
  if (img_type == "DSS_R") {
    image.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-redANDequinox=J2000ANDstatsmode=VO";

  } else if (img_type == "DSS_B") {
    image.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-blueANDequinox=J2000ANDstatsmode=VO";

  } else if (img_type == "DSS_IR") {
    image.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-infraredANDequinox=J2000ANDstatsmode=VO";

  } else if (img_type == "SDSS") {
    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + "&width=512&height=512";

  }
}

function dec_minus() {
  dec = +dec - 0.1;

  jQuery("#loading_bg").show();
  image.onload = function () {
    jQuery("#loading_bg").hide();
    preload();
  }
  if (img_type == "DSS_R") {
    image.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-redANDequinox=J2000ANDstatsmode=VO";

  } else if (img_type == "DSS_B") {
    image.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-blueANDequinox=J2000ANDstatsmode=VO";

  } else if (img_type == "DSS_IR") {
    image.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-infraredANDequinox=J2000ANDstatsmode=VO";

  } else if (img_type == "SDSS") {
    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + zoom_sdss + "&width=512&height=512";

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
    targets: '#nonav_content',
    opacity: 0,
    easing: 'easeInOutQuart',
    duration: 400,
    complete: function(anim) {
      window.open("object.html?obj=" + lucky_obj + "&lucky=true","_self");
    }
  });
}

var input_name = document.getElementById("input_name");

input_name.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("find_btn").click();
  }
});

function preload() {
  img_1 = new Image();
  img_2 = new Image();
  img_3 = new Image();
  img_4 = new Image();

  if (img_type != "SDSS") {
    if (zoom_dss < 90) {
      if (img_type == "DSS_R") {
        img_1.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + (ra + 0.1) + "ANDdec=" + dec + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-redANDequinox=J2000ANDstatsmode=VO";
      } else if (img_type == "DSS_B") {
        img_1.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + (ra + 0.1) + "ANDdec=" + dec + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-blueANDequinox=J2000ANDstatsmode=VO";
      } else if (img_type == "DSS_IR") {
        img_1.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + (ra + 0.1) + "ANDdec=" + dec + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-infraredANDequinox=J2000ANDstatsmode=VO";
      }
      setTimeout(function() {
        if (img_type == "DSS_R") {
          img_2.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + (ra - 0.1) + "ANDdec=" + dec + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-redANDequinox=J2000ANDstatsmode=VO";
        } else if (img_type == "DSS_B") {
          img_2.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + (ra - 0.1) + "ANDdec=" + dec + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-blueANDequinox=J2000ANDstatsmode=VO";
        } else if (img_type == "DSS_IR") {
          img_2.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + (ra - 0.1) + "ANDdec=" + dec + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-infraredANDequinox=J2000ANDstatsmode=VO";
        }
        setTimeout(function() {
          if (img_type == "DSS_R") {
            img_3.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + (dec + 0.1) + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-redANDequinox=J2000ANDstatsmode=VO";
          } else if (img_type == "DSS_B") {
            img_3.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + (dec + 0.1) + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-blueANDequinox=J2000ANDstatsmode=VO";
          } else if (img_type == "DSS_IR") {
            img_3.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + (dec + 0.1) + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-infraredANDequinox=J2000ANDstatsmode=VO";
          }
          setTimeout(function() {
            if (img_type == "DSS_R") {
              img_4.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + (dec - 0.1) + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-redANDequinox=J2000ANDstatsmode=VO";
            } else if (img_type == "DSS_B") {
              img_4.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + (dec - 0.1) + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-blueANDequinox=J2000ANDstatsmode=VO";
            } else if (img_type == "DSS_IR") {
              img_4.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + (dec - 0.1) + "ANDx=" + zoom_dss + ".000000ANDy=" + zoom_dss + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-infraredANDequinox=J2000ANDstatsmode=VO";
            }
          }, 500);
        }, 500);
      }, 500);
    }
  }
  if (img_type == "SDSS") {
    img_1.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + (ra + 0.1) + "&dec=" + dec + "&scale=" + zoom_sdss + "&width=512&height=512";
    img_2.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + (ra - 0.1) + "&dec=" + dec + "&scale=" + zoom_sdss + "&width=512&height=512";
    img_3.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + (dec + 0.1) + "&scale=" + zoom_sdss + "&width=512&height=512";
    img_4.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + (dec - 0.1) + "&scale=" + zoom_sdss + "&width=512&height=512";
  }
}

function zoom_slider(value) {
  if (img_type == "DSS_R") {
    jQuery("#loading_bg").show();
    image.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + value + ".000000ANDy=" + value + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-redANDequinox=J2000ANDstatsmode=VO";
    image.onload = function () {
      jQuery("#loading_bg").hide();
      preload();
      zoom_dss = value;
    }

  } else if (img_type == "DSS_B") {
    jQuery("#loading_bg").show();
    image.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + value + ".000000ANDy=" + value + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-blueANDequinox=J2000ANDstatsmode=VO";
    image.onload = function () {
      jQuery("#loading_bg").hide();
      preload();
      zoom_dss = value;
    }

  } else if (img_type == "DSS_IR") {
    jQuery("#loading_bg").show();
    image.src = "https://node-dss-resizer.herokuapp.com/?width=512&url=ra=" + ra + "ANDdec=" + dec + "ANDx=" + value + ".000000ANDy=" + value + ".000000ANDmime-type=download-gifANDSky-Survey=DSS2-infraredANDequinox=J2000ANDstatsmode=VO";
    image.onload = function () {
      jQuery("#loading_bg").hide();
      preload();
      zoom_dss = value;
    }

  } else if (img_type == "SDSS") {
    value = value / 10 * 1.2;
    jQuery("#loading_bg").show();
    image.src = "https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg?ra=" + ra + "&dec=" + dec + "&scale=" + value + "&width=512&height=512";
    image.onload = function () {
      jQuery("#loading_bg").hide();
      preload();
      zoom_sdss = value;
    }

  }
}

function update_fov() {
  var fov_value;
  if (img_type == "DSS_R" || img_type == "DSS_B" || img_type == "DSS_IR") {
    var zoom_fov = slider.value;
    fov_value = zoom_fov / 60;
    zoom_dss = fov_value * 60;
    if (fov_value < 1) {
      fov_value = fov_value * 60;
      document.getElementById("fov_text").innerHTML = "FoV " + fov_value.toFixed(2) + "\"";
    } else {
      document.getElementById("fov_text").innerHTML = "FoV " + fov_value.toFixed(2) + "°";
    }
  } else if (img_type == "SDSS") {
    var zoom_fov = slider.value;
    fov_value = zoom_fov / 60;
    if (fov_value < 1) {
      fov_value = fov_value * 60;
      document.getElementById("fov_text").innerHTML = "FoV " + fov_value.toFixed(2) + "\"";
    } else {
      document.getElementById("fov_text").innerHTML = "FoV " + fov_value.toFixed(2) + "°";
    }
  }
}
