import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events, ToastController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authStatus: string = null;
  authType: string = 'N/A';
  myApi: string = 'https://ebc.beezleeart.com';
  isAuthError: boolean = false;

  constructor(
    private events: Events,
    private fireAuth: AngularFireAuth,
    private http: HttpClient,
    private storage: Storage,
    private toast: ToastController
  ) {}

  async accountMade(mess: string) {
    const made = await this.toast.create({
      message: mess,
      position: 'top',
      duration: 2500
    });

    made.onDidDismiss().then(() => this.events.publish('toast-dismiss'));

    made.present();
  }

  authGood(res) {
    this.authStatus = res['statusText'];
    this.authType = res.data.token_type == 'Anonymous' ? 'Anonymous' : 'Token';
    this.isAuthError = false;
    this.storage.set('auth', true);
    this.events.publish('login');
  }

  authErr(err) {
    this.authStatus = err['statusText'];
    this.authType = 'Fail';
    this.isAuthError = true;
    this.storage.set('auth', false);
  }

  createUser(userData) {
    return this.http.post(`${this.myApi}/api/auth/signup`, userData);
  }

  login(email: string, password: string) {
    return from(this.fireAuth.auth.signInWithEmailAndPassword(email, password));
  }

  logout() {
    return this.fireAuth.auth.signOut();
  }
}
