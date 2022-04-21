import {Component, OnInit} from '@angular/core';
import {Newsitem} from "../data/newsitem";
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';
import {NieuwsService} from "../data/nieuws.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  // om te vermijden dat er fouten komen over 'Object is possibly 'undefined'.
  nieuwsItem: Newsitem|undefined;

  constructor(private service: NieuwsService, private location: Location, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id_als_string'); // 'id_als_string', zoals in app-routing.module.ts
    if (id != null) {
      this.service.haalNewsItem(id).subscribe((item)=>{
        this.nieuwsItem = item;
      })
    }
  }

  goBack():void{
    this.location.back();
  }

}
