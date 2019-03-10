import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  myApi = 'https://ebc.beezleeart.com';

  constructor(
    public events: Events,
    public http: HttpClient,
    public storage: Storage,
  ) {}

  notifyEnroll(token: string) {
    const deviceData = {
      token: token,
    };

    this.http
      .post(`${this.myApi}/api/mobile/register`, deviceData)
      .subscribe((id: number) => this.saveDev(id), err => console.log(err));
  }

  notifyRemove(id: string) {
    this.storage
      .get('device')
      .then(() => {
        this.http
          .delete(`${this.myApi}/api/obj/equipment/${id}`)
          .subscribe(() => this.removeDev());
      })
      .catch(err => console.log(err));
  }

  notifyUpdate(token: string) {
    this.storage
      .get('device')
      .then(id => this.upDev(id, token))
      .catch(err => console.log(err));
  }

  updateUser(newUser: any) {
    return this.http.post(`${this.myApi}/api/auth/update`, newUser).pipe(
      catchError((err, caught) => {
        console.log(err);
        return caught;
      }),
    );
  }

  private removeDev() {
    this.storage
      .remove('device')
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  private saveDev(id: number) {
    this.storage
      .set('device', id)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  private upDev(id: number, data: string) {
    const newToken = {
      token: data,
    };
    console.log(newToken, id);
  }
}
