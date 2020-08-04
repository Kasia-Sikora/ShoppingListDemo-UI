import {Injectable} from '@angular/core';
import {IRecipe} from './recipe';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import {AuthorisationService} from '../utils/authorisation/authorisation.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private id$ = new BehaviorSubject<number>(this.authorisationService.getUserId());

  constructor(private http: HttpClient, private authorisationService: AuthorisationService){
    this.id$.next(this.authorisationService.getUserId());
  }

  getRecipes(): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(`${environment.apiUrl + this.id$.getValue() + '/recipes'}`).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError));
  }

  getRecipe(id: number): Observable<IRecipe | undefined> {
    return this.http.get<IRecipe>(`${environment.apiUrl + this.id$.getValue() + '/recipes'}/${id}`).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError));
  }


  remove(id: number): Observable<IRecipe> {
    const url = `${environment.apiUrl + this.id$.getValue() + '/recipes'}/${id}`;
    return this.http.delete<IRecipe>(url).pipe(
      catchError(this.handleError)
    );
  }

  setId(id: number){
    this.id$.next(id);
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
}
