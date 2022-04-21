const {Observable, fromEvent, from } = rxjs;
const {map, reduce, filter} = rxjs.operators;
import {temperature, temperatureBurst} from "./signals.js";


// let basisTemp = 17;


let numOfCards = 0;
let numOfRows = 0;

let unit = document.getElementById("idTempUnit").value;
// //deze observable reageert op het click event
// let clicks = fromEvent(document.getElementById("idAddTempObs"), 'click');
// clicks.subscribe(x =>addCard("dqsf",100));
//
// const standaardTempObservable = new Observable( (observer) => {
//     observer.next(17)
//     observer.next(169)
//     observer.next(15646)
//     observer.next(1684465)
//     observer.next(18456161)
// })
// //deze observable regeageert telkens wnr een nieuwe waarde wordt toegevoegd. nu is dat eigenlijk altijd direct, maar het is eig gemaakt om zo lange calls te doen naar een backend fzo bv
// //dan moet je niet lag wachten versta je.
// standaardTempObservable.subscribe(x =>addCard("observable dink" ,x))



// deze observables zijn een voorbeeld van 2 hot en cold
//cold observable (data wordt erin gemaakt) bij die zien we dat het telkens opnieuw berekend wordt.
const ruisObservableCold = new Observable( (observer) => {
    let random = (Math.random() * 2) -1 + temperature.value
    observer.next(random)
})
// hier wordt gesubscribed het moment dat de js uitgevoerd wordt
// ruisObservableCold.pipe(map(temp =>Math.round(temp * 10) / 10)).subscribe(x =>addCard("observable COLD" ,x));

//cold observable (data wordt eruit gemaakt)
let randomTemp = (Math.random() * 2) -1 + temperature.value
const ruisObservableHot = new Observable( (observer) => {
    observer.next(randomTemp)
})
// hier wordt gesubscribed het moment dat de js uitgevoerd wordt
// ruisObservableHot.pipe(map(temp =>Math.round(temp * 10) / 10)).subscribe(x =>addCard("observable HOT" ,x));

let numOfSubs = 0
let ruisObservableInterval = new Observable((observer) => {
    let sub = numOfSubs;

    setInterval(() => {
        observer.next({subscriber: 0, value: temperature.value + (Math.random() * 2) - 1});
    }, 500);

    numOfSubs++;
})



//temperatureburst observable
// let burstObservable = new Observable((observer) => {
//     let burst = temperatureBurst;
//     for(let bu in burst){
//         observer.next(bu);
//     }
// })
let temperatureBurstObservable = from(temperatureBurst);



// moet maar subscriben op anderen als je op de knop geklikt hebt.
fromEvent(document.getElementById("idAddTempObs"), "click").subscribe(() => {

    // ruisObservableHot.pipe(map(temp =>Math.round(temp * 10) / 10)).subscribe(x =>addCard("observable HOT" + unit,x));
    // ruisObservableCold.pipe(map(temp =>Math.round(temp * 10) / 10)).subscribe(x =>addCard("observable COLD" + unit ,x));
    //
    // //voeg de automatische kaart toe. maar overschrijf het omdak geen zin heb om de code te verandern.
    // ruisObservableInterval.subscribe((x) => {
    //     let card = document.getElementById("card_" + (x.subscriber));
    //     // ALTERNATIVE
    //     // let card = document.getElementById("card_" + (cardNr));
    //
    //     let card_text = card.getElementsByClassName("card-text")[0];
    //     card_text.innerText = Math.round(x.value * 10) / 10;
    // });


    //past het element aan in de max dink.
    temperatureBurstObservable
        .pipe(filter((x) => {
                return x !== "error";
            }), reduce((max, curr) => {
                if (curr > max) {
                    max = curr;
                }
                return max;
            }),
            map((x) => {
                x = Math.round(x * 100) / 100;
                return x;
            }))
        .subscribe((x) => {
            let parentEl = document.getElementById("maxTemp");
            parentEl.innerText = "Maximum temperature: " + x + " °C";
        });
});

fromEvent(document.getElementById("idTempUnit"), "change").subscribe( () => {
    unit = document.getElementById("idTempUnit").value;
    console.log(unit)
})


function addCard(title, value) {

    let main = document.getElementsByTagName("main")[0];

    let col = document.createElement("div");
    col.setAttribute("class", "col-md-4");

    let card = document.createElement("div");
    card.setAttribute("class", "card mb-4");
    card.setAttribute("id", "card_" + numOfCards);

    let card_header = document.createElement("div");
    card_header.setAttribute("class", "card-header");
    card_header.innerText = title;
    let card_body = document.createElement("div");
    card_body.setAttribute("class", "card-body");

    let card_body_text = document.createElement("p");
    card_body_text.setAttribute("class", "card-text");
    card_body_text.innerText = value;

    card_body.appendChild(card_body_text);
    card.appendChild(card_header);
    card.appendChild(card_body);
    col.appendChild(card);

    if (numOfCards % 3 === 0) {
        numOfRows++;

        let row = document.createElement("div")
        row.setAttribute("class", "row");
        row.setAttribute("id", "row_" + numOfRows);

        row.appendChild(col);
        main.appendChild(row);
    } else {
        let row = document.getElementById("row_" + numOfRows);
        row.appendChild(col);
    }

    numOfCards++;
}