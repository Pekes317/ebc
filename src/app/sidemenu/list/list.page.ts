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
    const types = {
      'my-stuff': List.my,
      'samples': List.samp,
      'templates': List.temp,
    }
    this.listType = types[current];
  }
}
