import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthUser } from '../../models/user.model';
import * as fromUser from '../../state/user-store/reducers';

@Component({
  selector: 'ebc-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  userData: Observable<AuthUser> = this.store.pipe(select(fromUser.selectUser));

  constructor(
    private store: Store<fromUser.UserState>,
    private route: Router
  ) {}

  ngOnInit() {}

  editProfile() {
    this.route.navigateByUrl('/sidemenu/edit');
  }
}
