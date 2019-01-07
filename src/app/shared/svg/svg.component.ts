import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { Platform } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';

import { Item } from '../../state/item-store/models/item.model';

@Component({
  selector: 'ebc-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss']
})
export class SvgComponent implements AfterViewInit, OnInit {
  @ViewChild('myItem')
  myItem: ElementRef;
  @Input()
  formFactor: string;
  @Input()
  item: Item;
  @Input()
  set itemMedia(media: string) {
    this.svg = this.dom.bypassSecurityTrustHtml(media);
  }

  svg: SafeHtml;
  isImg: RegExp = new RegExp('http*', 'i');

  constructor(
    private appAvail: AppAvailability,
    private appBrowser: InAppBrowser,
    private dom: DomSanitizer,
    private launch: LaunchNavigator,
    private platform: Platform,
    private render: Renderer2
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.clickCheck();
  }

  clickCheck() {
    let app = {};
    if (this.item.ready) {
      const my = this.myItem.nativeElement;

      this.render.listen(my, 'click', (e: Event) => {
        const clicked = e.target['parentNode'];
        if (clicked['href']) {
          const link = clicked['href']['baseVal'];
          const attr = Array.from(clicked['attributes']);
          const data = attr[2]['value'];
          const insta = new RegExp('w$');
          if (e.target['id'] === 'address') {
            e.preventDefault();
            this.launch
              .navigate(data)
              .then(success => console.log('Launched navigator', success))
              .catch(err => console.log('Error launching navigator', err));
          }
          if (link.includes('facebook')) {
            e.preventDefault();
            app = {
              appName: 'fb',
              url: link,
              appLink: `fb://${data}`
            };
            this.isAvail(app);
          }
          if (
            e.target['id'] === 'instagram' ||
            e.target['id'] === 'ebc' ||
            e.target['id'] === `insta${insta}`
          ) {
            e.preventDefault();
            app = {
              appName: 'dm',
              url: link,
              appLink: `instagram://${data}`
            };
            this.isAvail(app);
          }
        }
      });
    }
  }

  isAvail(app: Object) {
    const myApp: Object = app;
    let fb: string;
    let dm: string;

    if (this.platform.is('ios')) {
      fb = 'fb://';
      dm = 'instagram://';
    } else if (this.platform.is('android')) {
      fb = 'com.facebook.katana';
      dm = 'com.instagram.android';
    }
    if (myApp['appName'] === 'fb') {
      Object.defineProperty(myApp, 'check', {
        value: fb
      });
    }
    if (myApp['appName'] === 'dm') {
      Object.defineProperty(myApp, 'check', {
        value: dm
      });
    }

    this.appAvail
      .check(myApp['check'])
      .then(() => this.appBrowser.create(myApp['appLink'], '_system'))
      .catch(() => this.appBrowser.create(myApp['url'], '_system'));
  }
}
