import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from "@angular/material";


import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdzBooksService } from '../services/adzbooks.service';

import { AppComponent } from './app.component';
import { AdzHomeBooksComponent } from '../components/adz-home-books/adz-home-books.component';
import { AdzListBooksComponent } from '../components/adz-list-books/adz-list-books.component';
import { AdzBookDialogComponent } from '../components/adz-book-dialog/adz-book-dialog.component';
import { AdzBlurBackgroundDirective } from '../directives/adz-blur-background.directive';


const routes: Routes = [
  { path: '', component: AdzHomeBooksComponent }, 
  { path: 'books/:q', component: AdzListBooksComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AdzHomeBooksComponent,
    AdzListBooksComponent,
    AdzBookDialogComponent,
    AdzBlurBackgroundDirective,
  ],
  imports: [
    BrowserModule, 
    RouterModule.forRoot( routes ), 
    HttpClientModule,
    FormsModule, 
    BrowserAnimationsModule, 
    MatDialogModule
  ],
  providers: [AdzBooksService],
  bootstrap: [AppComponent],
  entryComponents: [AdzBookDialogComponent]

})
export class AppModule { }
