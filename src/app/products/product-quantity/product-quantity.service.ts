import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {AuthorisationService} from '../../utils/authorisation/authorisation.service';
import {environment} from '../../../environments/environment';
import {IProductQuantity} from './product-quantity';

@Injectable({
  providedIn: 'root'
})
export class ProductQuantityService {

  public recipeId: number;
  private productUrl = environment.apiUrl + this.recipeId + '/recipe_products';
  // private removeProduct = environment.apiUrl + this.authorisationService.getUser().id + '/recipes';

  private httpOptions = {
    headers: new HttpHeaders({header: 'Access-Control-Allow-Origin'})
  };

  constructor(private http: HttpClient, private authorisationService: AuthorisationService) {
  }

  getProductsQuantity(): Observable<IProductQuantity[]> {
    return this.http.get<IProductQuantity[]>(this.productUrl).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError));
  }

  getProductQuantity(id: number): Observable<IProductQuantity | undefined> {
    return this.getProductsQuantity()
      .pipe(
        map((recipes: IProductQuantity[]) => recipes.find(r => r.id === id))
      );
  }


  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    return throwError(errorMessage);
  }

  remove(id: number): Observable<IProductQuantity> {
    const url = `${this.productUrl}/${id}`;
    return this.http.delete<IProductQuantity>(url).pipe(
      // tap(_ => console.log(`deleted recipe id=${id}`)),
      catchError(this.handleError)
    );
  }
}
