import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ModalService} from '../modal';
import {AuthorisationService} from './authorisation.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './registration-form.component.html',
})

export class UserRegistrationComponent implements OnInit {

  constructor(@Inject(ModalService) private parent: ModalService,
              @Inject(AuthorisationService)private authorisationService: AuthorisationService,
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
  postUrl: 'http://localhost:8080/users';

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
    const formData: any = new FormData();
    formData.append('login', this.regForm.get('login').value);
    formData.append('password', this.regForm.get('password').value);
    formData.append('email', this.regForm.get('email').value);
    // formData.append('picture', this.form.get('picture').value);

    if (this.regForm.valid) {
        this.http.post(this.postUrl, formData).subscribe(
        (response) => {
          console.log(response);
          this.isDataValid = true;
          this.authorisationService.setUser(response);
          this.regForm.reset();
          this.parent.close('reg-modal');
        },
        (error) => {
          this.error = error;
          console.log(error);
          this.isDataValid = false;
        }
      );
    } else {
      this.errorMessage = 'Invalid Data';
    }
  }
}
