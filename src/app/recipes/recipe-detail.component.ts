import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';

import {IRecipe} from './recipe';
import {RecipeService} from './recipe.service';
// import {AuthorisationService} from '../utils/forms/authorisation.service';
// import {RecipeListComponent} from './recipe-list.component';
import {ModalService} from '../utils/modal';

// import {UpdateRecipeFormComponent} from '../utils/forms/update-recipe-form.component';

@Component({
  // selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  pageTitle = 'Recipe Detail';

  errorMessage = '';
  recipe: IRecipe;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService,
              private modalService: ModalService,
              // private updateRecipeForm: UpdateRecipeFormComponent
  ) {
  }

  ngOnInit(): void {
    console.log('dupa1');
    console.log(this.route.snapshot.paramMap);
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
    console.log('recipe detail' + this.recipe);
  }

  onBack(): void {
    this.router.navigate(['./recipes']);
  }

  removeRecipe(id: number) {
    this.recipeService.remove(id).subscribe({
      error: err => this.errorMessage = err
    });
    this.router.navigate(['./recipes']);
  }

  openModal(id: string) {
    this.modalService.open(id);
    // this.updateRecipeForm.recipe = this.recipe;
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
