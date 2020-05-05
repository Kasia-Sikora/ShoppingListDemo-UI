import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ModalService} from '../modal';
import {AuthorisationService} from './authorisation.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './registration-form.component.html',
})

export class UserRegistrationComponent implements OnInit {

  constructor(private parent: ModalService,
              private authorisationService: AuthorisationService,
              private fb: FormBuilder, private http: HttpClient) {
  }

  regForm = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.minLength(6)]],
  });

  error: HttpErrorResponse;
  errorMessage: string;
  isDataValid: boolean;
  postUrl: 'http://localhost:8080/sign-up';

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
      password: this.regForm.get('password').value
    };

    if (this.regForm.valid) {
      this.http.post('http://localhost:8080/sign-up', reqData).subscribe(
        (response) => {
          console.log(response);
          this.isDataValid = true;
          this.authorisationService.setUser(response);
          this.regForm.reset();
          this.parent.close('reg-modal');
        },
        (error) => {
          if (error.status === 403) {
            this.errorMessage = 'Invalid data';
            this.isDataValid = false;
          } else {
            this.error = error;
            console.log(error);
            this.isDataValid = false;
          }
        }
      );
    } else {
      this.errorMessage = 'Invalid data';
    }
  }
}
