import { TestBed } from '@angular/core/testing';

import { SetorServiceService } from './setor.service';

describe('SetorServiceService', () => {
  let service: SetorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
