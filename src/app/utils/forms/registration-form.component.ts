import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-register-form',
  templateUrl: './registration-form.component.html',
  // styleUrls: ['./login-form.component.css']
})

export class UserRegistrationComponent implements OnInit {

  form = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.minLength(6)]],
  });

  error: HttpErrorResponse;
  errorMessage: string;

  constructor(private fb: FormBuilder, private http: HttpClient) {
  }

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
    formData.append('login', this.form.get('login').value);
    formData.append('password', this.form.get('password').value);
    formData.append('email', this.form.get('email').value);
    // formData.append('picture', this.form.get('picture').value);
    if (this.form.valid) {

      this.http.post('http://localhost:8080/users', formData).subscribe(
        (response) => console.log(response),
        (error) => {
          this.error = error;
          console.log(error);
        }
      );
    } else {
      this.errorMessage = 'Invalid Data';
    }
  }
}
