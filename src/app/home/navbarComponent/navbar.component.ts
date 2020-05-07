import { Component, OnInit } from '@angular/core';
import {ModalService} from '../../utils/modal';
import {AuthorisationService} from '../../utils/forms/authorisation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  pageTitle = 'Stuff';

  constructor(private modalService: ModalService, private authorisationService: AuthorisationService,
              private router: Router) {
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

  // TODO one user have to refresh whole page after logout to login another user
  logout() {
    this.authorisationService.setUser(null);
    this.authorisationService.setToken(null);
    this.router.navigate(['']);
  }

  ngOnInit(): void {
  }

}
