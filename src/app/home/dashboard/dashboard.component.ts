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
  changeStyle(name: string) {
    const list = document.getElementsByClassName('nav-link');
    for (let i = 0; i < list.length; i++){
      list[i].classList.remove('active');
      list[i].setAttribute('aria-selected', String(false));
    }
    const navbar = document.getElementById(name);
    navbar.classList.add('active');
    navbar.setAttribute('aria-selected', String(true));
  }
}
