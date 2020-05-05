import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ModalService} from '../modal';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {AuthorisationService} from './authorisation.service';
import {Router} from '@angular/router';

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
              private authorisationService: AuthorisationService) {
  }

  submitForm() {
    const recipeData = {
      title: this.recipeForm.get('title').value,
      method: this.recipeForm.get('method').value,
      user_id: this.authorisationService.getUser().id,
    };
    // formData.append('picture', this.form.get('picture').value);
    if (this.recipeForm.valid) {

      this.http.post('http://localhost:8080/' + recipeData.user_id + '/recipes', recipeData, {observe: 'response'}).subscribe(
        (response: HttpResponse<any>) => {
          if (response != null) {
            console.log(response);
            this.recipeForm.reset();
            this.parent.close('add-recipe-modal');
            this.http.get('http://localhost:8080/' + recipeData.user_id + '/recipes').subscribe(
              (response2: HttpResponse<any>) => {
                console.log(response2);
              }
            );
          }
        },
      (error) => {
        console.log(error.status);
      });
    }
  }
}
