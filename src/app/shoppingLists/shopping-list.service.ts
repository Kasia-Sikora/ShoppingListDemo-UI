import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import {AuthorisationService} from '../utils/authorisation/authorisation.service';
import {environment} from '../../environments/environment';
import {IShoppingList} from './shoppingList';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private id$ = new BehaviorSubject<number>(this.authorisationService.getUserId());
  private recipeUrl = environment.apiUrl + this.id$.getValue() + '/recipes';

  constructor(private http: HttpClient, private authorisationService: AuthorisationService){
    this.id$.next(this.authorisationService.getUserId());
  }

  getShoppingLists(): Observable<IShoppingList[]> {
    return this.http.get<IShoppingList[]>(environment.apiUrl + this.id$.getValue() + '/shopping-lists').pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError));
  }

  getShoppingList(id: number): Observable<IShoppingList | undefined> {
    return this.getShoppingLists()
      .pipe(
        map((lists: IShoppingList[]) => lists.find(r => r.id === id))
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

  remove(id: number): Observable<IShoppingList> {
    const url = `${environment.apiUrl + this.id$.getValue() + '/shopping-lists'}/${id}`;
    return this.http.delete<IShoppingList>(url).pipe(
      // tap(_ => console.log(`deleted recipe id=${id}`)),
      catchError(this.handleError)
    );
  }

  setId(id: number){
    this.id$.next(id);
  }
}
