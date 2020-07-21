import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ModalService} from '../../modal';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {AuthorisationService} from '../../authorisation/authorisation.service';
import {IRecipe} from '../../../recipes/recipe';
import {RecipeService} from '../../../recipes/recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {IProductQuantity} from '../../../products/product-quantity/product-quantity';
import {IProduct} from '../../../products/product/product';
import {ProductService} from '../../../products/product/product.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './update-recipe-form.component.html',
})
export class UpdateRecipeFormComponent implements OnInit {

  // recipe$ = new BehaviorSubject<IRecipe>(null);

  recipeForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    method: ['', [Validators.required, Validators.minLength(6)]],
  });

  errorMessage: string;
  error: HttpErrorResponse;
  private id = this.authorisationService.getUserId();
  products: IProduct[] = [];
  productsQuantity: IProductQuantity[] = [];
  recipe: IRecipe;

  constructor(private parent: ModalService,
              private fb: FormBuilder, private http: HttpClient,
              private authorisationService: AuthorisationService,
              private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private productService: ProductService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getRecipe(id);
    }
  }

  getRecipe(id: number) {
    this.recipeService.getRecipe(id).toPromise().then(data => {
      this.recipe = data;
      // @ts-ignore
      for (const product of data.productsQuantity) {
        const productQuantity = product;
        productQuantity.product_id = product.product.id;
        this.productsQuantity.push(productQuantity);
        this.products.push(product.product);
      }
    });
  }

  submitForm() {
    const recipeData = {
      // @ts-ignore
      id: this.recipe.id,
      title: this.recipeForm.get('title').value,
      method: this.recipeForm.get('method').value,
      user_id: this.id,
    };
    // formData.append('picture', this.form.get('picture').value);
    if (this.recipeForm.valid) {
      // @ts-ignore
      this.http.put(environment.apiUrl + this.id + '/recipes/' + this.recipe.id, recipeData,
        {observe: 'response'}).subscribe(
        (response: HttpResponse<any>) => {
          if (response != null) {
            this.http.post(environment.apiUrl + this.recipe.id + '/recipe_products', this.productsQuantity,
              {observe: 'response'}).toPromise().then(data2 => {
                this.recipeForm.reset();
                this.parent.close('add-recipe-modal');
                // this.recipeListComponent.refresh();
                this.router.navigate(['/recipes']);
              },
              (error) => {
                this.errorMessage = error.message;
              });
            this.recipeForm.reset();
            this.parent.close('edit-recipe-modal');
            this.router.navigate(['/recipes']);
          }
        },
        (error) => {
          this.errorMessage = error.message;
        });
    }
  }

  addProducts(productQuantity: IProductQuantity, product: IProduct) {
    this.productsQuantity.push(productQuantity);
    this.products.push(product);
  }

  removeProduct(product: any) {
    const index = this.products.indexOf(product, 0);
    if (index > -1) {
      this.products.splice(index, 1);
    }
    // @ts-ignore
    const tempProd: IProductQuantity = this.productsQuantity.filter(prod => prod.product.id === product.id)[0];
    const index2 = this.productsQuantity.indexOf(tempProd);
    if (index2 > -1) {
      this.productsQuantity.splice(index2, 1);
    }

  }
}

