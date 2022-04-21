export class Newsitem{
  constructor(public id:number, public titel:string, public inhoud:string, public categorie:string, public subcategorie:string){
    this.id = id;
    this.titel = titel;
    this.inhoud = inhoud;
    this.categorie = categorie;
    this.subcategorie = subcategorie;
  }
}
// controleer of this.titel = titel niet overbodig is !!
