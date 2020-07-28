import {Injectable} from '@angular/core';
import {IUser} from '../../users/user';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})

export class AuthorisationService {

  private user: IUser;
  private token: string;
  private errorMessage: string;
  private user$ = new BehaviorSubject<IUser>(null);
  private verificationMessage$ = new BehaviorSubject<string>(null);


  setVerificationMessage(message: string) {
    this.verificationMessage$.next(message);
  }

  getVerificationMessage() {
    return this.verificationMessage$;
  }

  setUser(user: any) {
    this.user = user;
    this.user$.next(user);
  }

  getUser() {
    return this.user$;
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return localStorage.getItem('token');
    // return this.token;
  }

  getErrorMessage() {
    return this.errorMessage;
  }

  getUserId(): number {
    if (this.user$.getValue() != null) {
      return this.user$.getValue().id;
    }
  }

}
