import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { IRecipe } from './recipe';
import { RecipeService } from './recipe.service';

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
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
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
    this.router.navigate(['/recipes']);
  }

}
