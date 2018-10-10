import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';

import { info } from './policy';

@Component({
  selector: 'ebc-private-policy',
  templateUrl: './private-policy.component.html',
  styleUrls: ['./private-policy.component.scss']
})
export class PrivatePolicyComponent implements OnInit {
  policy: SafeHtml;

  constructor(private modal: ModalController, private stanitize: DomSanitizer) {}

  ngOnInit() {
    this.policy = this.stanitize.bypassSecurityTrustHtml(info);
  }

  closeModal() {
    this.modal.dismiss();
  }
}
