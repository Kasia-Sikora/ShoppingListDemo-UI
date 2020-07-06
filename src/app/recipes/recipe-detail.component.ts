import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';

import {IRecipe} from './recipe';
import {RecipeService} from './recipe.service';
import {ModalService} from '../utils/modal';
import {IProductQuantity} from '../products/product-quantity/product-quantity';
import {ProductQuantityService} from '../products/product-quantity/product-quantity.service';

@Component({
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  pageTitle = 'Recipe Detail';

  errorMessage = '';
  recipe: IRecipe;
  productQuantity: IProductQuantity[] = [];


  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService,
              private modalService: ModalService,
              private productQuantityService: ProductQuantityService,
  ) {
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getRecipe(id);
    }
  }

  getRecipe(id: number) {
    this.recipeService.getRecipe(id).toPromise().then(data => {
      this.recipe = data;
      this.productQuantityService.recipeId = data.id;
      // @ts-ignore
      this.productQuantity = data.productsQuantity;
      // @ts-ignore
      console.log(JSON.stringify('quantity' + data.productsQuantity));
    });
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
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  private getProductQuantity() {
    this.productQuantityService.getProductsQuantity().toPromise().then(data => {
      this.productQuantity = data;
    });
  }
}
