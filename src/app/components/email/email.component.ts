import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { ShareInput } from '../../models/app.model';
import { FormHandlerService } from '../../providers/form-handler.service';

@Component({
  selector: 'ebc-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  @Input()
  set: ShareInput;
  @Input()
  disable: boolean;
  @Output()
  method: EventEmitter<string> = new EventEmitter();

  body: FormControl = new FormControl('');
  email: FormControl = new FormControl('', [
    this.form.emailValidator,
    Validators.required
  ]);
  emailField: string;
  emailForm: FormGroup;
  emailText: FormControl = new FormControl('');

  constructor(
    private form: FormHandlerService,
    private social: SocialSharing
  ) {}

  ngOnInit() {
    this.emailForm = new FormGroup({
      email: this.email,
      emailText: this.emailText,
      body: this.body
    });

    if (this.set.messText !== undefined) {
      this.emailText.setValue(this.set.messText);
    }
  }

  customEmail() {
    this.email.setValue(this.emailField);
  }

  sendEmail(form) {
    let myInput = form.value;
    let link: string = this.set.ebcUrl;
    let myEmail = `<p>${myInput['body']}</p> <p>${link}</p>`;

    this.social
      .shareViaEmail(myEmail, myInput['emailText'], myInput['email'])
      .then(() => this.method.emit('Email'))
      .catch(err => console.log(err, 'Fail'));
  }
}
