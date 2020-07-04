import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalService} from '../modal';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {AuthorisationService} from './authorisation.service';
import {Router} from '@angular/router';
import {AddRecipeFormComponent} from './add-recipe-form.component';
import {IProduct} from '../../products/product/product';
import {environment} from '../../../environments/environment';
import { Observable } from 'rxjs';
import {ProductService} from '../../products/product/product.service';
import {IProductQuantity} from '../../products/product-quantity/product-quantity';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})

export class AddProductFormComponent implements OnInit{

  productForm = new FormGroup({
    productName: new FormControl(''),
    unit: new FormControl(''),
    quantity: new FormControl(''),
  });

  myControl = new FormControl();
  options: IProduct[] = [];
  filteredOptions: Observable<IProduct[]>;
  errorMessage: string;
  error: HttpErrorResponse;
  product: Observable<IProduct | undefined>;
  filteredProducts: IProduct[];
  products: IProduct[] = [];
  ListFilter = '';
  // productQuantity: Observable<IProductQuantity | undefined>;
  units: string[] = ['kg', 'dag', 'g', 'cup', 'teaspoon', 'tablespoon', 'pinch', 'peace'];
  recipeProduct: IProduct;
  recipeProductsList: Observable<IProduct[]>;
  product2: IProductQuantity;

  constructor(private parent: ModalService,
              private fb: FormBuilder, private http: HttpClient,
              private authorisationService: AuthorisationService,
              private router: Router,
              private addRecipeFormComponent: AddRecipeFormComponent,
              private productService: ProductService) {

  }


  get listFilter(): string {
    return this.ListFilter;
  }
  // set listFilter(value: string) {
  //   this.ListFilter = value;
  //   this.filteredProducts = this.ListFilter ? this.performFilter(this.ListFilter) : this.products;
  // }
  selectedUnit: string;

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
        console.log('Products on init' + this.products);
      },
      error: err => this.errorMessage = err
    });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.performFilter(value))
      );
  }

  private _filter(value: string): IProduct[] {
    const filterValue = value.toLowerCase();
    return this.products.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  addProduct() {
    console.log('dupa');
    if (this.productForm.valid) {
      const productData = {
        name: this.myControl.value,
        };
      console.log('name: ' + productData.name);
      const productQuantity = {
        id: null,
        product_id: null,
        user_recipe_id: null,
        unit: this.productForm.get('unit').value,
        quantity: this.productForm.get('quantity').value,
        department: null,
      };
      console.log('product quantity ' + productQuantity.quantity);
      this.http.post(environment.apiUrl + 'product', productData,
        {observe: 'response'}).subscribe(
        (response: HttpResponse<any>) => {
          // if (response != null) {
            console.log('products in add' + response.body.id);
            // this.product = this.productService.getProduct(response.body.id);
            this.product = this.productService.getProduct(response.body.product_id);
            // productQuantity.product = this.productService.getProduct(response.body.product_id);
            productQuantity.product_id = response.body.id;
            this.product2 = productQuantity;
            // console.log('this product ' + JSON.stringify(this.product));
            this.addRecipeFormComponent.addProducts(this.product2);
          // }
        },
        (error) => {
          console.log(error.status);
        });
      // this.addRecipeFormComponent.addProducts(product);
    }
  }
}
