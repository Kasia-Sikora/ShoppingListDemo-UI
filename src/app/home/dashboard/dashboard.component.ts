import { Component, OnInit } from '@angular/core';
import {AuthorisationService} from '../../utils/authorisation/authorisation.service';
import {IUser} from '../../users/user';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  // user$: Observable<IUser>;
  //
  // constructor(private authorisationService: AuthorisationService) {
  // }
  //
  // ngOnInit(): void {
  //   this.user$ = this.authorisationService.getUser();
  // }
}
