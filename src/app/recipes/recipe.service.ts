import {Injectable} from '@angular/core';
import {IRecipe} from './recipe';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import {AuthorisationService} from '../utils/forms/authorisation.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipeUrl = 'http://localhost:8080/' + this.authorisationService.getUser().id + '/recipes';

  constructor(private http: HttpClient, private authorisationService: AuthorisationService){}

  getRecipes(): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(this.recipeUrl).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError));
  }

  getRecipe(id: number): Observable<IRecipe | undefined> {
    return this.getRecipes()
      .pipe(
        map((recipes: IRecipe[]) => recipes.find(r => r.id === id))
      );
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
