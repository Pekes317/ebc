import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PictureEffects } from './picture.effects';

describe('PictureEffects', () => {
  let actions$: Observable<any>;
  let effects: PictureEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PictureEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(PictureEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
