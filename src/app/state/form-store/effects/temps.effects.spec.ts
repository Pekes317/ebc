import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TempsEffects } from './temps.effects';

describe('TempsEffects', () => {
  const actions$: Observable<any> = new Observable();
  let effects: TempsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TempsEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.get(TempsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
