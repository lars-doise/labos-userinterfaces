
class Product {
    constructor(naam, prijs, aantal) {
        this.naam = naam;
        this.prijs = prijs;
        this.aantal = aantal;
    }
    koop(){
        this.aantal += 1;
    }
    get totaleprijs(){
        return this.prijs*this.aantal;
    }
    get tekstvorm(){
        if(this.aantal > 0){
            return this.aantal +"x " + this.naam + " (" + this.totaleprijs + ")";
        }
        else{
            return ""
        }
    }
}

class Winkelkar{
    constructor() {
        this.mandje = new Map();
        this.mandje.set("tekst per mail", new Product("tekst per mail", 0.50,0));
        this.mandje.set("zeefdruk op papier", new Product("zeefdruk op papier", 10.0,0));
        this.mandje.set("zeefdruk op papier, ingekaderd", new Product("zeefdruk op papier, ingekaderd", 40.0,0));
    }
    koopEenStuk(naam){
        this.mandje.get(naam).koop();
    }

    get totaalPrijs(){
        var totaalprijs = 0;
        this.mandje.forEach((values,keys)=>{
            totaalprijs += values.totaleprijs;
        })
        return totaalprijs;
    }

    get informatie(){
        let returnstring = ""
        this.mandje.forEach((values,keys)=>{
            returnstring += values.tekstvorm + '\n';
        })
        return returnstring
    }
    maakLeeg(){
        this.mandje.forEach((values,keys)=>{
           values.aantal = 0;
        })
    }

}
var voegToeKnop = document.getElementById("idVoegToeAanWinkelkar");
voegToeKnop.onclick = voegToeAanWinkelkar
var maakLeegKnop = document.getElementById("idMaakLeeg")
maakLeegKnop.onclick = maakWinkelkarLeeg
mijnWinkelkar = new Winkelkar();



function voegToeAanWinkelkar(){
    var inputs = document.getElementsByTagName("input");
    var teksten = document.getElementsByTagName("label");
    var tekstenzer = document.getElementsByClassName("form-group form-check")
    console.log(teksten)
    var winkelkar = document.getElementById("idTextArea")
     var som = 0

    for(var i = 0; i < inputs.length; i++) {
        if(inputs[i].type == "checkbox") {
            if(inputs[i].checked == true){
                console.log(inputs[i])
                if(inputs[i].id == "idElektronisch"){
                    mijnWinkelkar.koopEenStuk("tekst per mail")
                }
                if(inputs[i].id == "idZeefdruk"){
                    mijnWinkelkar.koopEenStuk("zeefdruk op papier")

                }
                if(inputs[i].id == "idIngekaderd"){
                    mijnWinkelkar.koopEenStuk("zeefdruk op papier, ingekaderd")

                }

            }
        }
    }
    winkelkar.innerText = mijnWinkelkar.informatie
    if(som != 0){
        winkelkar.innerText = som;
    }
}
function maakWinkelkarLeeg(){
    mijnWinkelkar.maakLeeg()
    var winkelkar = document.getElementById("idTextArea")

    winkelkar.innerText = "voorlopig nog niets besteld"

}
