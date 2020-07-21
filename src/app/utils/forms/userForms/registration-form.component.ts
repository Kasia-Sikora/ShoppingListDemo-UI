import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ModalService} from '../../modal';
import {AuthorisationService} from '../../authorisation/authorisation.service';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {CustomValidationService} from './custom-validation.service';


@Component({
  selector: 'app-register-form',
  templateUrl: './registration-form.component.html',
})

export class UserRegistrationComponent implements OnInit {

  constructor(private parent: ModalService,
              private authorisationService: AuthorisationService,
              private fb: FormBuilder, private http: HttpClient,
              private customValidator: CustomValidationService) {
  }

  regForm = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator(), Validators.minLength(6)])],
    confirmPassword: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email, Validators.minLength(6)]],
  }, {
    validator: this.customValidator.MustMatchPassword('password', 'confirmPassword')
  });

  error: HttpErrorResponse;
  errorMessage: string;
  isDataValid: boolean;

  ngOnInit() {
  }

  // uploadFile(event) {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   this.form.patchValue({
  //     avatar: file
  //   });
  //   this.form.get('picture').updateValueAndValidity();
  // }

  submitForm() {
    const reqData = {
      login: this.regForm.get('login').value,
      email: this.regForm.get('email').value,
      password: this.regForm.get('password').value,
      isEnabled: false,
    };

    if (this.regForm.valid) {
      this.http.post(environment.apiUrl + 'sign-up', reqData, {observe: 'response'}).subscribe(
        (response: HttpResponse<any>) => {
          this.isDataValid = true;
          const token = response.headers.get('Authorization');
          this.regForm.reset();
          this.parent.close('reg-modal');
          this.parent.open('info-modal');
        },
        (error) => {
          if (error.status === 403) {
            this.errorMessage = 'Nieprawidłowe dane.';
            this.isDataValid = false;
          } else {
            this.error = error;
            this.isDataValid = false;
          }
        }
      );
    } else {
      this.errorMessage = 'Nieprawidłowe dane.';
    }
  }

  closeModal(id: string) {
    this.parent.close(id);
  }
}
