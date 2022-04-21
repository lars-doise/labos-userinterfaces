// let p = new Promise((resolve, reject) => {
//     console.log("in functie");
//     let kans = Math.floor((Math.random() * 2));
//     if (kans === 0){
//         return resolve("gelukt");
//     }
//     else{
//         return reject("FOut")
//     }
// })
// p.then((tekst) => console.log(tekst))
//     .catch((fout) => console.log(fout))
// console.log("NA functie");

import {Observable} from "rxjs"
let observable = new Observable((observer) =>{
    observer.next(1)
    observer.next(2)
    observer.next(3)
    setTimeout(() => {
        observer.next(4);
        observer.complete()
    }, 1000)
})

console.log("just ervoor");
observable.subscribe({
    next: x => console.log('got value', + x),
    error: error => console.log('got error' + error),
    complete: () => console.log("we zi klaar")
})
console.log("just erna");
