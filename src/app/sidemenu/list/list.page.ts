import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { take } from 'rxjs/operators';

import { List } from '../../util/list.enum';

@Component({
  selector: 'ebc-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  fragment: string = 'my-stuff';
  listType: string = '';
  outlet = List;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.url
      .pipe(take(1))
      .subscribe((segment: Array<UrlSegment>) => this.setType(segment[0].path));
  }

  setType(current: string) {
    this.fragment = current;
    switch (current) {
      case 'my-stuff':
        this.listType = List.my;
        break;
      case 'samples':
        this.listType = List.samp;
        break;
      case 'templates':
        this.listType = List.temp;
        break;
    }
  }
}
