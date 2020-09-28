var videoElement = document.getElementById("videoElement");
videoElement.hidden = false;
var canvas = document.getElementById("canvas");
canvas.hidden = true;
var context = canvas.getContext('2d');
var user_pic = new Image();
var snap_button = document.getElementById("snap");
snap_button.hidden = false;
var share_to_facebook = document.getElementById("shareToFacebook");
share_to_facebook.hidden = true;
var retake_button = document.getElementById("retake");
retake_button.hidden = true;

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        videoElement.srcObject = stream;
    }).catch(function (err0r) {
        console.log("Something went wrong!");
    });
}


function snap() {
  console.log("snapped")
  context.drawImage(videoElement, 0, 0, 640, 480);
  user_pic.src = convertCanvasToImage(canvas);
  snap_button.hidden = true;
  videoElement.hidden = true;
  canvas.hidden = false;
  share_to_facebook.hidden = false;
  retake_button.hidden = false;
}

function convertCanvasToImage(canvas) {
  var image = new Image();
  image.src = canvas.toDataURL("images/png");
  document.getElementById("snapped_pic").href = image.src;
  document.getElementById("snapped_pic").click();
  return image;
}

function shareToFacebook() {
  share_to_facebook.disabled = true;
  share_to_facebook.innerHTML = '<div class="spinner-border spinner-border-sm text-light" role="status"></div>';
  var imageData = canvas.toDataURL("images/png");

  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      share_to_facebook.disabled = false;
      share_to_facebook.innerHTML = 'Share to facebook';
      var response = JSON.parse(this.responseText);

      if (response.status == 200) {
        var width = 600;
        var height = 400;
        var left = (screen.width - width) / 2;
        var top = (screen.height - (height + 100)) / 2;
        window.open(response.url, "Share to Facebook", 'width=' + width + ' , height=' + height + ' , top=' + top + ' , left=' + left);
      } else {
        console.log(this.responseText);
      }

    }
  }
  var form = new FormData;
  form.append('imageData', imageData);
  xmlhttp.open("POST", "graph.php");
  xmlhttp.send(form);
  return false;

}

function retake() {
  snap_button.hidden = false;
  videoElement.hidden = false;
  canvas.hidden = true;
  share_to_facebook.hidden = true;
  retake_button.hidden = true;
}