import { Component } from '@angular/core';
import { AlertController, IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';

import { ItemBase } from './base.component';
import { BackandItemService } from '../../../providers';

@IonicPage({
	name: 'sample-flyers',
	segment: 'sample-flyers'
})
@Component({
	selector: 'page-items',
	templateUrl: 'base.component.html'
})

export class SFlysPage extends ItemBase {
	dbTable = 'samples';
	delete = false;
	itemType = 'SampleFlyer';
	title: string = 'Sample Flyers';
	type = 'Flyer';

	constructor(public alert: AlertController, public backand: BackandItemService,
		public modal: ModalController, public nav: NavController, public toast: ToastController) {
		super(alert, backand, modal, nav, toast);
	}

	ngOnInit() {
		super.ngOnInit();
	}

	ngDoCheck() {
		super.ngDoCheck();
	}
}