import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule }from '@angular/fire/auth';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { creds } from './util/ebc-client';
import { ProvidersModule } from './providers/providers.module';
import { StateModule } from './state/state.module';

// const config = {
//   mode: 'md',
//   scrollAssist: false,
//   tabsHighlight: true,
//   tabsHideOnSubPages: true
// }

@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularFireModule.initializeApp(creds),
    AngularFireAuthModule,
    AppRoutingModule,
    BrowserModule,
    ComponentsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    ProvidersModule.forRoot(),
    StateModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
