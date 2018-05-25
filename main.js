window.scrollreveal = ScrollReveal();
scrollreveal.reveal('#about', {
  afterReveal: function(domEl) {
    anime({
      targets: 'img',
      scale: 1,
      duration: 1400
    });
  }
});

window.onload = function() {
  jQuery("img").css("transform","scale(0)");
  var date = new Date();
  var hour = date.getHours();
  if (hour > 7 && hour <= 18) {
    jQuery(".text_item").css("color","#000");
    jQuery(".about").css("background","#fafafa");
  } else {
    jQuery(".text_item").css("color","#fff");
    jQuery(".about").css("background","#222");
  }
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
        targets: '#bg',
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
        targets: '#bg',
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
          targets: '#bg',
          opacity: 0,
          easing: 'easeInOutQuart',
          duration: 400,
          complete: function(anim) {
            window.open("object.html?obj=sun&barslide=true","_self")
          }
        });
      } else if (object_name.match(/moon/i)) {
        anime({
          targets: '#bg',
          opacity: 0,
          easing: 'easeInOutQuart',
          duration: 400,
          complete: function(anim) {
            window.open("object.html?obj=moon&barslide=true","_self")
          }
        });
      } else {
        anime({
          targets: '#bg',
          opacity: 0,
          easing: 'easeInOutQuart',
          duration: 400,
          complete: function(anim) {
            window.open("object.html?obj=" + object_name + "&barslide=true","_self");
          }
        });
      }
    }
  } else {
    micron.getEle(".jumbotron").interaction("shake").duration(".45").timing("ease-out");
  }
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
    targets: '#bg',
    opacity: 0,
    easing: 'easeInOutQuart',
    duration: 400,
    complete: function(anim) {
      window.open("object.html?obj=" + lucky_obj + "&lucky=true&barslide=true","_self");
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
