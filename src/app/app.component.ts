import {Component} from '@angular/core';
import {AuthorisationService} from './utils/authorisation/authorisation.service';
import {environment} from '../environments/environment';

@Component({
  templateUrl: './app.component.html',
  selector: 'app-root',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  pageTitle = 'Stuff';
  public apiUrl: string;

  constructor(private authorisationService: AuthorisationService) {
    console.log(environment.production);
  }

  getUser() {
    return this.authorisationService.getUser();
  }
}
