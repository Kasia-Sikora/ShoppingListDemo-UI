import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../utils/modal';
import {AuthorisationService} from '../../utils/authorisation/authorisation.service';
import {Router} from '@angular/router';
import {IUser} from '../../users/user';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  pageTitle = 'Stuff';
  user$: Observable<IUser>;

  constructor(private modalService: ModalService, private authorisationService: AuthorisationService,
              private router: Router) {
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  // TODO one user have to refresh whole page after logout to login another user
  logout() {
    this.authorisationService.setUser(null);
    this.authorisationService.setToken(null);
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    this.user$ = this.authorisationService.getUser();
  }
}
