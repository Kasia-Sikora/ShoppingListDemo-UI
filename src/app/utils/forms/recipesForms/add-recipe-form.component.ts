import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ModalService} from '../../modal';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthorisationService} from '../../authorisation/authorisation.service';
import {Router} from '@angular/router';
import {RecipeListComponent} from '../../../recipes/recipe-list.component';
import {environment} from '../../../../environments/environment';
import {IProductQuantity} from '../../../products/product-quantity/product-quantity';
import {IProduct} from '../../../products/product/product';


@Component({
  selector: 'app-add-recipes',
  templateUrl: './add-recipe-form.component.html',
})

export class AddRecipeFormComponent {
  recipeForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(6)]],
    method: ['', [Validators.required, Validators.minLength(6)]],
    user_id: [''],
  });

  errorMessage: string;
  error: HttpErrorResponse;
  productsQuantity: IProductQuantity[] = [];
  displayForm: boolean;
  recipeId: number;
  products: any[] = [];
  private id = this.authorisationService.getUserId();

  constructor(private parent: ModalService,
              private fb: FormBuilder, private http: HttpClient,
              private authorisationService: AuthorisationService,
              private router: Router,
              private recipeListComponent: RecipeListComponent) {
  }

  async submitForm() {
    const recipeData = {
      title: this.recipeForm.get('title').value,
      method: this.recipeForm.get('method').value,
      user_id: this.id,
    };

    if (this.recipeForm.valid) {
      this.http.post(environment.apiUrl + this.id + '/recipes', recipeData,
        {observe: 'response'}).toPromise().then(response => {
          if (response != null) {
            // @ts-ignore
            this.recipeId = response.body.id;
            this.http.post(environment.apiUrl + this.recipeId + '/recipe_products', this.productsQuantity,
              {observe: 'response'}).toPromise().then(data2 => {
                this.recipeForm.reset();
                this.parent.close('add-recipe-modal');
                this.recipeListComponent.refresh();
                this.router.navigate(['/recipes']);
              },
              (error) => {
                console.log('error 3: ' + error.status);
              });
          }
        },
        (error) => {
          console.log('error 2: ' + error.status);
        });
    }
  }

  displayProductForm() {
    if (!this.displayForm) {
      document.getElementById('add-prod-button').style.display = 'none';
      document.getElementById('add-product-form').style.display = 'inline-flex';
      this.displayForm = true;
    } else {
      document.getElementById('add-prod-button').style.display = 'inline-flex';
      document.getElementById('add-product-form').style.display = 'none';
      this.displayForm = false;
    }
  }

  addProducts(productQuantity: IProductQuantity, product: IProduct) {
    const prod = {
      id: product.id,
      name: product.name,
      unit: productQuantity.unit,
      quantity: productQuantity.quantity != null ? productQuantity.quantity : '',
    };
    this.productsQuantity.push(productQuantity);
    this.products.push(prod);
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
}
