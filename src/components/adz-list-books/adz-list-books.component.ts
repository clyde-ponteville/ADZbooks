import { Component, OnInit } from '@angular/core';
import { AdzBooksService } from '../../services/adzbooks.service';
import { AdzBookDialogComponent } from '../../components/adz-book-dialog/adz-book-dialog.component';
import { MatDialog, MatDialogConfig } from "@angular/material";

@Component({
  selector: 'adz-list-books',
  templateUrl: './adz-list-books.component.html',
  styleUrls: ['./adz-list-books.component.css']
})
export class AdzListBooksComponent implements OnInit {
  private books : any

  constructor( public booksService: AdzBooksService, private dialog: MatDialog ) { }

  // Récupère tous les livres
  ngOnInit() {    
    this.booksService.getAll()
      .then( books  => { this.books = books; } );
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

      //debug
      o: detailBook
    };

    this.dialog.open(AdzBookDialogComponent, dialogConfig);
}

}
