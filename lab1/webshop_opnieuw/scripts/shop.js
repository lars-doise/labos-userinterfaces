import {Winkelkar} from "./modules/Winkelkar.js";


let mijnWinkelkar = new Winkelkar()
init();

function init(){
    let voegToeKnop = document.getElementById("idVoegToeAanWinkelkar")
    voegToeKnop.addEventListener("click", berekenSom)

}


function berekenSom(){
    // let elektronisch = document.getElementById("idElektronisch")
    // let Zeefdruk = document.getElementById("idZeefdruk")
    // let Ingekaderd = document.getElementById("idIngekaderd")
    //
    // let som = +0
    // if(elektronisch.checked){
    //     som += +elektronisch.value;
    //     console.log(elektronisch.value)
    // }
    // if(Zeefdruk.checked){
    //     som += +Zeefdruk.value
    // }
    // if(Ingekaderd.checked){
    //     som += +Ingekaderd.value;
    // }
    // console.log(som)
    // let textArea = document.getElementById("idTextArea")
    // textArea.textContent = som;

    console.log("gekliktt")
    let elektronisch = document.getElementById("idElektronisch")
    let Zeefdruk = document.getElementById("idZeefdruk")
    let Ingekaderd = document.getElementById("idIngekaderd")


    if(elektronisch.checked){
        console.log("gekocht")
        mijnWinkelkar.koop("tekst per mail");
    }
    if(Zeefdruk.checked){
        console.log("gekocht")

        mijnWinkelkar.koop("zeefdruk op papier");
    }
    if(Ingekaderd.checked){
        console.log("gekocht")

        mijnWinkelkar.koop("zeefdruk op papier, ingekaderd");
    }
    document.getElementById("idTextArea").textContent = mijnWinkelkar.toString();


}