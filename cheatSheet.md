# Lab1 JS en bootstrap

Enkele klasses voornamelijk DOM
Forms, select, checkboxes (webshop)
	
```html
Select:
<select class="form-control ml-2" name="kleurkader" id="idkleurkader">
	<option value="wit">wit</option>
	<option value="grijs">grijs</option>
	<option value="houtskleur">houtskleur</option>
	<option value="zwart">zwart</option>
</select>
Returns value of selected object
document.getElementById("mySelect").value = "banana";


Card with form:
<div class="card-body">
	<div class="card-text">
		<div class="form-group">
		<textarea class="form-control" id="idTextArea" rows="10">voorlopig nog niets besteld
		</textarea>
		</div>
		<p>
			betaling per
		</p>
		<div class="form-check">
			<input class="form-check-input" type="radio" name="betalingswijze" id="idOverschrijving"
					value="overschrijving" checked>
			<label class="form-check-label" for="idOverschrijving">overschrijving</label>
		</div>
		<div class="form-check">
			<input class="form-check-input" type="radio" name="betalingswijze" id="idBetaalkaart"
					value="betaalkaart">
			<label class="form-check-label" for="idBetaalkaart">betaalkaart</label>
		</div>
	</div>
</div>

Input checkbox:
<input type="checkbox" class="form-check-input" name="ingekaderd" id="idIngekaderd">
Get status:
document.getElementById("myCheck").checked

Input radiobutton:
<input type="radio" id="male" name="gender" value="male">
<label for="male">Male</label><br>
<input type="radio" id="female" name="gender" value="female">
<label for="female">Female</label><br>
<input type="radio" id="other" name="gender" value="other">
<label for="other">Other</label>
document.getElementById("male").checked


Action:
<form action="/action_page.php">
  <label for="fname">First name:</label>
  <input type="text" id="fname" name="fname"><br><br>
  <label for="lname">Last name:</label>
  <input type="text" id="lname" name="lname"><br><br>
  <input type="submit" value="Submit">
</form>
Wordt geprocessed als: fname=Lennert&lname=Steyaert 

```
Lab2 Snakegame

Alles met canvas
Keyevents
Local storage

```javascript
document.getElementById("demo")
document.getElementById("myBtn").addEventListener("click", displayDate);

var para = document.createElement("p");
var node = document.createTextNode("This is new.");
para.appendChild(node);
el.clearChildren()

key:
let keyHandler = (e) => {
if (e.key === "ArrowLeft") {
	if(pause === false){
		dx = -1;
		dy = 0;
	}
}

event:
document.addEventListener("keydown", keyHandler);

prompt:
let name = prompt("Enter name");
alert("I am an alert box!");
let con = window.confirm("sometext");

interrupt action:
event.preventDefault();

canvas:
	loadImage(){
	this.hoeraImg = new Image(430,430);
	this.hoeraImg.src = "/images/hoera.png";

	this.hoeraImg.onload = function(){
		console.log("loaded");
	};
	}
	
	let canvas = document.createElement('canvas');
	canvas.width = 430;
	canvas.height = 430;

	let ctx = canvas.getContext("2d");
	console.log(this.hoeraImg);
	ctx.drawImage(this.hoeraImg, 0, 0, 430, 430);

	ctx.font = "24px Verdana";
	let text = "u opende " + (16-this.score)+ " sets tevergeefs";
	ctx.fillText(text, 100, 400);

canvas rechthoek:
	    context.fillStyle='#000';
        context.fillRect(this.x-2, this.y-2, this.blockSize+4, this.blockSize+4);
        context.fillStyle = "#FF0000";
        context.fillRect(this.x, this.y, this.blockSize, this.blockSize);
	
clear canvas:
	ctx.clearRect(0,0,width, height);

Localstorage:
let loadedData = localStorage.getItem("gameData");
let scoreObject = {
	name: name,
	score: score
};

if(loadedData){
	let data = JSON.parse(loadedData);
	let index = 0;

	while(index < data.length && data[index].name !== name){
		index++;
	}

	if(index === data.length){
		data.push(scoreObject);
		let json = JSON.stringify(data);
		localStorage.setItem("gameData",json);
	} else{
		if(score > data[index].score){
			data[index].score = score;
			let json = JSON.stringify(data);
			localStorage.setItem("gameData",json);
		}
	}
} else{
	let scores = [scoreObject];
	let json = JSON.stringify(scores);
	localStorage.setItem("gameData",json);
}

Sessionstorage:
sessionStorage.setItem("key", "value");
sessionStorage.removeItem("key");
sessionStorage.clear();

verder kan je het gebruiken als:
sessionStorage.clickcount = Number(sessionStorage.clickcount) + 1;


For loops:
for (i = 0; i < cars.length; i++) {
  text += cars[i] + "<br>";
}
for (key in object) {
  text += object[key];
}
for (variable in array) {
  txt += numbers[x] + "<br>";
}
// Loop through array and return values
for (let x of cars) {
  text += x + "<br>";
}


JS class:
class Car {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
   age(x) {
    return x - this.year;
  }
}


JS literals:
`string text ${expression} string text`
```
	

Lab 3 rxjs`
``` javascript
const { Observable } = rxjs;
const { map } = rxjs.operators;

// Hot obs:
let rand = Math.random()
let constTempObservableWithNoiseHot = new Observable(function subscribe(subscriber) {
    subscriber.next(20 + (rand * 2) - 1);
});
// Cold obs:
let constTempObservableWithNoiseCold = new Observable(function subscribe(subscriber) {
    subscriber.next(20 + (Math.random() * 2) - 1);
});

let observable = new Observable(subscriber => {
	let id = teller;
	let eenheidSubs = eenheid;

	setInterval( () => {
//        subscriber.next({subscriber: id,
//        value: Math.round((((Math.random() * 0.5) * (Math.round(Math.random()) ? 1 : -1))*10))/10});

	subscriber.next({subscriber: id,
	value: temperature.value, eenheid: eenheidSubs});
	}, 200);
});

let observable_pipe =
	observable.pipe(
	throttleTime(1000),
	map(ev => {
		if(ev.eenheid == "Fahrenheit"){
			ev.value = (ev.value * 1.8) + 32;
		} else{
			if(ev.eenheid == "Kelvin"){
				ev.value = ev.value + 273.15;
			}
		}
		ev.value = Math.round(ev.value*10)/10;
		return ev;
	}));

fromEvent(idAddTempObs, 'click')
	.subscribe(ev => {
		teller += 1;

		observable_pipe.subscribe(x => {
			if(document.getElementById("card_temp"  + x.subscriber)){
				changeCard(x.subscriber, x.value)
			} else{
				addCard(x.eenheid,x.value, x.subscriber);
			}
		});
	});

// Voorbeeld extra stukje aanplakken

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

// Subscription voorbeeld:
currentObservable
	.subscribe((x) => {
		let card = document.getElementById("card_" + (x.subscriber));
		let card_text = card.getElementsByClassName("card-text")[0];
		card_text.innerText = x.value;
	});

// Gemiddelde max, min voorbeeldoplossing
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
```

Lab4 Ajax en promises
	
Deel A promises

``` javascript
function leesGetal(){
    return new Promise((resolve,reject) => {

        let input = prompt("Geef een getal in?");

        if(isNaN(input)){
            console.log("geen nummer");
            reject("Geen nummer : " + input);
        }
//        resolve(input);
        resolve(telBij(input));
    });
}

function telBij(getal){
    console.log(getal);
    return new Promise((resolve,reject) => {
        som += Number(getal);
        if(som > 100){
            console.log("som te groot");
            reject("Som is te groot: " + som);
        }
        resolve();
    });
}


leesGetal()
//    .then(telBij)
    .then(leesGetal)
//     .then(telBij)
    .then(leesGetal)
//     .then(telBij)
    .then((test) => window.alert("Som is: " + som))
.catch((error) => {
    window.alert(error);
});
```
Deel B ajax	
``` javascript
Get:
fetch('/scores', {
	method: "GET",
}).then(response => response.json())
	.then(json => {
		let scores = document.getElementById('idScoresPlainText');
		scores.replaceChildren();
		for(let el of json){
			let text = "" + el.name + " " + el.score;
			scores.appendChild(document.createElement('p').appendChild(document.createTextNode(text)));
		}
	});

Aanmaken mogelijke data:

let data = {
	name: this.naam,
	score: this.score,
};

Post:

fetch('/scores', {
	method: 'POST', // or 'PUT'
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify(data),
}) .then(response => {
	if(response.status === 201){
		console.log("created");
	} else{
		console.log("Failed with code: " + response.status);
	}
}).catch(error => console.log("Code error"));

Delete met attribuut in uri:

let uuid = tr.getAttribute('data-id');
fetch(`/posts/${uuid}`, {
	method: "DELETE",
}).then(response => refreshTable());

fetch(`/posts/${uuid}`, {
	method: "GET",
}).then(response => response.json())
.then(json => {
	saved_id = json.uuid;
	document.getElementById("txtTitle").value = json.title;
	document.getElementById("txtContent").value = json.content;
});

Put met attribuut in URI:

fetch(`/posts/${saved_id}`, {
	method: 'PUT', // or 'PUT'
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify(data),
}) .then(response => {
	console.log(response.status);
	if(response.status === 204){
		clearFields();
		success("Succesvol aangemaakt");
		refreshTable();
	} else{
		fail("Failed with code: " + response.status);
	}
}).catch(error => fail("Code error"));
```
Lab5 Angular

Services, binding etc

Commando's:

ng new smarthome --routing
ng generate component notification
ng generate service hero

``` javascript

inladen json:
in tsconfig.json in compileroptions
    "resolveJsonModule": true,
    "esModuleInterop": true,
importeren door: import * as json from '../app/data/notifications.json'; dit zijn standaard java objecten! (JSON.parse() voor strings)


Tag in gebruik nemen:
 <app-notification routerLink="/notification/{{not.id}}" message="{{not.message}}" icon="{{not.icon}}"  date={{not.timestamp}} (open)="ownCallback($event)"></app-notification>

One way binding:   
imports: import {Component, Input, OnInit} from '@angular/core';
@Input() icon: string;
<i class="fas {{icon}}"></i>
<i class="fas" [className]="icon"></i>

@Input() temperature(value: number){	niet echt gebruikt
		this._temperature = value;
}

@Output() fixed:string = "fixed"; // hieronder voorbeeld output emitter


voorbeeld klasse typescript:
export class NotificationComponent implements OnInit {
  notifications  = [];
  notificationsVisible = [];
  showed = 0;
  
  constructor() { }

  @Input() message: string;
  @Input() date: Date;
  @Input() icon: string;
  // tslint:disable-next-line:no-output-native
  @Output() open: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.open.emit("dit is miin tekst");
  }
}


Toevoegen two way binding : importeren FormsModule INPUTS
<input type="number" [(ngModel)] = "_temperature"/>

Event binding:
Meer of minder tonen? array maken met visible items
  in html:  <a *ngIf="showed < notifications.length" class="list-group-item list-group-item-action" (click)="showMore()">Load more...</a>
  showMore(): void{
    this.showed = Math.min(this.showed + 5, this.notifications.length);
    this.notificationsVisible = this.notifications.slice(0, this.showed);
  }
 
event binding naar parent:
  // tslint:disable-next-line:no-output-native
  @Output() open: EventEmitter<any> = new EventEmitter();
  aanroepen met:     this.open.emit("dit is miin tekst");
  
  gebruiken door: (open)="ownCallback($event) toeveogen als attribuut!
  
  

Service:
aanmaken: ng generate service hero
toevoegen aan providers in app.module.ts!!
imports alles inclusief HTTP
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],

@Injectable({
	providedIn: 'root'
})
export class HomeServiceService {
	private url = 'http://www.mocky.io/v2/5be453402f00002c00d9f48f';
	constructor(private http: HttpClient) { }
	constructor(private homeService: HomeServiceService) { }

	getNotifications(): Observable<INotificationModel[]>{
		return this.http.get<RestNotifications>(this.url)
		.pipe(
			tap(items => console.log(items)),
			map(nots => nots.notifications),
			map(items => items.map(item => new NotificationModel(item.id, item.message, item.icon))));
	}

	getNotification(id: number){
			return this.getNotifications().pipe(map(items => items[id]));
	}
		  getNotificationsStatic(): Promise<Notification[]>{
	    return new Promise<Notification[]>((resolve) => {
	      const notif = [];
	      for (const not of this.notifications){
		notif.push({id: not.id, message: not.message, icon: not.icon, timestamp: new Date()});
	      }
	      resolve(notif);
	    });
	  }

	  getNotificationsStaticById(id): Promise<Notification>{
	    return new Promise<Notification>((resolve, reject) => {

	      if (id in this.notifications){
		let not = this.notifications[id];
		resolve({id: not.id, message: not.message, icon: not.icon, timestamp: new Date()});
	      }
	      reject('not available');
	    });
	  }

  getAllNotifications(): Promise<{ 'id', 'message', 'icon' }[]> {
    return new Promise((resolve, reject) => {
      if (this.notifications.length === 0) {
        this.http.get(this.url).subscribe(
          res => {

            /* zonder de commentaar die start met tslint:... werkt de code NIET; */
            /* knip en plak de foutmelding in een zoekmachine, en dan kom je uit op stackoverflow:*/
            /* https://stackoverflow.com/questions/33387090/how-to-rewrite-code-to-avoid-tslint-object-access-via-string-literals */

            /* tslint:disable:no-string-literal */
            this.notifications = res['notifications'];
            /* tslint:enable:no-string-literal */
            resolve(this.notifications);
          });
      } else {
        resolve(this.notifications); /* dit geeft het attribuut door als resultaat van de promise,
                                        zodat er verdere bewerkingen op kunnen gebeuren (met then...)*/
      }

    });
  }


  getNotificationWithId(id): Promise<{ 'id', 'message', 'icon' }> {
    return new Promise((resolve, reject) => {
      if (this.notifications.length === 0) {
	this.http.get('http://www.mocky.io/v2/5be453402f00002c00d9f48f').subscribe(
	  res => {
	    /* tslint:disable:no-string-literal */
	    this.notifications = res['notifications'];
	    /* tslint:enable:no-string-literal */
	    resolve(this.notifications[id]);
	  });
      } else {
	resolve(this.notifications[id]);
      }
    });
  }
}

Service gebruiken:

constructor(private homeService: HomeServiceService) { }
ngOnInit(): void {
this.homeService.getNotifications().subscribe((notifications) => {
	this.notifications = notifications;
	this.changeView();
}); linken aan : 
<div *ngFor=" let notification of showedNotifications" routerLink="/notification/{{notification.id}}">

met promises:
    this.service.getNotificationsStaticById(id).then((value => {
      this.notification = value;
    }));
    
    this.service.getNotificationsStatic()
      .then((value => {
        this.notifications = value;
        this.showMore();
      }))
      .catch((error) => console.log(error));
    

wachten op resultaat voor het weergeven:
    <div *ngIf="notification != undefined">
      <app-notification message="{{notification.message}}" icon="{{notification.icon}}" date="{{notification.timestamp}}"></app-notification>
    </div>
	

Ngfor of ngif + event binding:

<div *ngFor=" let notification of showedNotifications" routerLink="/notification/{{notification.id}}">
<app-notification icon="fas {{notification.icon}}" message="{{notification.message}}"></app-notification>
</div>

<a *ngIf="showedNotifications.length !== notifications.length"   class="list-group-item list-group-item-action" (click)="changeView()" >Load more...</a>

Routerlink:

<a class="nav-link" routerLink="/temperature">
<router-outlet></router-outlet>
in html <div *ngFor=" let notification of showedNotifications" routerLink="/notification/{{notification.id}}">


const routes: Routes = [
	{path: 'overview', component: OverviewComponent},
	{path: 'security', component: SecurityComponent},
	{path: 'temperature', component: TemperatureComponent},
	{path: 'energy', component: EnergyComponent},
	{path: 'notification/:id', component: NotificationDetailComponent}
];
	
id router:

export class NotificationDetailComponent implements OnInit {
	notification;

	constructor(private route: ActivatedRoute, private homeService: HomeServiceService) {}

	ngOnInit(): void {
	const id = +this.route.snapshot.paramMap.get('id');
	this.homeService.getNotification(id).subscribe((notification) => this.notification = notification);
	}
}

Class en interface:

export class NotificationModel implements INotificationModel{
	id: number;
	message: string;
	icon: string;
	timestamp: Date;

	constructor(id, message, icon, timestamp=Date.prototype) {
	this.id = id;
	this.message = message;
	this.icon = icon;
	this.timestamp = timestamp;
	}
}
export interface INotificationModel{
	id: number;
	message: string;
	icon: string;
	timestamp: Date;
}

export interface RestNotification{
  notifications: RestSubItem[];
}

interface RestSubItem{
  id: number;
  message: string;
  icon: string;
}

```












