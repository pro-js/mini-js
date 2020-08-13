$(function() {
  $("#previewID").change(function(event) {
    $("#outputPreview").hide();
    let fileType = event.target.files[0].type;
    if (fileType === "image/jpeg" || fileType === "image/png" || 
      fileType === "image/jpg" || fileType === "image/gif") {
        photoPreview();
    } else if (fileType === "video/mp4") {
      videoPreview(event.target.files[0]);
    } else if (fileType === "audio/mp3") {
      audioPreview(event.target.files[0]);
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

function audioPreview(data) {
  let str = "<div class='col s12 m10 offset-l1'>";
    str += "<div class='card center-align hoverable waves-light lighten-1'>";
    str += "<div class='card-content black-text'>";
    str += "<canvas id='canvas'></canvas>";
    str += "<source id='audio_here'>";
    str += "<audio id='audio' controls></audio>";
    str += "</div></div></div>";
  $("#outputPreview").html(str);
  $("#outputPreview").show();
  
  let audio = document.getElementById("audio");
  audio.src = URL.createObjectURL(data);
  audio.load();
  audio.play();
  let context = new AudioContext();
  let src = context.createMediaElementSource(audio);
  let analyser = context.createAnalyser();
  let canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let ctx = canvas.getContext("2d");
  src.connect(analyser);
  analyser.connect(context.destination);
  analyser.fftSize = 256;
  let bufferLength = analyser.frequencyBinCount;
  let dataArray = new Uint8Array(bufferLength);
  let WIDTH = canvas.width;
  let HEIGHT = canvas.height;
  let barWidth = (WIDTH / bufferLength) * 2.5;
  let barHeight;
  let x = 0;
  function renderFrame() {
    requestAnimationFrame(renderFrame);
    x = 0;
    analyser.getByteFrequencyData(dataArray);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];
      let r = barHeight + (25 * (i/bufferLength));
      let g = 250 * (i/bufferLength);
      let b = 50;
      ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
      x += barWidth + 1;
    }
  }
  audio.play();
  renderFrame();
};