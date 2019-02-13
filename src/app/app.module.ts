import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdzBooksService } from '../services/adzbooks.service';

import { AppComponent } from './app.component';
import { AdzHomeBooksComponent } from '../components/adz-home-books/adz-home-books.component';
import { AdzListBooksComponent } from '../components/adz-list-books/adz-list-books.component';


const routes: Routes = [
  { path: '', component: AdzHomeBooksComponent }, 
  { path: 'books/:q', component: AdzListBooksComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AdzHomeBooksComponent,
    AdzListBooksComponent,
  ],
  imports: [
    BrowserModule, RouterModule.forRoot( routes ), HttpClientModule, FormsModule
  ],
  providers: [AdzBooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
