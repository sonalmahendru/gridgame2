var flag = 0;
var attempts = 0;
var initial_images = [["images/mi10.gif","product-image-mi10"],["images/laptop.gif","product-image-laptop"],["images/tv.gif","product-image-tv"],["images/watch.gif","product-image-band"],["images/trimmer.gif","product-image-trimmer"],["images/purifier.gif","product-image-purifier"],["images/powerbank.gif","product-image-powerbank"],["images/note9.gif","product-image-redmi8"]]
var results = ["images/sandesh1.gif","images/durga.gif","images/sandesh2.gif","images/noluck.gif","images/durga2.gif","images/noluck2.gif","images/sandesh1b.gif","images/sandesh2b.gif"]
var results_2 = ["images/fruit.png","images/fruit.png"];
var game_flag = localStorage.getItem("flag");
var result = localStorage.getItem("result");
shuffle(results);
shuffle(initial_images);
//var status = setInterval(checkStatus,2000);

function download_brochure(){
    //downloadbrochure on loading index.html
    var os = null;
    var downloadElement = document.getElementById('downloadLink');
	if(navigator.userAgent.indexOf("Win") >= 0){
		os = "Windows";
	}
	if(navigator.userAgent.indexOf("Linux") >= 0){
		os = "Linux";
	}
	if(os == null){
		downloadElement.target = "_blank";
        downloadElement.href = "brochure/sample.pdf";
        downloadElement.download = null;
       	}else{
        downloadElement.href = "brochure/sample.pdf";
        downloadElement.download = 'file.pdf';
	}
	downloadElement.click();
    
}

function play_clicked(){
    window.location.href="game.html";
}

function init_load(){
    if(!game_flag){
        download_brochure();
    }
        for(var i =1; i<=8;i++){
            document.getElementById("prod"+i).src=initial_images[i-1][0];
            document.getElementById("prod"+i).className=initial_images[i-1][1];
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
    } else if(game_flag == null || game_flag=="1"){
        document.getElementById("landing-text-header").innerText="You haven't played the game yet!"
            var winning_text= document.getElementById("winning-text")
            winning_text.innerText="Click here to play it";
            winning_text.addEventListener("click",function(){
                window.location.href="game.html";
            })
            document.getElementById("container").hidden = true;
    }
    document.getElementById("share").hidden = true;
    document.getElementById("canvas").hidden = true;
}


function onProductClick(index, id){
   if(game_flag ==null){
    attempts+=1;
    var imageHolder = document.getElementById(id);
    var parentNode = imageHolder.parentNode;
        parentNode.removeChild(imageHolder);
        var newImage = document.createElement("img");
        newImage.src=results[index];
        newImage.className="product-image-mi10";
        parentNode.appendChild(newImage)
    if((results[index]=="images/durga.gif" || results[index] == "images/durga2.gif") && attempts<=2){//&& attempts<=2
       // console.log("won")
        localStorage.setItem(flag,"1");   
        localStorage.setItem("result","won");  
        flag = 1;
    }    
    else if (flag!=1 && flag!=3 && attempts>=2){
        localStorage.setItem(flag,"2");   
        localStorage.setItem("result","lost"); 
       flag = 2;
    } 
   } else {
       alert("You have already played the game. Click Ok to see results.")
       window.location.href = "win.html";
   }
   setInterval(checkStatus,500);
   
}



function checkStatus(){
        if(flag ==1){
            alert("Congratulations! You win exciting goodies!!\n Click OK to redeem it!")
            flag = 3;
            window.location.href="win.html";
            localStorage.setItem("result","won");
            localStorage.setItem("flag","2")
        }
 else if(flag == 2 && attempts== 2){
            alert("Oops! You have used your 2 chances but you can continue finding Durga Maa")
            localStorage.setItem("result","lost");
            localStorage.setItem("flag","2");
            flag = 4;
    }    
    else if(flag==2){
        localStorage.setItem("result","lost");
        localStorage.setItem("flag","2");
    } 
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
