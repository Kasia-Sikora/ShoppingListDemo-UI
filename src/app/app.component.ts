import {Component} from '@angular/core';
import {AuthorisationService} from './utils/forms/authorisation.service';

@Component({
  templateUrl: './app.component.html',
  selector: 'app-root',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  pageTitle = 'Stuff';

  constructor(private authorisationService: AuthorisationService) {
  }

  getUser() {
    return this.authorisationService.getUser();
  }
}
