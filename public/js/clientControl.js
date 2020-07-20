$(function() {
  $("#btnIcon").hide();
  $("#uploadBtn").click(function() {
    $("#btnIcon").show();
  });
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
    str += "<i id='Load"+ resData[i].public_id +"' class='fa fa-spinner fa-spin'></i>"
    str += "</div></div></div>";
  }
  $("#photosID").html(str);
  for (let i = resData.length - 1; i >= 0; i--) {
    let iconLoadId = "Load" + resData[i].public_id;
    $("#" + iconLoadId).hide();
  }
}

function removePhoto(resData) {
  let apiUrl = "http://localhost:4000/api/photo/delete";
  $(".commonClass").click(function() {
    let thisID = this.id;
    $("#" + thisID).hide();
    $("#" + "Load" + thisID).show();
    $.post(apiUrl, { public_id: thisID }, function() {})
      .done((res) => {
        showMaterialToast("Destroy Success!!!", "green darken-3");
        resData = resData.filter(el => el.public_id !== thisID);
        setPhotos(resData);
      })
      .fail(() => {
        $("#" + "Load" + thisID).hide();
        $("#" + thisID).show();
        showMaterialToast("Problem Destroy File!!!", "red darken-3");
      })
      .always(() => {
        removePhoto(resData);
      });
  });
}

/*** Show Toast ***/
function showMaterialToast(data, style) {
  M.toast({
      html : data,
      classes : style
  });
}