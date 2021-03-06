import {Injectable} from '@angular/core';
import {AuthorisationService} from './authorisation.service';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private authorisationService: AuthorisationService) {
  }

  //
  // private handleAuthError(err: HttpErrorResponse): Observable<any> {
  //   // handle your auth error or rethrow
  //   if (err.status === 401 || err.status === 403) {
  //     // navigate /delete cookies or whatever
  //     // if you've caught / handled the error, you don't want to rethrow it unless you also want
  //     // downstream consumers to have to handle it as well.
  //     this.authorisationService.setErrorMessage('Invalid data.');
  //     return of('Invalid data'); // or EMPTY may be appropriate here
  //   }
  //   return throwError(err);
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req instanceof HttpRequest) {
      if (this.authorisationService.getToken() != null) {
        req = req.clone({
          setHeaders: {
            Authorization: `${this.authorisationService.getToken()}`
          }
        });
      }
    }
    return next.handle(req);
  }
}
