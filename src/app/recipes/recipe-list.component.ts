import {Component, OnInit} from '@angular/core';
import {RecipeService} from './recipe.service';
import {IRecipe} from './recipe';
import {AuthorisationService} from '../utils/forms/authorisation.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})

export class RecipeListComponent implements OnInit {
  pageTitle = 'Recipes';
  recipes: IRecipe[] = [];
  errorMessage: string;

  constructor(private recipeService: RecipeService, private authorisationService: AuthorisationService, private fb: FormBuilder){
  }

  searchForm: object;

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe({
      next: recipes => this.recipes = recipes,
      error: err => this.errorMessage = err
    });
  }

  submitForm(){

  }

  addRecipe() {
    console.log('dupa');
  }
}
