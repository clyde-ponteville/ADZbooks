import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdzListBooksComponent } from './adz-list-books.component';

describe('ListBooksComponent', () => {
  let component: AdzListBooksComponent;
  let fixture: ComponentFixture<AdzListBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdzListBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdzListBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
