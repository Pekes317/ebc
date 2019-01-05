import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Contacts, Contact } from '@ionic-native/contacts/ngx';

@Component({
  selector: 'ebc-share-buttons',
  templateUrl: './share-buttons.component.html',
  styleUrls: ['./share-buttons.component.scss']
})
export class ShareButtonsComponent implements OnInit {
  @Output()
  selected: EventEmitter<Contact> = new EventEmitter();
  @Output()
  mode: EventEmitter<string> = new EventEmitter();

  constructor(private contacts: Contacts) {} // tslint:disable-line:deprecation

  ngOnInit() {}

  getContact() {
    this.contacts.pickContact().then(contact => {
      this.selected.emit(contact);
    });
  }

  shareType(detail: { value: string }) {
    this.mode.emit(detail.value);
  }
}
