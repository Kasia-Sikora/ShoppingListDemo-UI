import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-register-form',
  templateUrl: './registration-form.component.html',
  // styleUrls: ['./login-form.component.css']
})

export class UserRegistrationComponent implements OnInit {
  form: FormGroup;

  constructor(public fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      login: [''],
      password: [''],
      email: [''],

    });
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
    console.log(this.form.getRawValue());

    this.http.post('http://localhost:8080/users', formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
}
