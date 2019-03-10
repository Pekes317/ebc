import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AppSettingEffect } from './app-setting.effects';

describe('AppSettingsEffects', () => {
  const actions$: Observable<any> = new Observable();
  let effects: AppSettingEffect;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppSettingEffect, provideMockActions(() => actions$)],
    });

    effects = TestBed.get(AppSettingEffect);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
