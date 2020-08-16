$(function() {
  $("#btnIcon").hide();
  $("#uploadBtn").click(function() {
    $("#btnIcon").show();
  });
  let apiUrl = "https://mini-js.herokuapp.com/api/photo";
  $.get(apiUrl, function() {})
    .done(function(res) {
      let resData = res.fileData;
      setPhotos(resData);
      zoomPhotos();
      removePhoto(resData);
      showMaterialToast("Data Load success ...", "green darken-3");
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
    str += "<img class='responsive-img' data-enlargable  style='cursor: zoom-in' "
    str += "src=" + resData[i].url + " alt=''>"
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

function zoomPhotos() {
  $('img[data-enlargable]').addClass('img-enlargable').click(function(){
    let src = $(this).attr('src');
    let modal;
    function removeModal(){ modal.remove(); $('body').off('keyup.modal-close'); }
    modal = $('<div>').css({
        background: 'RGBA(0,0,0,.5) url('+src+') no-repeat center',
        backgroundSize: 'contain',
        width:'100%', height:'100%',
        position:'fixed',
        zIndex:'10000',
        top:'0', left:'0',
        cursor: 'zoom-out'
    }).click(function(){
        removeModal();
    }).appendTo('body');
    //handling ESC
    $('body').on('keyup.modal-close', function(e){
      if(e.key==='Escape'){ removeModal(); } 
    });
  });
}

function removePhoto(resData) {
  let apiUrl = "https://mini-js.herokuapp.com/api/photo/delete";
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
