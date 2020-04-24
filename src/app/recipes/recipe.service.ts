import {Injectable} from '@angular/core';
import {IRecipe} from './recipe';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {AuthorisationService} from '../utils/forms/authorisation.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipeUrl = 'http://localhost:8080/recipes';

  constructor(private http: HttpClient, private authorisationService: AuthorisationService){}

  getRecipes(): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>('http://localhost:8080/' + this.authorisationService.getUser().id + '/recipes').pipe(
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
