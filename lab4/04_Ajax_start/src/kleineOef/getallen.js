
let resultaat = 0

function leesGetal(){
   return new Promise((resolve, reject) => {
        const getal = parseInt(prompt("geef een getal"))

        if(Number.isInteger(getal)){
            console.log(getal)
            resolve(getal)
        }
        else{
            console.log("WORDEN GEREJECT")
            reject(getal)
        }
    })
}

function telbij(getal){

    return new Promise((resolve, reject) => {
        if(getal + resultaat > 100){
            reject("getal is groter ennija")
        }
        else{
            resultaat += getal;
            resolve(resultaat)
        }

    })
}
function log(bericht) {
    alert(bericht)
    console.log(bericht)
}

leesGetal().then(telbij).then(leesGetal).then(telbij).then(leesGetal).then(telbij).then(log).catch(log)

