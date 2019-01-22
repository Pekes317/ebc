import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { metaReducers, reducers } from './reducers';

@NgModule({
  imports: [StoreModule.forFeature('formStore', reducers, { metaReducers })],
})
export class FormStoreModule {}
