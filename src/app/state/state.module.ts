import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../../environments/environment';
import { RouterStateUtil } from './shared/router-state-util';
import { metaReducers, reducers } from './reducers';
import { ItemStoreModule } from './item-store/item-store.module';
import { UserStoreModule } from './user-store/user-store.module';

@NgModule({
  imports: [
    EffectsModule.forRoot([]),
    ItemStoreModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    UserStoreModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  declarations: []
})
export class StateModule { 
  constructor(@Optional() @SkipSelf() parentModule: StateModule) {
    if (parentModule) {
      throw new Error(
        'StateModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StateModule,
      providers: [
        { provide: RouterStateSerializer, useClass:  RouterStateUtil }
      ]
    };
  }
}
