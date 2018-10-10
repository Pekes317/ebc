import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { metaReducers, reducers } from './reducers';
import { PictureEffects } from './effects/picture.effects';
import { UserEffects } from './effects/user.effects';

@NgModule({
  imports: [
    EffectsModule.forFeature([PictureEffects, UserEffects]),
    StoreModule.forFeature('userStore', reducers, { metaReducers })
  ],
  declarations: []
})
export class UserStoreModule {}
