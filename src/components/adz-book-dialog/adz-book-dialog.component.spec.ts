import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdzBookDialogComponent } from './adz-book-dialog.component';

describe('AdzBookDialogComponent', () => {
  let component: AdzBookDialogComponent;
  let fixture: ComponentFixture<AdzBookDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdzBookDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdzBookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
