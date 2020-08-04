import {Component, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {RecipeDetailComponent} from '../../recipes/recipe-detail/recipe-detail.component';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthorisationService} from '../../utils/authorisation/authorisation.service';
import {IShoppingList} from '../shoppingList';
import {ShoppingListService} from '../shopping-list.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalService} from '../../utils/modal/modal.service';
import {map, startWith} from 'rxjs/operators';
import {Router} from '@angular/router';

export interface ProductsList {
  product_name: string;
  unit: string;
  quantity: number;
  completed: boolean;
  color: ThemePalette;
  products?: ProductsList[];
}

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css']
})
export class CheckBoxComponent implements OnInit {

  private id$ = new BehaviorSubject<number>(this.authorisationService.getUserId());
  filteredOptions: Observable<IShoppingList[]>;
  lists: IShoppingList[] = [];
  // filteredLists: IShoppingList[];
  shoppingListId$ = new BehaviorSubject<number>(null);

  productList: ProductsList = {
    product_name: 'Zaznacz wszystko',
    unit: '',
    quantity: null,
    completed: false,
    color: 'primary',
    products: []
  };

  allComplete = false;

  shoppingListForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
  });

  constructor(private recipeDetailComponent: RecipeDetailComponent,
              private parent: ModalService,
              private http: HttpClient,
              private authorisationService: AuthorisationService,
              private shoppingListService: ShoppingListService,
              private router: Router) {
  }

  updateAllComplete() {
    this.allComplete = this.productList.products != null && this.productList.products.every(t => t.completed);
    console.log(this.productList);
  }

  someComplete(): boolean {
    if (this.productList.products == null) {
      return false;
    }
    return this.productList.products.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.productList.products == null) {
      return;
    }
    this.productList.products.forEach(t => t.completed = completed);
  }

  saveToList(subtasks: ProductsList[]) {
    const listOfProducts = subtasks.filter(value => value.completed === true);
    this.http.post(environment.apiUrl + this.id$.getValue() + '/shopping-products/' + this.shoppingListId$.getValue(), listOfProducts,
      {observe: 'response'}).subscribe(
      (response: HttpResponse<any>) => {
        this.closeForm();
      }, (error) => {
        console.log(error.message);
      });
  }

  performFilter(filterBy: string): IShoppingList[] {
    if (filterBy != null) {
      filterBy = filterBy.toLocaleLowerCase();
      return this.lists.filter((list1: IShoppingList) =>
        list1.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
  }

  ngOnInit(): void {
    this.initProductList();
    this.initList();
    this.initFilteredOptions();
  }

  saveList() {
    const list = {
      id: this.shoppingListForm.get('id').value,
      title: this.shoppingListForm.get('title').value,
    };

    this.http.post(environment.apiUrl + this.id$.getValue() + '/shopping-list', list,
      {observe: 'response'}).subscribe(
      (response: HttpResponse<any>) => {
        if (response != null) {
          this.shoppingListId$.next(response.body.id);
        }
      }, (error) => {
        console.log(error.message);
      });
  }

  private initProductList() {
    this.recipeDetailComponent.getProductQuantity().subscribe(
      next => {
        for (const product of next) {
          this.productList.products.push({
            product_name: product.product.name,
            unit: product.unit,
            quantity: product.quantity,
            completed: false,
            color: 'primary'
          });
        }
      }
    );
  }

  private closeForm() {
    this.shoppingListForm.reset();
    this.parent.close('shopping-modal');
    this.router.navigate(['/recipes']);
  }

  private initList() {
    this.shoppingListService.getShoppingLists().subscribe({
      next: shoppingLists => {
        this.lists = shoppingLists;
      },
      error: err => console.log(err.message)
    });
  }

  private initFilteredOptions() {
    this.filteredOptions = this.shoppingListForm.get('title').valueChanges
      .pipe(
        startWith(''),
        map(value => this.performFilter(value)),
      );
  }
}
