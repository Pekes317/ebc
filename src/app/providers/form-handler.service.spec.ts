import { TestBed, inject } from '@angular/core/testing';

import { FormHandlerService } from './form-handler.service';

describe('FormHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormHandlerService]
    });
  });

  it('should be created', inject(
    [FormHandlerService],
    (service: FormHandlerService) => {
      expect(service).toBeTruthy();
    }
  ));
});
