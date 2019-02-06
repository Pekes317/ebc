import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TempsEffects } from './effects/temps.effects';
import { metaReducers, reducers } from './reducers';

@NgModule({
  imports: [
    EffectsModule.forFeature([TempsEffects]),
    StoreModule.forFeature('formStore', reducers, { metaReducers }),
  ],
})
export class FormStoreModule {}
