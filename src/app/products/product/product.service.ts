import {Injectable} from '@angular/core';
import {IProduct} from './product';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import {AuthorisationService} from '../../utils/forms/authorisation.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = environment.apiUrl + 'products';
  private removeProduct = environment.apiUrl + this.authorisationService.getUser().id + '/recipes';
  private httpOptions = {
    headers: new HttpHeaders({ header: 'Access-Control-Allow-Origin' })
  };

  constructor(private http: HttpClient, private authorisationService: AuthorisationService){  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError));
  }

  getProduct(id: number): Observable<IProduct | undefined> {
    return this.getProducts()
      .pipe(
        map((products: IProduct[]) => products.find(r => r.id === id))
      );
  }


  private handleError(err: HttpErrorResponse) {
    let errorMessage =  '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    return throwError(errorMessage);
  }

  remove(id: number): Observable<IProduct> {
    const url = `${this.productUrl}/${id}`;
    return this.http.delete<IProduct>(url).pipe(
      tap(_ => console.log(`deleted recipe id=${id}`)),
      catchError(this.handleError)
    );
  }
}
