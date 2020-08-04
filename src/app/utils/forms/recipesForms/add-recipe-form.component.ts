import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ModalService} from '../../modal/modal.service';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {AuthorisationService} from '../../authorisation/authorisation.service';
import {Router} from '@angular/router';
import {RecipeListComponent} from '../../../recipes/recipe-dashboard/recipe-list.component';
import {environment} from '../../../../environments/environment';
import {IProductQuantity} from '../../../products/product-quantity';
import {IProduct} from '../../../products/product';
import {BehaviorSubject} from 'rxjs';


@Component({
  selector: 'app-add-recipes',
  templateUrl: './add-recipe-form.component.html',
  styleUrls: ['./recipes-form.component.css'],
})

export class AddRecipeFormComponent implements OnInit {

  recipeForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    method: ['', [Validators.required, Validators.minLength(4)]],
    user_id: [''],
  });

  errorMessage: string;
  error: HttpErrorResponse;
  productsQuantity: IProductQuantity[] = [];
  products: IProduct[] = [];
  private id$ = new BehaviorSubject<number>(this.authorisationService.getUserId());

  constructor(private parent: ModalService,
              private fb: FormBuilder, private http: HttpClient,
              private authorisationService: AuthorisationService,
              private router: Router,
              private recipeListComponent: RecipeListComponent) {
  }

  ngOnInit(): void {
    this.id$.next(this.authorisationService.getUserId());
  }

  async submitForm() {
    const recipeData = this.getRecipeData();

    if (this.recipeForm.valid) {
      this.http.post(environment.apiUrl + this.id$.getValue() + '/recipes', recipeData,
        {observe: 'response'}).subscribe(
        (response: HttpResponse<any>) => {
          if (response != null) {
            // @ts-ignore
            const recipeId = response.body.id;
            this.http.post(environment.apiUrl + recipeId + '/recipe_products', this.productsQuantity,
              {observe: 'response'}).subscribe(data2 => {
                this.closeForm();
              },
              (error) => {
                this.errorMessage = error.message;
              });
          }
        },
        (error) => {
          this.errorMessage = error.message;
        });
    }
  }

  addProducts(productQuantity: IProductQuantity, product: IProduct) {
    productQuantity.product_id = product.id;
    this.productsQuantity.push(productQuantity);
    this.products.push(product);
  }

  removeProduct(product: any) {
    const index = this.products.indexOf(product, 0);
    if (index > -1) {
      this.products.splice(index, 1);
    }
    const tempProd: IProductQuantity = this.productsQuantity.filter(prod => prod.product_id === product.id)[0];
    const index2 = this.productsQuantity.indexOf(tempProd);
    if (index2 > -1) {
      this.productsQuantity.splice(index2, 1);
    }
  }

  private closeForm() {
    this.recipeForm.reset();
    this.parent.close('add-recipe-modal');
    this.recipeListComponent.refresh();
    this.router.navigate(['/recipes']);
  }

  private getRecipeData() {
    return {
      title: this.recipeForm.get('title').value,
      method: this.recipeForm.get('method').value,
      user_id: this.id$.getValue(),
    };
  }
}
