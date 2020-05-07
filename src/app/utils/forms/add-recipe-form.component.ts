import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ModalService} from '../modal';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {AuthorisationService} from './authorisation.service';
import {Router} from '@angular/router';
import {RecipeListComponent} from '../../recipes/recipe-list.component';

@Component({
  selector: 'app-add-recipes',
  templateUrl: './add-recipe-form.component.html',
})

export class AddRecipeFormComponent {
  recipeForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(6)]],
    method: ['', [Validators.required, Validators.minLength(6)]],
  });

  errorMessage: string;
  error: HttpErrorResponse;

  constructor(private parent: ModalService,
              private fb: FormBuilder, private http: HttpClient,
              private authorisationService: AuthorisationService,
              private recipeListComponent: RecipeListComponent) {
  }

  submitForm() {
    const recipeData = {
      title: this.recipeForm.get('title').value,
      method: this.recipeForm.get('method').value,
      user_id: this.authorisationService.getUser().id,
    };
    // formData.append('picture', this.form.get('picture').value);
    if (this.recipeForm.valid) {

      this.http.post('http://localhost:8080/' + this.authorisationService.getUser().id + '/recipes', recipeData,
        {observe: 'response'}).subscribe(
        (response: HttpResponse<any>) => {
          if (response != null) {
            console.log(response);
            this.recipeForm.reset();
            this.parent.close('add-recipe-modal');
            this.recipeListComponent.refresh();
          }
        },
      (error) => {
        console.log(error.status);
      });
    }
  }
}
