import {temperature, temperatureBurst, temperatureBurstWithErrors} from "./signals.js"

const {Observable, fromEvent, from} = rxjs;
const {map, reduce, filter, throttleTime} = rxjs.operators;

let numOfCards = 0;
let numOfRows = 0;

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

let constTempObservable = new Observable(function subscribe(subscirber) {
    subscirber.next(20);
});

let constTempObservableWithNoiseCold = new Observable(function subscribe(subscriber) {
    subscriber.next(20 + (Math.random() * 2) - 1);
});

let rand = Math.random()
let constTempObservableWithNoiseHot = new Observable(function subscribe(subscriber) {
    subscriber.next(20 + (rand * 2) - 1);
});

let unit = document.getElementById("idTempUnit").value;
let numOfSubs = 0;

let tempObservableConstCold = new Observable(function subscribe(subscriber) {
    let sub = numOfSubs;

    setInterval(() => {
        subscriber.next({subscriber: sub, value: 20 + (Math.random() * 2) - 1});
    }, 500);

    numOfSubs++;
});

let tempObservableConstHot = new Observable(function subscribe(subscriber) {
    let sub = numOfSubs;

    setInterval(() => {
        subscriber.next({subscriber: sub, value: 20 + (rand * 2) - 1});
    }, 500);

    numOfSubs++;
});

let tempObservable = new Observable(function subscribe(subscriber) {
    let sub = numOfSubs;

    setInterval(() => {
        subscriber.next({subscriber: sub, value: temperature.value});
    }, 500);

    numOfSubs++;
});

// button event
fromEvent(document.getElementById("idAddTempObs"), "click")
    .subscribe(() => {

        constTempObservable
        // constTempObservableWithNoiseCold
        // constTempObservableWithNoiseHot
            .subscribe((x) => {
            addCard("Temperature observer (C)", x);
        });


        addCard("Temperature observer (" + unit[0] + ")", 0);


        let currentObservable = tempObservable.pipe(
            throttleTime(1000),
            map((x) => {
                x.value = Math.round(x.value * 10) / 10;
                return x;
            }));

        if (unit === "Fahrenheit") {
            currentObservable = currentObservable.pipe(map((x) => {
                x.value = (x.value * (9 / 5)) + 32;
                return x;
            }));
        } else if (unit === "Kelvin") {
            currentObservable = currentObservable.pipe(map((x) => {
                x.value += 273;
                return x;
            }));
        }

        // ALTERNATIVE (no need to pass object with observable)
        // let cardNr = numOfCards-1;

        // als je hier je card opvraagt moet je niet iedere card een uniek nummer geven
        //tempObservableConstHot
        //tempObservableConstCold
        currentObservable
            .subscribe((x) => {
                let card = document.getElementById("card_" + (x.subscriber));
                // ALTERNATIVE
                // let card = document.getElementById("card_" + (cardNr));

                let card_text = card.getElementsByClassName("card-text")[0];
                card_text.innerText = x.value;
            });

    });

fromEvent(document.getElementById("idTempUnit"), "change").subscribe(() => {
    unit = document.getElementById("idTempUnit").value;
});

//let temperatureBurstObservable = from(temperatureBurst);
let temperatureBurstObservable = from(temperatureBurstWithErrors);

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

let count = 0;

temperatureBurstObservable
    .pipe(filter((x) => {
            return x !== "error";
        }), reduce((acc, curr) => {
            count += 1;
            return acc + curr
        }),
        map((x) => {
            return x / count;
        }),
        map((x) => {
            x = Math.round(x * 100) / 100;
            return x;
        }))
    .subscribe((x) => {
        let parentEl = document.getElementById("avgTemp");
        parentEl.innerText = "Average temperature: " + x + " °C";
    });

temperatureBurstObservable
    .pipe(filter((x) => {
            return x !== "error";
        }), reduce((min, curr) => {
            if (curr < min) {
                min = curr;
            }
            return min;
        }),
        map((x) => {
            x = Math.round(x * 100) / 100;
            return x;
        }))
    .subscribe((x) => {
        let parentEl = document.getElementById("minTemp");
        parentEl.innerText = "Minimum temperature: " + x + " °C";
    });
