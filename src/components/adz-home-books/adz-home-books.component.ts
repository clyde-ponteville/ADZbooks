import { Component, OnInit } from '@angular/core';
import { AdzBooksService } from '../../services/adzbooks.service';


@Component({
  selector: 'app-adz-home-books',
  templateUrl: './adz-home-books.component.html',
  styleUrls: ['./adz-home-books.component.css']
})
export class AdzHomeBooksComponent implements OnInit {
  private search : string;

  constructor(public booksService: AdzBooksService) { }

  ngOnInit() {
  }
  
  submit(){   
    this.booksService.getSearch(this.search);
  }

}
