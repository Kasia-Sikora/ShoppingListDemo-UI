import {Component, OnInit} from '@angular/core';
import {AuthorisationService} from '../../authorisation/authorisation.service';
import {ActivatedRoute} from '@angular/router';
import {ModalService} from '../../modal';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {UserLoginComponent} from './login-form.component';

@Component({
  templateUrl: './confirm-registration.component.html',
  providers: [UserLoginComponent]
})

export class ConfirmRegistrationComponent implements OnInit {

  token: string;

  constructor(private authorisationService: AuthorisationService,
              private route: ActivatedRoute,
              private modalService: ModalService,
              private http: HttpClient,
              private userLoginComponent: UserLoginComponent) {
  }

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token');
    if (token) {
      this.http.post(environment.apiUrl + 'activate', token, {observe: 'response'}).subscribe(
        (response: HttpResponse<any>) => {
          this.authorisationService.setVerificationMessage('Rejestracja przebiegła pomyślnie.');
          this.modalService.open('login-modal');
        });
    }
  }
}
