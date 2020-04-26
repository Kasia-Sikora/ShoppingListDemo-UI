import {Injectable} from '@angular/core';
import {AuthorisationService} from './forms/authorisation.service';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private authorisationService: AuthorisationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req instanceof HttpRequest) {
      if (this.authorisationService.getToken() != null) {
          req = req.clone({ setHeaders: { Authorization: `${this.authorisationService.getToken()}` }});
      }
    }
    return next.handle(req);
  }
}
