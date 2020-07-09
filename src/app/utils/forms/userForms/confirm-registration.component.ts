import {Component, OnInit} from '@angular/core';
import {AuthorisationService} from '../../authorisation/authorisation.service';
import {ActivatedRoute} from '@angular/router';
import {ModalService} from '../../modal';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';

@Component({
  templateUrl: './confirm-registration.component.html',
})

export class ConfirmRegistrationComponent implements OnInit {

  token: string;

  constructor(private authorisationService: AuthorisationService,
              private route: ActivatedRoute,
              private modalService: ModalService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token');
    if (token) {
      this.http.post(environment.apiUrl + 'activate', token, {observe: 'response'}).subscribe(
        (response: HttpResponse<any>) => {
            this.modalService.open('login-modal');
        });
    }
  }
}
