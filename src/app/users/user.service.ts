import {Injectable} from '@angular/core';
import {IUser} from './user';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
// @ts-ignore
import {EnvService} from '../env.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient, private env: EnvService){
    if (env.enableDebug) {
      console.log('Debug mode enabled!');
    }
  }


  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.userUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage =  '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
