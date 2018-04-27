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
