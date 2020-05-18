import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';

import {IRecipe} from './recipe';
import {RecipeService} from './recipe.service';
import {AuthorisationService} from '../utils/forms/authorisation.service';
import {RecipeListComponent} from './recipe-list.component';

@Component({
  // selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  pageTitle = 'Recipe Detail';
  errorMessage = '';
  recipe: IRecipe | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService) {
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
  }

  onBack(): void {
    this.router.navigate(['./recipes']);
  }

  removeRecipe(id: number) {
    console.log('enter remove Recipe with id: ' + id);
    this.recipeService.remove(id).subscribe({
      error: err => this.errorMessage = err
    });
    this.router.navigate(['./recipes']);
  }

  editRecipe(id: number) {
    console.log('editing');
  }
}
