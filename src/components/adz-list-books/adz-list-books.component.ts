import { Component, OnInit } from '@angular/core';
import { AdzBooksService } from '../../services/adzbooks.service';

@Component({
  selector: 'adz-list-books',
  templateUrl: './adz-list-books.component.html',
  styleUrls: ['./adz-list-books.component.css']
})
export class AdzListBooksComponent implements OnInit {
  private books : any

  constructor( public booksService: AdzBooksService ) { }

  // Récupère tous les livres
  ngOnInit() {    
    this.booksService.getAll()
      .then( books  => { this.books = books; } );
  }

  // affiche les details du livre cliqué
  showDetails(detailBook : any){
    console.log(detailBook.title);
  }

}
