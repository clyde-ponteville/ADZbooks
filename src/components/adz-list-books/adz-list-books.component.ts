import { Component, OnInit } from '@angular/core';
import { AdzBooksService } from '../../services/adzbooks.service';
import { AdzBookDialogComponent } from '../../components/adz-book-dialog/adz-book-dialog.component';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { exists } from 'fs';

@Component({
  selector: 'adz-list-books',
  templateUrl: './adz-list-books.component.html',
  styleUrls: ['./adz-list-books.component.css']
})
export class AdzListBooksComponent implements OnInit {
  private books : any
  private authors : any;

  constructor( public booksService: AdzBooksService, private dialog: MatDialog ) { 

  }

  // Récupère tous les livres
  ngOnInit() {    
    this.booksService.getAll()
      .then( books  => { 
        this.books = books;       
        
        //Tableau qui contiendra tous les auteurs
        var arrayAuthor = [];        
        //Recherche des auteurs
        for (const key in books.items) {
          if (books.items.hasOwnProperty(key)) {
            const element = books.items[key];            
            let author = element.volumeInfo.authors;
            //Ajoute tous les auteurs dans un tableau
            if (author != undefined ) {              
              author.forEach(element => {
                arrayAuthor.push(element);
              });
            }
          }
        }
        //Enleve les doublons du tableau
        this.authors = Array.from( new Set(arrayAuthor) );              
      } );
      
      
  }

  // affiche les details du livre cliqué
  openDialog(detailBook : any) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: detailBook.title,
      authors: detailBook.authors,
      publishedDate: detailBook.publishedDate,
      categories: detailBook.categories,
      imageLinks: detailBook.imageLinks.thumbnail,
      language: detailBook.language,
      infoLink: detailBook.infoLink,
      description: detailBook.description,
    };

    this.dialog.open(AdzBookDialogComponent, dialogConfig);
}

//Récupère les livres de l'auteur choisi
getByAuthor(authorSelected : string){
  this.booksService.getAll()
      .then( books  => { 
        this.books = books;     
        
        // Création d'un objet construit de la même façon de l'objet reçu par l'api
        // On lui ajoutera tous les objets lié à l'auteur choisi puis on mettra à jour 
        // l'attribut books
        let objBook = {items: [] }
      
        for (const key in books.items) {
          if (books.items.hasOwnProperty(key)) {
            const element = books.items[key];
        
            if (element.volumeInfo.authors == authorSelected) { 
              objBook.items.push(element);
              this.books = objBook;
            }          
          }          
        }

      });
        
}


}
