import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { metaReducers, reducers } from './reducers';
import { ItemEffects } from './effects/item.effects';

@NgModule({
  imports: [
    EffectsModule.forFeature([ItemEffects]),
    StoreModule.forFeature('itemStore', reducers, { metaReducers })
  ]
})
export class ItemStoreModule {}
