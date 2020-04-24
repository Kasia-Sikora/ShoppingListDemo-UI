import {Component, OnInit} from '@angular/core';
import {RecipeService} from './recipe.service';
import {IRecipe} from './recipe';
import {AuthorisationService} from '../utils/forms/authorisation.service';
import {FormBuilder} from '@angular/forms';


// TODO Create Add recipe form
// TODO Create recipe description page

@Component({
  selector: 'app-recipes',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})

export class RecipeListComponent implements OnInit {

  recipes: IRecipe[] = [];
  errorMessage: string;

  constructor(private recipeService: RecipeService, private authorisationService: AuthorisationService, private fb: FormBuilder){
  }


  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe({
      next: recipes => this.recipes = recipes,
      error: err => this.errorMessage = err
    });
  }


  addRecipe() {
    console.log('dupa');
  }
}
