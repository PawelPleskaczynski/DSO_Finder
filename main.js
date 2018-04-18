function openDSO() {
  var object_name = document.getElementById("input_name").value;
  if (!object_name == null || !object_name == "") {
    window.open("object.html?obj=" + object_name,"_self");
  }
}
