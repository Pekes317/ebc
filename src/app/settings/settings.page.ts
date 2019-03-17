import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';

import { NotifyAppSetting } from '../state/actions/app-setting.actions';
import * as fromRoot from '../state/reducers';

@Component({
  selector: 'ebc-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  appForm: FormGroup;
  appSettings = this.store.pipe(select(fromRoot.getSettings));
  notifyControl: FormControl = new FormControl('');

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.appForm = new FormGroup({
      notify: this.notifyControl,
    });

    this.setControls();
  }

  saveSetting() {
    this.store.dispatch(new NotifyAppSetting(this.notifyControl.value));
  }

  private setControls() {
    this.appSettings.subscribe(settings => {
      this.notifyControl.setValue(settings.notify);
    });
  }
}
