import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-adz-book-dialog',
  templateUrl: './adz-book-dialog.component.html',
  styleUrls: ['./adz-book-dialog.component.css']
})
export class AdzBookDialogComponent implements OnInit {

  private title : string;  
  private authors : string;
  private publishedDate : string;
  private categories : string;
  private imageLinks : string;
  private language : string;
  private infoLink : string;
  private description : string;

  constructor(private dialogRef: MatDialogRef<AdzBookDialogComponent>, @Inject(MAT_DIALOG_DATA) data) { 

    this.title = data.title;    
    this.authors = data.authors;
    this.publishedDate = data.publishedDate;
    this.categories = data.categories;
    this.imageLinks = data.imageLinks;
    this.language = data.language;
    this.infoLink = data.infoLink;
    this.description = data.description;
  }

  ngOnInit() {
    
  }

}
