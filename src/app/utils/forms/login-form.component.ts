import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ModalService} from '../modal';
import {AuthorisationService} from './authorisation.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})

export class UserLoginComponent implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  constructor(private parent: ModalService,
              private fb: FormBuilder, private http: HttpClient,
              private authorisationService: AuthorisationService,
              private router: Router) {
  }

  error: HttpErrorResponse;
  errorMessage: string;

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
              }
            );
            this.form.reset();
            this.parent.close('login-modal');
            this.router.navigate(['/recipes']);
          }
        },
        (error) => {
          console.log(error.status);
          if (error.status === 403){
            this.errorMessage = 'Invalid data';
          } else {
            this.error = error;
          }
        }
      );
    } else {
      this.errorMessage = this.authorisationService.getErrorMessage();
    }
  }
}
