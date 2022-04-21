import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temperature-guage',
  templateUrl: './temperature-guage.component.html',
  styleUrls: ['./temperature-guage.component.css']
})
export class TemperatureGuageComponent implements OnInit {

  title = 'Bathroom';
  temp = 23;

  constructor() { }

  ngOnInit(): void {
  }

}
