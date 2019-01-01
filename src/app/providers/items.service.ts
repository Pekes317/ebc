import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  myApi = 'https://ebc.beezleeart.com';

  constructor(private http: HttpClient, private events: Events) {}

  createItem(newItem: any) {
    return this.http.post(`${this.myApi}/api/mobile/create`, newItem);
  }

  deleteItem(obj: string, id: number) {
    return this.http.delete(`${this.myApi}/api/obj/${obj}/${id}`);
  }

  getList(table: string, type: string) {
    const path: string =
      table === 'item'
        ? `${type.toLowerCase()}`
        : `${table}/${type.toLowerCase()}`;
    return this.http.get(`${this.myApi}/api/mobile/${path}`);
  }

  getOne(id: number) {
    return this.http.get(`${this.myApi}/api/obj/items/${id}`);
  }

  getMedia(path: string) {
    return this.http.get(`${this.myApi}/api/media`, { params: { url: path } });
  }

  updateList() {
    return this.events;
  }
}
