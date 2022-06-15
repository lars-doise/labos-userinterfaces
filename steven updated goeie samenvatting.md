# Samenvatting

## TypeScript

TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

- TypeScript adds additional syntax to JavaScript to support a tighter integration with your editor. Catch errors early in your editor.
- TypeScript code converts to JavaScript, which runs anywhere JavaScript runs: In a browser, on Node.js or Deno and in your apps.
- TypeScript understands JavaScript and uses type inference to give you great tooling without additional code.

### TypeScript interface

```ts
interface Person {
        firstName: string;
        lastName: string;
        age?: number; //Optional
}

let user = {firstName: "John", lastName: "Doe"}

```

### TypeScript class

```ts
class Student {
    fullName: string;

    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = `${firstName} ${middleIntitial} ${lastName}`
    }
}

let user = new Student("John", "L.", "Doe")
```

## Angular

Angular is a development platform, built on TypeScript. As a platform, Angular includes:

- A component-based framework for building scalable web applications
- A collection of well-integrated libraries that cover a wide variety of features, including routing, forms management, client-server communication, and more
- A suite of developer tools to help you develop, build, test, and update your code


### Components

Components are the most basic UI building block of an Angular app. An Angular app contains a tree of Angular components.

Angular components are a subset of directives, always associated with a template. Unlike other directives, only one component can be instantiated for a given element in a template. [more info...](https://angular.io/api/core/Component)

To create a component in your Angular application, you use the following command:

```shell
root@ubuntu$ ng generate component <name> [options]
```
Or in short:
```shell
root@ubuntu$ ng g c <name> [options]
```
This command will create a folder with the name you supplied and will have the following structure:

| Files | Purpose |
| --- | --- |
| ``app/app.component.ts`` | Defines the logic for the application's root component, named AppComponent. The view associated with this root component becomes the root of the view hierarchy as you add components and services to your application. |
| ``app/app.component.html`` | Defines the HTML template associated with the root AppComponent. |
| ``app/app.component.css`` | Defines the base CSS stylesheet for the root AppComponent.|
| ``app.app.component.spec.ts`` | Defines a unit test for the root AppComponent.|

 **Important!** 
 
 Don't forget to register your newly created component in the ``app.module.ts``-file!
```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

@NgModule({
declarations: [AppComponent], // Add new component in here...
imports: [BrowserModule],
providers: [],
bootstrap: [AppComponent]
})
export class AppModule { }
```

#### **One-way Data Binding**

One-way data binding will bind the data from the component to the view (DOM) or from view to the component. One-way data binding is unidirectional. You can only bind the data from component to the view or from view to the component.

- Component -> View

    There are different techniques of data binding which use one-way data binding to bind data from component to view. Below are some of the techniques, which uses one-way data binding.

    - ***Interpolation Binding:*** Interpolation refers to binding expressions into marked up language.

    - ***Property Binding:*** Property binding is used to set a property of a view element. The binding sets the property to the value of a template expression.
    - ***Attribute Binding:*** Attribute binding is used to set a attribute property of a view element.
    - ***Class Binding:*** Class binding is used to set a class property of a view element.
    - ***Style Binding:*** Style binding is used to set a style of a view element.

``app-example.component.ts``
```ts
import { Component } from '@angular/core';

@Component({
    selector: 'app-example',
    templateUrl: './app-example.component.html',
    styleUrls: ['./app-example.component.css']
})
export class AppExample {
    exampleColor: string = "blue";
    exampleString: string = "Lorem ipsum...";

    title : string = "Title";
    titleClasses = {
        'red-title': true,
        'large-title': true
    }
    titleStyles = {
        'color': 'red',
        'font-size': '4em'
    }

    constructor() {}
}
```

``app-example.component.html``
```html
<h1 [ngClass]="titleClasses">{{title}}</h1>
<h1 [ngStyle]="titleStyles">{{title}}</h1>

<p style.color="{{exampleColor}}">{{exampleString}}</p>
<p [style.color]="exampleColor">{{exampleString}}</p>
<p bind-style.color="exampleColor">{{exampleString}}</p>
```

- View -> Component

    One-way data binding from view to the component can be achieved by using the event binding technique.

``app-example.component.ts``
```ts
import { Component } from '@angular/core';

@Component({
    selector: 'app-example',
    templateUrl: './app-example.component.html',
    styleUrls: ['./app-example.component.css']
})
export class AppExample {
    constructor() {}

    testFunction(): void {
        alert('Button Clicked!');
    }
}
```

``app-example.component.html``
```html
<button (click)="testFunction()">Click here</button>
<button on-click="testFunction()">Click here</button>
```

#### **Two-way Data Binding**

Two-way data binding in Angular will help users to exchange data from the component to view and from view to the component. It will help users to establish communication bi-directionally.

Two-way data binding can be achieved using a ngModel directive in Angular. The below syntax shows the data binding using (ngModel), which is basically the combination of both the square brackets of property binding and parentheses of the event binding.

``app-example.component.html``
```html
<select class="custom-select" [(ngModel)]="selectedOption">
    <option *ngFor="let opt of options" [ngValue]="opt.id">{{opt.name}}</option>
</select>
```

``app-example.component.ts``
```ts
import { Component } from '@angular/core';

@Component({
    selector: 'app-example',
    templateUrl: './app-example.component.html',
    styleUrls: ['./app-example.component.css']
})
export class AppExample {
    selectedOption: ExampleOption | undefined;
    private _options: ExampleOption[] = [];
    get options(): ExampleOption[] {return this._options;}

    constructor() {}
}
```

**Important!**

Before using ``ngModel`` to achieve two-way data binding, it’s very important to import the ``FormsModule`` from ``@angular/forms`` in app.module.ts file as shown below. FormsModule will contain the ngModule directive.

``app.module.ts``
```ts
import { NgModule } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser'; 
import { FormsModule } from "@angular/forms"; 
import { AppComponent } from './app.component'; 
import { FormsModule } from "@angular/forms";

 @NgModule({ 
   imports: [BrowserModule, FormsModule], //Add here...
   declarations: [ AppComponent], 
   bootstrap: [AppComponent] 
}) 
export class AppModule { }
```

#### **Events**

Events are handled in Angular using the following special syntax. Bind the target event name within parentheses on the left of an equal sign, and event handler method or statement on the right. Click [here](https://www.positronx.io/useful-list-of-angular-event-types-for-event-binding/) to view some usefull event names for Event binding.

``app-example.component.html``
```html
<button class="btn" (click)="handleClick($event)">
    Click here
</button>
```
Angular includes ``$event`` that contains the information about an event. The type of ``$event`` depends on the target event, e.g., if the target event is a native DOM element event, then it is an object. 

``app-example.component.ts``
```ts
import { Component } from '@angular/core';

@Component({
    selector: 'app-example',
    templateUrl: './app-example.component.html',
    styleUrls: ['./app-example.component.css']
})
export class AppExample {
    handleClick(event:any) {
        alert(event.target.innerHTML); // returns "Click here"
    }

    constructor() {}
}
```

If an event is a native DOM element event then ``$event.target`` get DOM element reference using which you can access element's property e.g. ``$event.target.innerHTML`` returns the value of innerHTML property of a DOM element.

#### **Sharing data between child and parent**

- **``@Input()``-decorator**

Input decorator marks the property as the input property. I.e it can receive data from the parent component. The parent component uses the property binding to bind it to a component property. Whenever the value in the parent component changes angular updates the value in the child component.

``child.component.ts``
```ts
@Component({
  selector: 'child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent {
  @Input() exampleText:string;
}
```

``parent.component.html``
```ts
<child-component [exampleText]="Lorem Ipsum"></child-component>
```

- **``@Output()``-decorator**

Output decorates the property as the output property. We initialize it as an ``EventEmitter``. The child component raises the event and passes the data as the argument to the event. The parent component listens to events using event binding and reads the data.

``EventEmitter`` is responsible for raising the event. The ``@Output`` property normally is of type ``EventEmitter``. The child component will use the ``emit()`` method to emit an event along with the data.

``child.component.ts``
```ts
@Component({
  selector: 'child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent {
  @Input() exampleText:string;

  //Declare the property
  @Output() exampleTextChange:EventEmitter<string> =new EventEmitter<string>();

    //Raise the event to send the data back to parent
    update() {
        this.exampleTextChange.emit(this.exampleText);
    }   
}
```

``parent.component.ts``
```ts
@Component({
  selector: 'parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {
    exampleText:string = "";

    updateExampleText(text:string) {
        this.exampleText = text;
        console.log(exampleText);
    }
}
```

``parent.component.html``
```ts
<child-component 
    [exampleText]="Lorem Ipsum" 
    (exampleTextChange)="updateExampleText($event)"
>
</child-component>
```

**Important!**

Remember you must use the argument name as ``$event``.

### Services

A Service is a piece of reusable code with a focused purpose. A code that you will use across multiple components in your application.

Our components need to access the data. You can write data access code in each Component, but this is very inefficient and breaks the rule of single responsibility. The Component should focus on presenting the data to the user.

To create a service in your Angular application, you use the following command:

```shell
root@ubuntu$ ng generate service <name> [options]
```
Or in short:
```shell
root@ubuntu$ ng g s <name> [options]
```

The following files will be created:

``example.service.ts``
```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  constructor() { }
}

```

``example.service.spec.ts``
```ts
import { TestBed } from '@angular/core/testing';

import { ExampleService } from './example.service';

describe('ExampleService', () => {
  let service: ExampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExampleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
```

**Important!**

Don't forget to register your service in ``app.module.ts``-file under providers.
``app.module.ts``
```ts
import {LandenService} from './landen.service’;

@NgModule({
declarations: [AppComponent, ExampleComponent],
imports: [BrowserModule, FormsModule],
providers: [ExampleService], // Add service here...
bootstrap: [AppComponent]
})
```

To inject this service in a component you need to add the service as a private parameter to the constructor of the component.

``example.component.ts``
```ts
import {ExampleService} from './example.service’;

export class ExampleComponent {

constructor(private exampleService: ExampleService) {}
...
}
```

To change the service in a service that communicates with an API or a file, you need to add the ``HttpClient`` from ``@angular/common/http``.

**Important!**

Don't forget to add the ``HttpClientModule`` to the ``app.module.ts``-file under .

``app.module.ts``
```ts
import {HttpClientModule} from '@angular/common/http’;

@NgModule({
declarations: [AppComponent, ExampleComponent],
imports: [BrowserModule, FormsModule, HttpClientModule], //Add HttpClientModule here...
providers: [ExampleService],
bootstrap: [AppComponent]
})
```

To get objects from an API or file you'll need to create interfaces that represent those objects, for example:
```ts
interface RestExampleObject {
    id: number;
    text : string;
    optionalInfo: string;
}

interface ExampleObject {
    id: number;
    text: string;
}
```

Now you can create the CRUD methods in the service.

``example.service.ts``
```ts
  examples(): Observable<ExampleObject[]> {
    return this.http.get<RestExampleObject[]>("https://api.org/examples")
      .pipe(
        tap(_ => console.log('fetched examples')),
        map(items => items.map(
          item => new ExampleObject(item.id, item.text)
        ))
      );
  }

  example(id: number): Promise<ExampleObject> {
    return new Promise((resolve, reject) => {
        this.http.get('https://api.org/examples').subscribe(
          res => {
            resolve(res.find(e => e.id === id));
          });
      }
    });
  }
```

Once you have added the methods to the service you can start implementing them in a component

``example.component.ts``
```ts
import {Component, OnInit} from '@angular/core';
import {ExampleObject} from "../data/example";
import {ExampleService} from "../data/notification.service";

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {
  examples : Example[] = [];

  constructor(private exampleService: ExampleService) {
  }

  ngOnInit(): void {
    this.exampleService.examples()
      .then(result => {
        this.examples = result;
      });
  }
}
```

### Routing

``app-routing.module.ts``
```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';

const routes: Routes = [
{ path: 'examples', component: ExampleListComponent },
{ path: 'examples/:id', component: ExampleComponent }
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
```

``app.component.html``
```html
<nav>
  <a routerlink="/examples">Examples</a>
</nav>
<router-outlet></router-outlet>
```

``example-list.component.html``
```html
<a *ngFor="let example of examples" routerlink="examples{{example.id}}">{{example.text}}</a>
```

``example.component.ts``
```ts
...
constuctor(
  private exampleService: ExampleService,
  private route: ActivatedRoute,
  private location: Location
) {}

ngOnInit() : void {
  const id = +this.route.snapshot.paramMap.get('id');
this.exampleService.example(id)
.subscribe(example => this.example = example);}
}

goBack() : void {
  this.location.back()
}
```

## Android - Conceptuele zaken

### Android activiteiten

#### Layout

- Linear
- Constraint

#### Functionaliteit

- Event handlers/listeners
- Lifecycle methods (non-existent, stopped, paused, running)

#### Databinding

- Expression language
- Observables
- One-way databinding
- Two-way databinding

#### Andere activeiten starten

- Service
- Broadcast
- Andere (communicatie tussen activiteiten)
    - explicit intent
    - implicit intent
    - late runtime binding

#### Intuïtieve navigatie

- Tijdelijke navigatie
- Opwaartse navigatie
- Activiteit LIFO backstack
- Meerdere instanties van dezelfde activiteit

#### Toestand van een activiteit

- Toestel draaien
- `onSaveInstanceState` (wat en wanneer?)
- `Bundle`-object
- Wanneer toestand verwijderen uit backstack? Higher priority

### Android MVVM

#### Architecturale patronen

- MVC (Model View Controller)
- MVP (Model View Presenter)
- MVVM (Model View ViewModel)

#### LiveData

- Observable data holder
- Lifecycle-aware
- `MutableLiveData`

#### ViewModel

- Bepaald toestand van de View, gebaseerd op de data in Model
- Richtlijnen:
    - Volledig onafhankelijk van de UI
    - Heeft een default constructor

#### Tijdelijke opslag van UI gegevens

- Systeemgedrag over tijdelijk geheugen
- ViewModel: Bundle (`saveInstanceState`), persistent storage

#### Repository

- Module voor gegevensverwerkingen
- Data Access Object (DAO)

#### Room

- Abstractielaag voor interactie met een SQLite database
    - Entity
    - DAO
- Singleton: Companion object
- Initialisatie: worker (op een andere thread)
- LiveData Transformation
    - `Map`: LiveData to String
    - `SwitchMap`: LiveData to LiveData

### Android Gevorderde concepten

- WorkManager
    - Synchroon vs Asynchroon
    - Doel Mainthread is 60FPS
    - Hard work op andere threads dmv workers en `WorkRequest`-objecten voor communicatie
    - Gebruik van database-initialiseren

- Fragments
    - Deel van de gebruikersinterface
    - UI-Fragments
    - Koppelen aan activiteit waartoe het behoort
    - Levensloop fragment gekoppeld aan levensloop activiteit
    - Fragment-fragment communicatie

- Navigatie
    - `NavHost`
    - `NavHostFragment`
    - Navigation graph met destinations en actions

- RecyclerView
    - Widget om lijsten met gegevens te tonen
    - Werking: 
        - `Container` (viewGroup)
        - Aantal `ViewHolder`-objecten
        - RecyclerView-adapter
    - Gebruik:
        - RecyclerView-widget toevoegen aan layout
        - Layout van 1 item vastleggen in de lijst
        - Aanmaken ViewHolder en Lijstadapter (lijst items worden geplaatst viewholders)
        - Ken adapters toe aan de RecyclerView
    - Veranderende data:
        - sorteren met `RecyclerViewAdapter` of `ListAdapter`
            - Verschillen in lijst bepalen
            - Aanmaken ListAdapter
            - Lijst updaten
    - Binding Adapters:
        - Doel: eigen attributen maken voor widgets
    - RecyclerView met databinding:
        - Info toevoegen aan binding-object in viewholder of adapter
        - Verschillende stappen:
            - Variabelen toevoegen aan layout-bestand
            - ViewHolder-object met attribuut databinding aanmaken
            - In adapeter de attributen van de binding een waarde toekennen

### Android Webservice gebruiken

- Permissies instellen:
    - Normaal
    - Signature
    - Gevaarlijk

- Volley
    -Bibliotheek om HTTP-aanvragen te versturen
    - Werking vergelijkbaar met fetch-API

### Android Mobile apps

- Verschillende types apps:
    - Native apps geschreven in bv. Swift (IOS)
    - Hybrid apps geschreven in bv. React Native
    - Web apps (PWA)