$(function() {
  $("#previewID").change(function(event) {
    $("#outputPreview").hide();
    let fileType = event.target.files[0].type;
    if (fileType === "image/jpeg" || fileType === "image/png" || 
      fileType === "image/jpg" || fileType === "image/gif") {
        photoPreview();
    } else if (fileType === "video/mp4") {
      videoPreview(event.target.files[0]);
    }
  });
});

function photoPreview() {
  let str = "<div class='col s12 m10 offset-l1'>";
    str += "<div class='card center-align hoverable waves-light lighten-1'>";
    str += "<div class='card-content black-text'>";
    str += "<img id='output' class='responsive-img'/>";
    str += "</div></div></div>";
  $("#outputPreview").html(str);
  $("#outputPreview").show();

  let output = document.getElementById('output');
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function() {
    URL.revokeObjectURL(output.src) // free memory
  }
}

function videoPreview(data) {
  let str = "<div class='col s12 m10 offset-l1'>";
    str += "<div class='card center-align hoverable waves-light lighten-1'>";
    str += "<div class='card-content black-text'>";
    str += "<video class='responsive-video' controls muted>";
    str += "<source id='video_here'>";
    str += "</video></div></div></div>";
  $("#outputPreview").html(str);
  $("#outputPreview").show();
  
  let $source = $('#video_here');
  $source[0].src = URL.createObjectURL(data);
  $source.parent()[0].load();
}