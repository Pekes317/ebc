import { Component, DoCheck, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DetailPage } from '../';
import { EbcProduct } from '../../';
import { BackandService } from '../../../../services';

export class ItemBase implements DoCheck, OnInit {
  public dbTable: string;
  public itemType: string;
  private items: Array<EbcProduct>;
  private none: boolean;


  constructor(public backand: BackandService, public nav: NavController) {

  }

  ngDoCheck() {
    if (this.items == undefined || this.items.length == 0) {
      this.none = true;
    } else {
      this.none = false;
    }
  }

  ngOnInit() {
    this.myItems();
  }

  goTo(id: number) {
    let item = {
      index: id,
      table: this.dbTable
    };
    this.nav.push(DetailPage, item);
  }

  myItems() {
    let items = this.itemType;
    this.backand.getItems(items).subscribe(
      data => {
        this.items = data;
      },
      err => {
        var errorMessage = this.backand.extractErrorMessage(err);
        this.backand.authStatus = `Error: ${errorMessage}`;
        this.backand.logError(err);
      });
  }
}