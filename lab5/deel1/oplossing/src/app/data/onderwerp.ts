export class Onderwerp{
  constructor(public id:number, public title:string, public subcategorieen:string[]){
    this.id = id;
    this.title = title;
    this.subcategorieen = subcategorieen;
  }
}
