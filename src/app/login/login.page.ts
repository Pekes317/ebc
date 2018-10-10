import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthService } from '../providers/auth.service';
import { FormHandlerService } from '../providers/form-handler.service';
import { UsersDataService } from '../providers/users-data.service';
import { LoginUser } from '../state/user-store/actions/user.actions';
import * as fromUser from '../state/user-store/reducers';

@Component({
  selector: 'ebc-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements DoCheck, OnInit {
  isAuthError: boolean = false;
  newRun: boolean = true;
  signUp: string = 'create-account';
  loginForm: FormGroup;
  username: FormControl = new FormControl('', [
    Validators.required,
    this.form.emailValidator
  ]);
  password: FormControl = new FormControl('', Validators.required);
  signed: boolean;
  year: number = new Date().getFullYear();

  constructor(
    private authUser: AuthService,
    public fireAuth: AngularFireAuth,
    public form: FormHandlerService,
    public user: UsersDataService,
    private alert: AlertController,
    private router: Router,
    private store: Store<fromUser.State>,
    private toast: ToastController
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  ngDoCheck() {
    this.isAuthError = this.authUser.isAuthError;
  }
  
  openPage(page: string) {
    this.router.navigate([page]);
  }

  async resetPass() {
    const sets = await this.alert.create({
      header: 'Reset Password',
      message: 'Enter Email to Recieve a Password Reset Link',
      inputs: [
        {
          name: 'username',
          placeholder: 'Email',
          type: 'email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'reset-cancel'
        },
        {
          text: 'Submit',
          handler: data => {
            let email = data.username;
            this.sendReset(email);
          }
        }
      ]
    });
    sets.present();
  }

  async resetVerify(mess) {
    const resVerify = await this.toast.create({
      message: mess,
      position: 'top',
      duration: 3000
    });
    resVerify.present();
  }

  signIn(login) {
    let auth = login.value;
    this.store.dispatch(new LoginUser(auth));
    this.loginForm.reset();
  }

  private sendReset(email: string) {
    this.fireAuth.auth
      .sendPasswordResetEmail(email)
      .then(res => {
        console.log(res);
        this.resetVerify('Check Your Email for Password Reset');
      })
      .catch(err => {
        this.resetVerify('That User does not exist. Please Try again.');
        console.log(err);
      });
  }
}
