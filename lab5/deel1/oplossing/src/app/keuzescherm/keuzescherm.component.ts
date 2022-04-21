import {Component, OnInit, Output, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'app-keuzescherm',
  templateUrl: './keuzescherm.component.html',
  styleUrls: ['./keuzescherm.component.css']
})
export class KeuzeschermComponent implements OnInit {

  onderwerpId: string | null= "";

  @Output()
  subCategorie: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private location:Location) { }

  ngOnInit(): void {
    this.onderwerpId = this.route.snapshot.paramMap.get('onderwerp');
  }

  goBack(): void {
    this.location.back();
  }

  veranderSubCategorie(event:any):void{
    this.subCategorie = event.toString();
  }
}
