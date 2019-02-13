import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdzHomeBooksComponent } from './adz-home-books.component';

describe('AdzHomeBooksComponent', () => {
  let component: AdzHomeBooksComponent;
  let fixture: ComponentFixture<AdzHomeBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdzHomeBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdzHomeBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
