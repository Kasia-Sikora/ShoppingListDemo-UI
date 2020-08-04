import {Component, OnInit} from '@angular/core';
import {AuthorisationService} from './utils/authorisation/authorisation.service';
import {Observable} from 'rxjs';
import {IUser} from './users/user';

@Component({
  templateUrl: './app.component.html',
  selector: 'app-root',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit {
  pageTitle = 'Stuff';
  public apiUrl: string;

  user$: Observable<IUser>;

  constructor(private authorisationService: AuthorisationService) {
  }

  ngOnInit(): void {
    this.user$ = this.authorisationService.getUser();
  }
}
