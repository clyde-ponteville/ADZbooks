import { TestBed } from '@angular/core/testing';

import { AdzBooksService } from './adzbooks.service';

describe('AdzBooksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdzBooksService = TestBed.get(AdzBooksService);
    expect(service).toBeTruthy();
  });
});
