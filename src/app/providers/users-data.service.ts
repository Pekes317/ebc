import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Firebase } from '@ionic-native/firebase/ngx';
import { catchError } from 'rxjs/operators';

import { StorageKeys } from '../util/config';

@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  myApi = 'https://ebc.beezleeart.com';

  constructor(
    public firebase: Firebase,
    public http: HttpClient,
    public storage: Storage,
  ) {}

  async checkDevice() {
    let device = await this.storage.get(StorageKeys.notify);
    if (device === undefined || device === null) {
      device = true;
      await this.storage.set(StorageKeys.notify, true);
    }
    return device;
  }

  notifyEnroll(token: string) {
    const deviceData = {
      token: token,
    };

    this.http
      .post(`${this.myApi}/api/mobile/register`, deviceData)
      .subscribe(
        (id: number) => this.saveDev(id, token),
        err => this.firebase.logError(err),
      );
  }

  notifyRemove() {
    this.storage
      .get(StorageKeys.device)
      .then(device => {
        this.http
          .delete(`${this.myApi}/api/obj/equipment/${device.id}`)
          .subscribe(() => this.removeDev());
      })
      .catch(err => this.firebase.logError(err));
  }

  notifyUpdate(token: string) {
    this.storage
      .get(StorageKeys.device)
      .then(id => this.saveDev(id, token))
      .catch(err => this.firebase.logError(err));
  }

  async setNotify(isOn: boolean) {
    await this.storage.set(StorageKeys.notify, isOn);
    if (isOn) {
      await this.notifyOn();
    }
  }

  updateUser(newUser: any) {
    return this.http.post(`${this.myApi}/api/auth/update`, newUser).pipe(
      catchError((err, caught) => {
        this.firebase.logError(err);
        return caught;
      }),
    );
  }

  private async notifyOn() {
    if (!this.firebase.hasPermission) {
      await this.firebase.grantPermission();
    }
    const token = await this.firebase.getToken();
    this.notifyEnroll(token);
  }

  private removeDev() {
    this.storage
      .remove(StorageKeys.device)
      .catch(err => this.firebase.logError(err));
  }

  private saveDev(id: number, token: string) {
    this.storage
      .set(StorageKeys.device, { id, token })
      .catch(err => this.firebase.logError(err));
  }
}
