import {Component, OnInit} from '@angular/core';
import {RecipeService} from './recipe.service';
import {IRecipe} from './recipe';
import {AuthorisationService} from '../utils/authorisation/authorisation.service';
import {FormBuilder} from '@angular/forms';
import {ModalService} from '../utils/modal';


@Component({
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})

export class RecipeListComponent implements OnInit {

  recipes: IRecipe[] = [];
  errorMessage: string;

  constructor(private recipeService: RecipeService,
              private authorisationService: AuthorisationService,
              private fb: FormBuilder, private modalService: ModalService) {
  }


  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe({
      next: recipes => this.recipes = recipes,
      error: err => this.errorMessage = err
    });
  }


  addRecipe(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  refresh() {
    this.recipeService.getRecipes().subscribe({
      next: recipes => this.recipes = recipes,
      error: err => this.errorMessage = err
    });
  }
}
