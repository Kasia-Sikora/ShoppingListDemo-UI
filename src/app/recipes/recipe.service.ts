import {Injectable} from '@angular/core';
import {IRecipe} from './recipe';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import {AuthorisationService} from '../utils/authorisation/authorisation.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private id = this.authorisationService.getUserId();

  private recipeUrl = environment.apiUrl + this.id + '/recipes';
  private removeRecipe = environment.apiUrl + this.id + '/recipes';
  private httpOptions = {
    headers: new HttpHeaders({ header: 'Access-Control-Allow-Origin' })
  };

  constructor(private http: HttpClient, private authorisationService: AuthorisationService){
    // console.log(this.authorisationService.getUser());
  }

  getRecipes(): Observable<IRecipe[]> {
    console.log('id ' + this.id);
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
    return throwError(errorMessage);
  }

  remove(id: number): Observable<IRecipe> {
    const url = `${this.recipeUrl}/${id}`;
    return this.http.delete<IRecipe>(url).pipe(
      tap(_ => console.log(`deleted recipe id=${id}`)),
      catchError(this.handleError)
    );
  }
}
