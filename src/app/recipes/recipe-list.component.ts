import {Component, OnInit} from '@angular/core';
import {RecipeService} from './recipe.service';
import {IRecipe} from './recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})

export class RecipeListComponent implements OnInit {
  pageTitle = 'Recipes';
  recipes: IRecipe[] = [];
  errorMessage: string;

  constructor(private recipeService: RecipeService){
  }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe({
      next: recipes => this.recipes = recipes,
      error: err => this.errorMessage = err
    });
  }
}
