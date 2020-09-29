var flag = 0;
var attempts = 0;
var initial_images = [["images/mi10.gif","product-image-mi10"],["images/laptop.gif","product-image-laptop"],["images/tv.gif","product-image-tv"],["images/watch.gif","product-image-band"],["images/trimmer.gif","product-image-trimmer"],["images/purifier.gif","product-image-purifier"],["images/powerbank.gif","product-image-powerbank"],["images/note9.gif","product-image-redmi8"]]
var results = ["images/sandesh1.gif","images/durga.gif","images/sandesh2.gif","images/noluck.gif","images/durga2.gif","images/noluck2.gif","images/sandesh1b.gif","images/sandesh2b.gif"]
var results_2 = ["images/fruit.png","images/fruit.png"];

shuffle(results);
shuffle(initial_images);
var status = setInterval(checkStatus,2000);

function download_brochure(){
    //downloadbrochure on loading index.html
    //document.getElementById('downloadLink').click();
}

function play_clicked(){
    window.location.href="game.html";
}

function init_load(){
    
   /* var videosrc = document.getElementById("video1"); 
   videosrc.play();*/
    var videosrc2 = document.getElementById("video2"); 
  videosrc2.play();
    
    var game_flag = localStorage.getItem("flag");
    var result = localStorage.getItem("result");
    if(game_flag == "2"){
        alert("You have already played the game and result is: "+result);
    } else{
        for(var i =3; i<=8;i++){
            document.getElementById("prod"+i).src=initial_images[i-1][0];
            document.getElementById("prod"+i).className=initial_images[i-1][1];
        }
   }
    
}

function result_text(){
   var game_flag = localStorage.getItem("flag");
    var result = localStorage.getItem("result");
    if(game_flag == "2"){
        if(result == "lost"){
            document.getElementById("landing-text-header").innerText="Sorry! You have lost this time! Better luck next time!"
            document.getElementById("winning-text").innerText="";
            document.getElementById("container").hidden = true;
        }
    }
    document.getElementById("share").hidden = true;
    document.getElementById("canvas").hidden = true;
}

function videoClicked(id){
 var node = document.getElementById(id);
  var parentNode = node.parentNode;
    parentNode.removeChild(node);
  var newElement = document.createElement("video");
    newElement.src="images/mi10.webm";
    newElement.type="video/webm";
    newElement.className="product-image-mi10";
    parentNode.appendChild(newElement);
    newElement.play();
}

function video2clicked(id){
    var element = document.getElementById(id);
    element.src = "images/mi10.mp4";
    element.className= "product-image-mi10";
    element.play();
    if(id=="video2"){
        flag =1;
    }
}

function onProductClick(index, id){
    if(index==0){
    var imageHolder = document.getElementById("prod1");
    var parentNode = imageHolder.parentNode;
        parentNode.removeChild(imageHolder);
        var newImage = document.createElement("img");
        newImage.src="images/durga.gif";
        newImage.className="product-image-mi10";
        parentNode.appendChild(newImage);
        flag = 1;
    }
    else{
    attempts+=1;
    var imageHolder = document.getElementById(id);
    var parentNode = imageHolder.parentNode;
        parentNode.removeChild(imageHolder);
        var newImage = document.createElement("img");
        newImage.src=results[index];
        newImage.className="product-image-mi10";
        parentNode.appendChild(newImage)
    if((results[index]=="images/durga.gif" || results[index] == "images/durga2.gif") && attempts<=2){//&& attempts<=2
        console.log("won")
        flag = 1;    
       // imageHolder.onload = setTimeout(checkResult,500);   
    } else if (attempts>2){
       flag = 2;
    } 
    }
   
}

function checkResult(){
   if(flag ==1){
        alert("You have won 10% discount" )
    }
}

function checkStatus(){
    if(attempts<2 ){
        if(flag ==1){
            alert("Congratulations! You win 10% discount!!\n Click OK to redeem it!")
            flag = 2;
            window.location.href="win.html";
            localStorage.setItem("result","won");
            localStorage.setItem("flag","2")
        }
    } else{
        localStorage.setItem("result","lost");
        localStorage.setItem("flag","2");
    } 
    
    /*else if(attempts >=8){
        alert("Click Ok to restart the game");
        shuffle(results);
        shuffle(initial_images);
        init_load();
        flag = 0;
        attempts = 0;
    }*/
}


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
  
      // swap elements array[i] and array[j]
      // we use "destructuring assignment" syntax to achieve that
      // same can be written as:
      // let t = array[i]; array[i] = array[j]; array[j] = t
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
