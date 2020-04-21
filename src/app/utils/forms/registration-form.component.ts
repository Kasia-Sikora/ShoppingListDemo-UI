import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AppComponent} from '../../app.component';
import {ModalService} from '../modal';

@Component({
  selector: 'app-register-form',
  templateUrl: './registration-form.component.html',
  // styleUrls: ['./login-form.component.css']
})

export class UserRegistrationComponent implements OnInit {

  constructor(@Inject(ModalService) private parent: ModalService, private fb: FormBuilder, private http: HttpClient) {
  }

  regForm = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.minLength(6)]],
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
    const formData: any = new FormData();
    formData.append('login', this.regForm.get('login').value);
    formData.append('password', this.regForm.get('password').value);
    formData.append('email', this.regForm.get('email').value);
    // formData.append('picture', this.form.get('picture').value);
    if (this.regForm.valid) {

      this.http.post('http://localhost:8080/users', formData).subscribe(
        (response) => {
          console.log(response);
          this.isDataValid = true;
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
