const body = document.querySelector("body")
const IMAGENUMBER = 7;

function handleImageLoad(){
    console.log("finished");
}

function paintImage(imageNumber){
    const image = new Image();
    image.src = `images/${imageNumber}.jpg`
    image.classList.add("bgImage");
    body.appendChild(image);
    
}

function genRandomNumber(){
    const random = Math.floor(Math.random() * IMAGENUMBER +1);
    return random; 
}

function init(){
    const randomNumber = genRandomNumber();
   
    paintImage(randomNumber);
}


init();