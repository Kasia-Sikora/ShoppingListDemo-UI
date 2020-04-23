import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})

export class AuthorisationService {

  private user: any;

  setUser(user: any) {
    console.log(user);
    this.user = user;
  }

  getUser() {
    return this.user;
  }

}
