import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ModalService} from '../modal';
import {AuthorisationService} from './authorisation.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  // styleUrls: ['./login-form.component.css']
})

export class UserLoginComponent implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  error: HttpErrorResponse;
  errorMessage: string;


  constructor(@Inject(ModalService) private parent: ModalService,
              private fb: FormBuilder, private http: HttpClient,
              @Inject(AuthorisationService)private authorisationService: AuthorisationService) {
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
    formData.append('email', this.form.get('email').value);
    formData.append('password', this.form.get('password').value);
    // formData.append('picture', this.form.get('picture').value);
    if (this.form.valid) {

      this.http.post('http://localhost:8080/login', formData).subscribe(
        (response) => {
          console.log(response);
          this.authorisationService.setUser(response);
          this.form.reset();
          this.parent.close('login-modal');
        },
        (error) => {
          this.error = error;
          console.log(error);
        }
      );
    } else {
      this.errorMessage = 'Wrong login or password';
    }
  }
}
