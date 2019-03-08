import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { FormDataEffects } from './form-data.effects';

describe('FormDataEffects', () => {
  let actions$: Observable<any>;
  let effects: FormDataEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormDataEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(FormDataEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
