function  toonPrent(){
    let prent = document.getElementById("prent");

    let gekozenAfbeelding = document.getElementById("prentenSelectDink").value;


    let taalOpties = document.getElementsByName("taal")

    let gekozenOptie = null

    for (let optie of taalOpties)
    {
        if (optie.checked) {
            gekozenOptie = optie
        }
    }
    let imagestring = "./images/" + gekozenOptie.id + "_" + gekozenAfbeelding + ".jpg"
    console.log(imagestring)
    prent.setAttribute("src", imagestring)
}

function vulKeuzeLijst(event){
    let taal = this.id;


    let woorden;
    if(taal == "en"){
        woorden = ["brave", "home", "strength", "who"]
    }
    else if(taal == "fr"){
        woorden = ["grand", "mieux", "petit"]
    }
    vulKeuzeLijstMet(woorden)

}
function vulKeuzeLijstMet(...items){
    let woorden = items[0]
    let prentenSelectLijst = document.getElementById("prentenSelectDink");

    var length = prentenSelectLijst.options.length;
    for (i = length-1; i >= 0; i--) {
        prentenSelectLijst.options[i] = null;
    }
    for(let item of woorden){
        console.log(item)
        let optie = document.createElement("option");
        optie.innerText = item;
        optie.value = item;
        prentenSelectLijst.appendChild(optie)
    }
}


let toonPrentKnop = document.getElementById("toonPrentKnop");
toonPrentKnop.addEventListener("click", toonPrent);

let engelsRadioButton = document.getElementById("en");
engelsRadioButton.addEventListener("click", vulKeuzeLijst);

let fransRadioButton = document.getElementById("fr");
fransRadioButton.addEventListener("click", vulKeuzeLijst);