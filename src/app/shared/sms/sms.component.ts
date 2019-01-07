import {
  Component,
  DoCheck,
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
  selector: 'ebc-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss']
})
export class SmsComponent implements OnInit, DoCheck {
  @Input()
  set: ShareInput;
  @Input()
  disable: boolean;
  @Output()
  method: EventEmitter<string> = new EventEmitter();

  avail = true;
  phone: FormControl = new FormControl('', [
    this.form.phoneValidator,
    Validators.required
  ]);
  smsField = '';
  smsForm: FormGroup;
  smsText: FormControl = new FormControl('');

  constructor(
    private form: FormHandlerService,
    private social: SocialSharing
  ) {}

  ngOnInit() {
    this.smsForm = new FormGroup({
      phone: this.phone,
      smsText: this.smsText
    });

    if (this.set.messText !== undefined) {
      this.smsText.setValue(this.set.messText);
    }
  }

  ngDoCheck() {
    this.avail = this.disable ? this.disable : !this.phone.valid;
  }

  customPhone(number: { value: string }) {
    this.phone.setValue(number.value);
  }

  sendSms(form) {
    const mySms = form.value;
    const link: string = this.set.ebcUrl;
    const body = `${mySms['smsText']} ${link}`;

    this.social
      .shareViaSMS(body, mySms.phone)
      .then(() => this.method.emit('SMS Text'))
      .catch(err => console.log(err, 'Fail'));
  }
}
