import {Component, OnInit} from '@angular/core';
import {NieuwsService} from "../data/nieuws.service";
import {Onderwerp} from "../data/onderwerp";

@Component({
  selector: 'app-overzicht',
  templateUrl: './overzicht.component.html',
  styleUrls: ['./overzicht.component.css']
})
export class OverzichtComponent implements OnInit {

  onderwerpen: Onderwerp[] = [];

  constructor(private service:NieuwsService) {
  }

  ngOnInit(): void {
    this.service.haalOnderwerpen().subscribe((x)=>{
      for(let onderwerp of x){
          this.onderwerpen.push(onderwerp);
      }
    });
  }
}
