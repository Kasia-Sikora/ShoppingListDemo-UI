import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})

export class AuthorisationService {

  private user: any;
  private token: string;
  private errorMessage: string;

  setUser(user: any) {
    console.log(user);
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  getErrorMessage(){
    return this.errorMessage;
  }
}
