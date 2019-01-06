import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'ebc-submit',
  templateUrl: './submit.page.html',
  styleUrls: ['./submit.page.scss'],
})
export class SubmitPage implements OnInit {
  stepOptions: SwiperOptions = {
    autoHeight: true,
    centeredSlides: true,
  };

  constructor() {}

  ngOnInit() {}
}
