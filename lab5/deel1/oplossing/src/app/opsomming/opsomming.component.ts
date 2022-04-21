import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {Newsitem} from "../data/newsitem";
import {NieuwsService} from "../data/nieuws.service";

@Component({
  selector: 'app-opsomming',
  templateUrl: './opsomming.component.html',
  styleUrls: ['./opsomming.component.css']
})
export class OpsommingComponent implements OnInit {

  nieuwsitems: Newsitem[] = [];
  allNieuwsItems: Newsitem[]=[];
  @Input()
  subCategorie: string = "";

  constructor(private service: NieuwsService) {
  }

  ngOnInit(): void {
    this.service.haalAlleNewsitems().subscribe((lijst:any) => {
      this.allNieuwsItems = lijst;
    });
  }

  ngOnChanges(changes: SimpleChanges): void{
    if(this.subCategorie != undefined) {
      this.nieuwsitems = [];
      for (let item of this.allNieuwsItems) {
        if (item.subcategorie == this.subCategorie) {
          this.nieuwsitems.push(item);
        }
      }
    }
  }
}
