import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthorisationService} from '../../authorisation/authorisation.service';
import {ModalService} from '../../modal';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})

export class UserLoginComponent implements OnInit, OnDestroy {
  form = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],

  });

  constructor(private parent: ModalService,
              private fb: FormBuilder, private http: HttpClient,
              private authorisationService: AuthorisationService,
              private router: Router) {
  }

  error: HttpErrorResponse;
  errorMessage: string;
  verificationMessage$ = new Observable<string>();

  ngOnInit(): void {
    this.verificationMessage$ = this.authorisationService.getVerificationMessage();
  }


  // uploadFile(event) {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   this.form.patchValue({
  //     avatar: file
  //   });
  //   this.form.get('picture').updateValueAndValidity();
  // }

  submitForm() {
    const logData = {
      email: this.form.get('email').value,
      password: this.form.get('password').value
    };
    // formData.append('picture', this.form.get('picture').value);
    if (this.form.valid) {

      this.http.post(environment.apiUrl + 'login', logData, {observe: 'response'}).subscribe(
        (response: HttpResponse<any>) => {
          if (response != null) {
            const token = response.headers.get('Authorization');
            localStorage.setItem('token', token);
            this.authorisationService.setToken(token);
            this.http.get(environment.apiUrl + 'me').subscribe(
              (response2: HttpResponse<any>) => {
                this.authorisationService.setUser(response2);
                this.form.reset();
                this.error = null;
                this.errorMessage = null;
                this.parent.close('login-modal');
                this.router.navigate(['/recipes']);
              },
              (error) => {
                this.errorMessage = error.error;
              }
            );
          }
        },
        (error) => {
          if (error.status === 403) {
            this.errorMessage = 'Nieprawidłowy email lub hasło';
          } else {
            this.errorMessage = 'Nieprawidłowy email lub hasło';
          }
        },
      );
    } else {
      this.errorMessage = this.authorisationService.getErrorMessage();
    }
  }

  ngOnDestroy(): void {
  }

  getErrorMessage() {
    return this.errorMessage;
  }
}
