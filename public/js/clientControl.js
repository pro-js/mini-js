$(function() {

  let apiUrl = "http://localhost:4000/api/photo";
  $.get(apiUrl, function() {})
    .done(function(res) {
      let resData = res.data.fileData;
      setPhotos(resData);
      removePhoto(resData);
    })
    .fail(function() {
      showMaterialToast("Problem Load Files!!!", "red darken-3");
    });
});

function setPhotos(resData) {
  let str = "";
  for (let i = resData.length - 1; i >= 0; i--) {
    str += "<div class='col s12 m3'>";
    str += "<div class='card center-align hoverable waves-light lighten-1'>";
    str += "<div class='card-content'>";
    str += "<img class='responsive-img' src=" + resData[i].url + " alt=''>"
    str += "<i id='"+ resData[i].public_id +"' class='commonClass small ";
    str += "material-icons hoverable'>delete_forever</i>";
    str += "</div></div></div>";
  }
  $("#photosID").html(str);
}

function removePhoto(resData) {
  let apiUrl = "http://localhost:4000/api/photo/delete";
  $(".commonClass").on('click', function() {
    let thisID = this.id;
    resData = resData.filter(el => el.public_id !== thisID);
    $.post(apiUrl, { public_id: thisID }, function() {})
      .done(function (res) {
        showMaterialToast("Destroy Success!!!", "green darken-3");
        setPhotos(resData);
      })
      .fail(function () {
        showMaterialToast("Problem Destroy File!!!", "red darken-3");
      })
  });
}

function setError() {
  
}

/*** Show Toast ***/
function showMaterialToast(data, style) {
  M.toast({
      html : data,
      classes : style
  });
}