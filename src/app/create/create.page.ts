import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Events, IonRouterOutlet } from '@ionic/angular';
import { Store } from '@ngrx/store';

import { FormHandlerService } from '../providers/form-handler.service';
import { NewUser } from '../models/user.model';
import { CreateUser } from '../state/user-store/actions/user.actions';
import * as fromUser from '../state/user-store/reducers';

@Component({
  selector: 'ebc-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss']
})
export class CreatePage implements OnInit {
  createError: boolean;
  createForm: FormGroup;
  verify: FormGroup;
  email: FormControl = new FormControl('', [
    Validators.required,
    this.form.emailValidator
  ]);
  displayName: FormControl = new FormControl('', Validators.required);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  confirmPassword: FormControl = new FormControl('', Validators.required);
  year: number = new Date().getFullYear();

  constructor(
    private events: Events,
    private form: FormHandlerService,
    private nav: IonRouterOutlet,
    private store: Store<fromUser.State>
  ) {}

  ngOnInit() {
    this.verify = new FormGroup(
      {
        password: this.password,
        confirmPassword: this.confirmPassword
      },
      this.form.areEqual
    );
    this.createForm = new FormGroup({
      email: this.email,
      displayName: this.displayName,
      verify: this.verify
    });

    this.events.subscribe('toast-dismiss', () => this.goBack());
  }

  createUser(create: FormGroup) {
    const dets = create.value;
    const pass = dets.verify;
    const user: NewUser = {
      disabled: false,
      displayName: dets.displayName,
      email: dets.email,
      emailVerified: true,
      password: pass.password,
      photoUrl: 'https://ebc.beezleeart.com/assets/img/user.svg'
    };
    this.store.dispatch(new CreateUser(user));
    this.createForm.reset();
  }

  goBack() {
    this.events.unsubscribe('toast-dismiss');
    this.nav.pop();
  }
}
