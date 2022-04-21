let Prentbutton = document.getElementById("toonKnop")
console.log(Prentbutton)
Prentbutton.onclick = toonPrent

let radioButtonEngels = document.getElementById("en")
let radioButtonFrans = document.getElementById("fr")
radioButtonEngels.onclick = vulKeuzeLijst
radioButtonFrans.onclick = vulKeuzeLijst
function toonPrent(){
    alert("bram stinkt")
    let prentenLijst = document.getElementById("prenten")
    let taalOpties = document.getElementsByName("taal")

    let gekozenOptie = null

    for (let optie of taalOpties)
    {
        if (optie.checked) {
            gekozenOptie = optie
        }
    }
    console.log(gekozenOptie)
    let prent = document.getElementById("prent")
    prent.src = "images/" + gekozenOptie.id + "_" + prentenLijst.value + ".jpg"
}
function vulKeuzeLijst(){
    console.log(this)
    if(this.id == "en"){
        vulLijstMet("brave", "home", "strength","who")
    }
    else{
        vulLijstMet("grand", "mieux", "petit")
    }
}
function vulLijstMet(...items){
    let prentenLijst = document.getElementById("prenten")
    prentenLijst.innerText = null
    for (let item of items){
        console.log(prentenLijst)
        var option = document.createElement("option");
        option.text = item
        option.value = item
        prentenLijst.appendChild(option)
    }
    console.log(items)
}




