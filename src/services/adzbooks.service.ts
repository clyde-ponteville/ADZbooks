import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AdzBooksService {

  private search : string; 
  constructor( public http: HttpClient, private router : Router) { 

  }

  //Récupère la recherche de l'utilisateur et execute une redirection vers la liste des livres comprenant cette recherche
  getSearch(search : string){
    this.search = search;
    this.router.navigate(['/books', search]);
  }

  //Récupère tous les livres avec la recherche
  getAll(){
    return this.http.get('https://www.googleapis.com/books/v1/volumes?q='+this.search)
    .toPromise();
  }
}
