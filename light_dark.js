var date = new Date();
var hour = date.getHours();
if (hour > 7 && hour <= 18) {
  jQuery('head').append('<link rel="stylesheet" href="theme/bootstrap_light/dist/css/bootstrap.min.css">');
  jQuery('head').append('<link rel="stylesheet" href="theme/scrollbar_light.css">');
  jQuery('head').append('<link rel="stylesheet" href="theme/light_jumbotron.css">');
} else {
  jQuery('head').append('<link rel="stylesheet" href="theme/bootstrap/dist/css/bootstrap.min.css">');
  jQuery('head').append('<link rel="stylesheet" href="theme/scrollbar.css">');
  jQuery('head').append('<link rel="stylesheet" href="theme/dark_jumbotron.css">');
}
