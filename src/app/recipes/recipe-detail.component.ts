import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';

import {IRecipe} from './recipe';
import {RecipeService} from './recipe.service';
import {ModalService} from '../utils/modal';
import {IProductQuantity} from '../products/product-quantity/product-quantity';
import {ProductQuantityService} from '../products/product-quantity/product-quantity.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {IUser} from '../users/user';

@Component({
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  errorMessage = '';
  recipe: IRecipe;
  productQuantity: IProductQuantity[] = [];
  private productQuantity$ = new BehaviorSubject<IProductQuantity[]>([]);


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
    // this.recipeService.getRecipe(id).toPromise().then(data => {
    //   this.recipe = data;
    //   this.productQuantityService.recipeId = data.id;
    //   // @ts-ignore
    //   this.productQuantity = data.productsQuantity;
    //   // @ts-ignore
    //   this.productQuantity$.next(data.productsQuantity);
    // });
    this.recipeService.getRecipe(id).subscribe({
      next: next => {
        this.recipe = next;
        this.productQuantityService.recipeId = next.id;
        // @ts-ignore
        this.productQuantity = next.productsQuantity;
        // @ts-ignore
        this.productQuantity$.next(next.productsQuantity);
        },
      error: err => this.errorMessage = err
    });
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
    return this.productQuantity$;
  }
}
