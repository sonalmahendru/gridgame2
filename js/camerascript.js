/*
// References to all the element we will need.
var video = document.querySelector('#camera-stream'),
    image = document.querySelector('#snap'),
    start_camera = document.querySelector('#start-camera'),
    controls = document.querySelector('.controls'),
    take_photo_btn = document.querySelector('#take-photo'),
    delete_photo_btn = document.querySelector('#delete-photo'),
    download_photo_btn = document.querySelector('#download-photo'),
    error_message = document.querySelector('#error-message');
    console.log("message")


// The getUserMedia interface is used for handling camera input.
// Some browsers need a prefix so here we're covering all the options
navigator.getMedia = ( navigator.getUserMedia ||
                      navigator.webkitGetUserMedia ||
                      navigator.mozGetUserMedia ||
                      navigator.msGetUserMedia);


if(!navigator.getMedia){
  displayErrorMessage("Your browser doesn't have support for the navigator.getUserMedia interface.");
}
else{

  // Request the camera.
  navigator.getMedia(
    {
      video: true
    },
    // Success Callback
    function(stream){

      // Create an object URL for the video stream and
      // set it as src of our HTLM video element.
      
      video.src = (window.URL ? URL : webkitURL).createObjectURL(stream);

      // Play the video element to start the stream.
      video.play();
      video.onplay = function() {
        showVideo();
      };

    },
    // Error Callback
    function(err){
      displayErrorMessage("There was an error with accessing the camera stream: " + err.name, err);
    }
  );

}



// Mobile browsers cannot play video without user input,
// so here we're using a button to start it manually.
start_camera.addEventListener("click", function(e){

  e.preventDefault();

  // Start video playback manually.
  video.play();
  showVideo();

});


take_photo_btn.addEventListener("click", function(e){

  e.preventDefault();

  var snap = takeSnapshot();

  // Show image. 
  image.setAttribute('src', snap);
  image.classList.add("visible");

  // Enable delete and save buttons
  delete_photo_btn.classList.remove("disabled");
  download_photo_btn.classList.remove("disabled");

  // Set the href attribute of the download button to the snap url.
  download_photo_btn.href = snap;

  // Pause video playback of stream.
  video.pause();

});


delete_photo_btn.addEventListener("click", function(e){

  e.preventDefault();

  // Hide image.
  image.setAttribute('src', "");
  image.classList.remove("visible");

  // Disable delete and save buttons
  delete_photo_btn.classList.add("disabled");
  download_photo_btn.classList.add("disabled");

  // Resume playback of stream.
  video.play();

});



function showVideo(){
  // Display the video stream and the controls.

  hideUI();
  video.classList.add("visible");
  controls.classList.add("visible");
}


function takeSnapshot(){
  // Here we're using a trick that involves a hidden canvas element.  

  var hidden_canvas = document.querySelector('canvas'),
      context = hidden_canvas.getContext('2d');

  var width = video.videoWidth,
      height = video.videoHeight;

  if (width && height) {

    // Setup a canvas with the same dimensions as the video.
    hidden_canvas.width = width;
    hidden_canvas.height = height;

    // Make a copy of the current frame in the video on the canvas.
    context.drawImage(video, 0, 0, width, height);

    // Turn the canvas image into a dataURL that can be used as a src for our photo.
    return hidden_canvas.toDataURL('image/png');
  }
}


function displayErrorMessage(error_msg, error){
  error = error || "";
  if(error){
    console.log(error);
  }

  error_message.innerText = error_msg;

  hideUI();
  error_message.classList.add("visible");
}


function hideUI(){
  // Helper function for clearing the app UI.

  controls.classList.remove("visible");
  start_camera.classList.remove("visible");
  video.classList.remove("visible");
  snap.classList.remove("visible");
  error_message.classList.remove("visible");
}
*/
var video = document.querySelector("#videoElement");
var videoElement = document.getElementById("videoElement");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var user_pic = new Image();
var snap_button= document.getElementById("snap");
var share_div = document.getElementById("share");

// Trigger photo take
snap_button.addEventListener("click", function() {
    console.log("snapped")
  context.drawImage(videoElement, 0, 0, 640, 480);
  user_pic = convertCanvasToImage(canvas);
  snap_button.hidden = true;
  share_div.hidden = false;
  videoElement.hidden = true;
  canvas.hidden = false;
});

// Converts canvas to an image
function convertCanvasToImage(canvas) {
	var image = new Image();
  image.src = canvas.toDataURL("images/png");
  document.getElementById("snapped_pic").href = image.src;
  document.getElementById("snapped_pic").click();
	return image;
}

function retake(){
  user_pic = null;
  snap_button.hidden = false;
  share_div.hidden = true;
  videoElement.hidden = false;
  canvas.hidden = true;
}
/*
document.getElementById('sharefb').addEventListener("click",(function (e) {
  e.preventDefault();

   // Get file object from file input
  // var file = $('#input_file')[0].files[0];

   // If file is selected
   if (user_pic) {
       // We will use FileReader
       var reader = new FileReader();
       // And and onload callback when file data loaded
       reader.onload = function (e) {
           // This is array buffer of the file
           var arrayBuffer = e.target.result;
           // And blob object of the file
           var blob = new Blob([arrayBuffer], { type: file.type });

           // We will use FormData object to create multipart/form request
           var data = new FormData();
           data.append('access_token', FB.getAccessToken());
           data.append('source', blob);
           data.append('message', "testing");

          // $('#uploading').show();

          xhttp.open("POST", "demo_post2.asp", true);
          xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhttp.send("fname=Henry&lname=Ford");
          
          // Send the request manually with jQeury
           $.ajax({
               url: 'https://graph.facebook.com/me/photos?access_token=' + FB.getAccessToken(),
               type: 'POST',
               data: data,
               processData: false,
               contentType: false,
               cache: false,
               success:function (data) {
                   //$('#status').append('<p>Photo was successfully uploaded, object id is: ' + data.id + '</p>');
                   console.log(data)
               },
               error:function (data) {
                   console.log(data);
               },
               complete: function () {
                   //$('#uploading').hide();
               }
           });

       };
       // Read file as array buffer to create blob object
       reader.readAsArrayBuffer(file);
   }
}));
*/
/*document.getElementById('sharefb').addEventListener('click', function() {
  FB.ui({
      method: 'share_open_graph',
      action_type: 'og.shares',
      action_properties: JSON.stringify({
          object : {
             'og:url': "http://box.dev",
             'og:title': "test",
             'og:description': "description",
             'og:og:image:width': '2560',
             'og:image:height': '960',
             'og:image': user_pic
          }
      })
  });
});*/