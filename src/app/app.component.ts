import {Component} from '@angular/core';
import {ModalService} from './utils/modal';
import {AuthorisationService} from './utils/forms/authorisation.service';

@Component({
  templateUrl: './app.component.html',
  selector: 'app-root',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  pageTitle = 'Stuff';

  bodyText: string;
  user: any;


  constructor(private modalService: ModalService, private authorisationService: AuthorisationService) {
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  getUser() {
    return this.authorisationService.getUser();
  }

  logout() {
    this.authorisationService.setUser(null);
  }
}
