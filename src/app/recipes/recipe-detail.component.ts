import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';

import {IRecipe} from './recipe';
import {RecipeService} from './recipe.service';
import {ModalService} from '../utils/modal';
import {IProductQuantity} from '../products/product-quantity/product-quantity';
import {ProductQuantityService} from '../products/product-quantity/product-quantity.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {IUser} from '../users/user';
import {map, tap} from 'rxjs/operators';

@Component({
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  errorMessage = '';
  recipe: IRecipe;
  recipe$: Observable<IRecipe> = new Observable<IRecipe>();


  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService,
              private modalService: ModalService,
  ) {
  }

  ngOnInit(): void {

    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      if (id) {
        this.recipe$ = this.recipeService.getRecipe(id);
      }
    }
  }

  onBack(): void {
    this.router.navigate(['./recipes']);
  }

  removeRecipe(id: number) {
    this.recipeService.remove(id).subscribe({
      next: next => this.router.navigate(['./recipes']),
      error: err => this.errorMessage = err
    });
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  getProductQuantity(): Observable<IProductQuantity[]> {
    return this.recipe$.pipe(
      map(value => value.productsQuantity)
    );
  }
}
