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
  private books : any;
  private authors : any;
  private categories : any;

  private page : number = 0;
  private totalItems  : number;
  // private pagePrec : number;
  // private pageSuiv : number;


  constructor( public booksService: AdzBooksService, private dialog: MatDialog ) { 

  }

  // Récupère tous les livres
  ngOnInit() {    
    this.booksService.getAll(this.page)
      .then( books  => { 
        this.books = books; 
        
        this.totalItems = Math.ceil(this.books.totalItems / 15);
        // this.pagePrec = this.page - 1;
        // this.pageSuiv = this.page + 1;

        let letBooks = this.books;
        //Tableau qui contiendra tous les auteurs
        var arrayAuthors = [];  
        //Tableau qui contiendra toutes les categories
        var arrayCategories = [];  
        //Recherche dans l'objet reçu de l'api
        for (const key in letBooks.items) {
          if (letBooks.items.hasOwnProperty(key)) {
            const element = letBooks.items[key];
            //Ajoute des couverture aux livres sans
            if (element.volumeInfo.imageLinks == undefined) {
              element.volumeInfo.imageLinks = {thumbnail: 'https://dummyimage.com/254x320/000/fff.jpg&text=No+data'};
            }
            let author = element.volumeInfo.authors;
            let category = element.volumeInfo.categories;
            //Ajoute tous les auteurs dans un tableau arrayAuthorss
            if (author != undefined ) {              
              author.forEach(element => {
                arrayAuthors.push(element);
              });
            }

            //Ajoute toutes les categories dans un tableau arrayCategories
            if (category != undefined ) {              
              category.forEach(element => {
                arrayCategories.push(element);
              });
            }
          }
        }
        //Enleve les doublons du tableau arrayAuthors
        this.authors = Array.from( new Set(arrayAuthors) );  
        //Enleve les doublons du tableau arrayCategories
        this.categories = Array.from( new Set(arrayCategories) );
      } );
      
      
  }

  //pagination
  arrayOne(n: number): any[] {
    let lastPage = n;
    let pagination = [];
    let firstPage = n - (n - 1);

    for (let i = 0; i < n; i++) {
      pagination.push(i+1);    
    }

    if (pagination.length > 3) {      
      
      pagination = pagination.slice(this.page, this.page + 4);
      
      pagination[0] = firstPage;
      pagination.push('...');
      pagination.push(lastPage);
      
      return pagination;
    }else{
      return pagination;
    }
  }
  changePage(i : number){
    this.page = i;
    this.ngOnInit();
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
  getByAuthor(authorSelected){

    if(authorSelected.isUserInput) {
      //Récupère l'auteur choisi
      authorSelected = authorSelected.source.value;

      this.booksService.getAll(this.page)
      .then( books  => { 
        this.books = books;  
      
        let letBooks = this.books;
        // Création d'un objet construit de la même façon de l'objet reçu par l'api
        // On lui ajoutera tous les objets lié à l'auteur choisi puis on mettra à jour 
        // l'attribut books
        let objBook = {items: [] }
      
        for (const key in letBooks.items) {
          if (letBooks.items.hasOwnProperty(key)) {
            const element = letBooks.items[key];
        
            //Ajoute des couverture aux livres sans
            if (element.volumeInfo.imageLinks == undefined) {
              element.volumeInfo.imageLinks = {thumbnail: 'https://dummyimage.com/254x320/000/fff.jpg&text=No+data'};
            }
            if (element.volumeInfo.authors == authorSelected) { 
              objBook.items.push(element);
              this.books = objBook;
            }          
          }          
        }  
      });
      
        
    }       
  }

  //Récupère les livres de l'auteur choisi
  getByCategory(categorySelected){   
    if(categorySelected.isUserInput) {
      //Récupère la catégorie choisi
      categorySelected = categorySelected.source.value;

      this.booksService.getAll(this.page)
      .then( books  => { 
        this.books = books; 
      
        let letBooks = this.books;
        // Création d'un objet construit de la même façon de l'objet reçu par l'api
        // On lui ajoutera tous les objets lié à la categorie choisi puis on mettra à jour 
        // l'attribut books
        let objBook = {items: [] }
      
        for (const key in letBooks.items) {
          if (letBooks.items.hasOwnProperty(key)) {
            const element = letBooks.items[key];
            //Ajoute des couverture aux livres sans
            if (element.volumeInfo.imageLinks == undefined) {
              element.volumeInfo.imageLinks = {thumbnail: 'https://dummyimage.com/254x320/000/fff.jpg&text=No+data'};
            }
            if (element.volumeInfo.categories == categorySelected) { 
              objBook.items.push(element);
              this.books = objBook;
            }          
          }          
        }   
      
      });
  
    }       
  }


  //Recherche de livre correspondant à la valeur entrées
  submit(value : string){
    
    //Tableau qui contiendra des mots clés comme le nom de l'auteur, categorie, titre
    let keyWords = [];
    //Tableau qui contiendra tous les objets book de la recherche
    let objBook = {items: [] };
    //Tableau qui contiendra tous les objets book de la recherche sans doublons
    //où on ajoutera la key volumeInfo avec l'objet du livre en value
    let objBookVolume = {items: [] };

    let regex = new RegExp("\\b\\w*"+value+"\\w*\\b", 'gi'); 

    this.booksService.getAll(this.page)
      .then( books  => { 
        this.books = books;    
        let letBooks = this.books;

        for (const key in letBooks.items) {
          if (letBooks.items.hasOwnProperty(key)) {
            const element = letBooks.items[key];

            //Ajoute des couverture aux livres sans
            if (element.volumeInfo.imageLinks == undefined) {
              element.volumeInfo.imageLinks = {thumbnail: 'https://dummyimage.com/254x320/000/fff.jpg&text=No+data'};
            }
          
            //Ajout des titres dans le tableaux de mot clés
            keyWords.push(element.volumeInfo.title);
      
            //Ajout des auteurs dans le tableaux de mot clés
            if (typeof element.volumeInfo.authors === "object") {
              element.volumeInfo.authors.forEach(e => {
                keyWords.push(e);              
              });              
            }
            //Ajout des categories dans le tableaux de mot clés
            if (typeof element.volumeInfo.categories === "object") {
              element.volumeInfo.categories.forEach(e => {
                keyWords.push(e); 
              });
            }            
            //On test si il y a un resultat en testant la valeur entré et la regex
            //Puis si vrai on ajoute l'objet dans le tableau objBook
            for (let i = 0; i < keyWords.length; i++) {  
              if (regex.test(keyWords[i])) {                
                if (element.volumeInfo.title == keyWords[i] || element.volumeInfo.authors == keyWords[i] || element.volumeInfo.categories == keyWords[i]) {
                  objBook.items.push(element.volumeInfo);
                }
              }
            }
          }
        }

        //Supprime les doublons
        objBook.items = Array.from( new Set(objBook.items) );        
        //Création du tableau avec la key volumeInfo pour pouvoir l'utiliser sans changé le template
        objBook.items.forEach(element => {          
          objBookVolume.items.push({ volumeInfo : element});
        });
        this.books = objBookVolume;
      });
      
        

  }
  
}
