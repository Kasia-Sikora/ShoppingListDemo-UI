import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ModalService} from '../../modal';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {AuthorisationService} from '../../authorisation/authorisation.service';
// import {RecipeListComponent} from '../../recipes/recipe-list.component';
import {IRecipe} from '../../../recipes/recipe';
import {RecipeService} from '../../../recipes/recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './update-recipe-form.component.html',
})
export class UpdateRecipeFormComponent implements OnInit {

  recipe: IRecipe | undefined;

  recipeForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(6)]],
    method: ['', [Validators.required, Validators.minLength(6)]],
  });

  errorMessage: string;
  error: HttpErrorResponse;

  constructor(private parent: ModalService,
              private fb: FormBuilder, private http: HttpClient,
              private authorisationService: AuthorisationService,
              // private recipeListComponent: RecipeListComponent
              private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    console.log('dupa');
    console.log(param);
    if (param) {
      const id = +param;
      this.getRecipe(id);
    }
  }

  getRecipe(id: number) {
    this.recipeService.getRecipe(id).subscribe({
      next: recipe => this.recipe = recipe,
      error: err => this.errorMessage = err
    });
  }

  submitForm() {
    console.log('update');
    console.log(this.recipe);
    const recipeData = {
      id: this.recipe.id,
      title: this.recipeForm.get('title').value,
      method: this.recipeForm.get('method').value,
      user_id: this.authorisationService.getUser().id,
    };
    console.log(recipeData);
    // formData.append('picture', this.form.get('picture').value);
    if (this.recipeForm.valid) {

      this.http.put(environment.apiUrl + this.authorisationService.getUser().id + '/recipes/' + this.recipe.id, recipeData,
        {observe: 'response'}).subscribe(
        (response: HttpResponse<any>) => {
          if (response != null) {
            console.log(response);
            this.recipeForm.reset();
            this.parent.close('edit-recipe-modal');
            // this.recipeListComponent.refresh();
            this.router.navigate(['/recipes']);
          }
        },
        (error) => {
          console.log(error.status);
        });
    }
  }
}

