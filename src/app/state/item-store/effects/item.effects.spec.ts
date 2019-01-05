import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ItemEffects } from './item.effects';

describe('ItemsEffects', () => {
  const actions$: Observable<any> = new Observable();
  let effects: ItemEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.get(ItemEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
