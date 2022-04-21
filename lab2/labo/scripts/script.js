
const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");

let x = Math.floor(Math.random() * c.width);
let y =Math.floor(Math.random() * c.height);
let dx = 0
let dy = 10
function speel(){
    ctx.clearRect(0, 0 ,c.height,c.width);
    ctx.strokeStyle = "#FF0000";
    // drawImages()
    // if(x >= c.width - c.width/4 ){
    //     dx = 10
    // }
    // else if(x <= c.width/4 ){
    //     dx = -10
    //
    // }
    x = x + dx;


    // if(y >= c.height - c.height/4 ){
    //     dy = -10
    // }
    // else if(y <= c.height/4 ){
    //     dy = 10
    // }
    y = y + dy


    if(x +30 > c.width || x - 30 < 0 || y + 30 > c.height || y - 30 < 0){
        console.log("klopt niet")
    }
    else{
        ctx.strokeRect(x,y,30,30)

        ctx.stroke();
    }

}
var intervalId = setInterval(speel, 100);

document.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
        case 37:
            dx = -10
            dy = 0
            break;
        case 38:
            dx = 0
            dy = -10
            break;
        case 39:
            dx = 10
            dy = 0
            break;
        case 40:
            dx = 0
            dy = 10
            break;
    }
});

window.addEventListener("load", drawImages, true);

function drawImages(){
    for(let i = 1; i < 6; i++){
        let img = new Image();
        img.src = "./images/food" + i + ".png"
        let x = Math.floor(Math.random() * c.width);
        let y =Math.floor(Math.random() * c.height);
        img.onload = function(){

            console.log(img.src)
            ctx.drawImage(img, x,y, 30, 30 * img.height / img.width)
        };
    }


}