import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ebc-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input()
  set outlet(name: string) {
    this.outlets = {
      card: `${name}-cards`,
      flyer: `${name}-flyers`
    };
  }
  @Input()
  set segment(fragment: string) {
    this.path = fragment;
  }

  @Input()
  listType: string;

  protected outlets = {
    card: 'ebc-cards',
    flyer: 'ebc-flyers'
  };
  protected path: string = 'my-stuff';

  constructor() {}

  ngOnInit() {}

  tabAction(name: string) {
    console.log(name);
  }
}
