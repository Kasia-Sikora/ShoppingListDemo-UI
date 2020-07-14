import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalService} from '../../modal';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {AuthorisationService} from '../../authorisation/authorisation.service';
import {Router} from '@angular/router';
import {AddRecipeFormComponent} from './add-recipe-form.component';
import {IProduct} from '../../../products/product/product';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {ProductService} from '../../../products/product/product.service';
import {IProductQuantity} from '../../../products/product-quantity/product-quantity';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})

export class AddProductFormComponent implements OnInit {

  productForm = new FormGroup({
    productName: new FormControl(''),
    unit: new FormControl(''),
    quantity: new FormControl(''),
  });

  myControl = new FormControl();
  filteredOptions: Observable<IProduct[]>;
  errorMessage: string;
  error: HttpErrorResponse;
  product: IProduct;
  filteredProducts: IProduct[];
  products: IProduct[] = [];
  units: string[] = ['', 'kg', 'dag', 'gram', 'mililitry', 'litry', 'szklanka', 'łyżeczka', 'łyżka', 'szczypta', 'sztuka'];
  productQuantity: IProductQuantity;
  selectedUnit: any = {
    unit: ''
  };

  constructor(private parent: ModalService,
              private fb: FormBuilder, private http: HttpClient,
              private authorisationService: AuthorisationService,
              private router: Router,
              private addRecipeFormComponent: AddRecipeFormComponent,
              private productService: ProductService) {
  }

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
      },
      error: err => this.errorMessage = err
    });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.performFilter(value))
      );
  }

  addProduct() {
    if (this.productForm.valid) {
      const productData = {
        name: this.myControl.value,
      };
      const productQuantity = {
        id: null,
        product_id: null,
        user_recipe_id: null,
        unit: this.productForm.get('unit').value,
        quantity: this.productForm.get('quantity').value.replace(/,/, '.'),
        department: null,
      };
      console.log(productQuantity.quantity);
      this.http.post(environment.apiUrl + 'product', productData,
        {observe: 'response'}).subscribe(
        (response: HttpResponse<any>) => {
          if (response != null) {
            this.product = {
              id: response.body.id,
              name: response.body.name,
            };
            productQuantity.product_id = response.body.id;
            this.productQuantity = productQuantity;
            this.addRecipeFormComponent.addProducts(this.productQuantity, this.product);
          }
        },
        (error) => {
          console.log('error ' + error.status);
        });
    }
  }
}
