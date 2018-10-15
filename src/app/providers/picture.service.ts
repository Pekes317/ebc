import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActionSheetController,
  LoadingController,
  ToastController
} from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';

import { UploadImg } from '../models/app.model';
import { Observer, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  myApi: string = 'https://ebc.beezleeart.com';
  myLoader: HTMLIonLoadingElement;
  selectPic: Subject<string> = new Subject();

  constructor(
    public camera: Camera,
    public toast: ToastController,
    public action: ActionSheetController,
    public file: File,
    public http: HttpClient,
    public loader: LoadingController
  ) {}

  async getPics() {
    let actionPics = await this.action.create({
      header: 'Get Pictures',
      buttons: [
        {
          text: 'Take Picture',
          icon: 'camera',
          handler: () => {
            console.log('Camera Open');
            this.picReturn(1);
          }
        },
        {
          text: 'Get Picture',
          icon: 'images',
          handler: () => {
            console.log('Gallery Open');
            this.picReturn(2);
          }
        },
        {
          text: 'Cancel',
          icon: 'close-circle',
          role: 'cancel',
          cssClass: 'reset-cancel',
          handler: () => {
            console.log('Cancel');
          }
        }
      ]
    });
    actionPics.present();
  }

  picReturn(src: number) {
    const opts: CameraOptions = {
      allowEdit: true,
      destinationType: 0,
      quality: 100,
      sourceType: src,
      saveToPhotoAlbum: true,
      encodingType: 1
    };
    this.camera
      .getPicture(opts)
      .then(imageData => {
        const img = `data:${this.getMimeType(imageData)};base64,${imageData}`;
        this.selectPic.next(img);
      })
      .catch(err => {
        console.log(err);
      });
  }

  async picSaved() {
    let myImg = await this.toast.create({
      message: 'Your Profile Pic has been Saved',
      position: 'top',
      duration: 2000
    });

    myImg.onDidDismiss().then(() => this.myLoader.dismiss());
    myImg.present();
  }

  uploadImg(image: UploadImg) {
    this.uploading();
    return this.http.request('POST', `${this.myApi}/api/upload`, {
      body: image
    });
  }

  async uploading() {
    this.myLoader = await this.loader.create({
      message: 'Uploading File...'
    });

    this.myLoader.present();
  }

  private getMimeType(base64: string) {
    let startChar = base64.charAt(0);

    switch (startChar) {
      case '/':
        return 'image/jpeg';
      case 'R':
        return 'image/gif';
      case 'i':
        return 'image/png';
      default:
        return 'image/png';
    }
  }
}
