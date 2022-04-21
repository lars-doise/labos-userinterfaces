import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap, map, filter, single} from "rxjs";
import {Newsitem} from "./newsitem";
import {RestNewsitem} from "./rest-newsitem";
import {Onderwerp} from "./onderwerp";

@Injectable({
  providedIn: 'root'
})
export class NieuwsService {
  constructor(private http:HttpClient){}

  // alle items worden tegelijk opgehaald (1 resultaat)
  haalAlleNewsitems():Observable<Newsitem[]>{
    return this.http.get<RestNewsitem[]>("https://623b4a952e056d1037f0689b.mockapi.io/items")
      .pipe(
        //tap((items: any) => console.log(items)),
        map((items: { id:number, title: string; content: string; category: string; subcategory: string;}[]) => {
          return items.map(
              (item: { id:number, title: string; content: string; category: string; subcategory: string; }) => {
              return new Newsitem(item.id, item.title, item.content, item.category, item.subcategory);
            }
          );
        })
      );
  }

  haalNewsItem(id: string):Observable<Newsitem>{
    return this.http.get<RestNewsitem>("https://623b4a952e056d1037f0689b.mockapi.io/items/"+id)
      .pipe(
        //tap((item: any) => console.log(item))
        map((item:RestNewsitem)=>{return new Newsitem(item.id, item.title, item.content, item.category, item.subcategory);})
    );
  }

  haalOnderwerpen():Observable<Onderwerp[]>{
    return this.http.get<Onderwerp[]>("https://623b4a952e056d1037f0689b.mockapi.io/onderwerpen");
  }

  haalSubCategorien(id:string):Observable<string[]>{
    return this.http.get<Onderwerp>("https://623b4a952e056d1037f0689b.mockapi.io/onderwerpen/"+id)
      .pipe(
        map((onderwerp: Onderwerp)=>{return onderwerp.subcategorieen})
      );
  }
}
