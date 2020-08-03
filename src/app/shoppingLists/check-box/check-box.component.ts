import {Component, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {RecipeDetailComponent} from '../../recipes/recipe-detail.component';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthorisationService} from '../../utils/authorisation/authorisation.service';
import {IShoppingList} from '../shoppingList';
import {ShoppingListService} from '../shopping-list.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalService} from '../../utils/modal';
import {map, startWith} from 'rxjs/operators';

export interface Task {
  product_name: string;
  unit: string;
  quantity: number;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css']
})
export class CheckBoxComponent implements OnInit {

  shoppingListTitle = '';
  private id$ = new BehaviorSubject<number>(this.authorisationService.getUserId());
  filteredOptions: Observable<IShoppingList[]>;
  lists: IShoppingList[] = [];
  filteredLists: IShoppingList[];
  shoppingListId$ = new BehaviorSubject<number>(null);

  constructor(private recipeDetailComponent: RecipeDetailComponent,
              private parent: ModalService,
              private http: HttpClient,
              private authorisationService: AuthorisationService,
              private shoppingListService: ShoppingListService) {
  }

  task: Task = {
    product_name: 'Zaznacz wszystko',
    unit: '',
    quantity: null,
    completed: false,
    color: 'primary',
    subtasks: []
  };

  allComplete = false;

  shoppingListForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
  });

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
    console.log(this.task);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }

  saveToList(subtasks: Task[]) {
    const listOfProducts = subtasks.filter(value => value.completed === true);
    console.log(listOfProducts);
    this.http.post(environment.apiUrl + this.id$.getValue() + '/shopping-products/' + this.shoppingListId$.getValue(), listOfProducts,
      {observe: 'response'}).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
        this.shoppingListForm.reset();
        this.parent.close('shopping-modal');
      }, (error) => {
        console.log(error.message);
      });
  }

  performFilter(filterBy: string): IShoppingList[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.lists.filter((list1: IShoppingList) =>
      list1.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit(): void {
    this.recipeDetailComponent.getProductQuantity().subscribe(
      next => {
        for (const product of next) {
          this.task.subtasks.push({
            product_name: product.product.name,
            unit: product.unit,
            quantity: product.quantity,
            completed: false,
            color: 'primary'
          });
        }
      }
    );
    this.shoppingListService.getShoppingLists().subscribe({
      next: shoppingLists => {
        this.lists = shoppingLists;
        this.filteredLists = this.lists;
      },
      error: err => console.log(err.message)
    });
    this.filteredOptions = this.shoppingListForm.get('title').valueChanges
      .pipe(
        startWith(''),
        map(value => this.performFilter(value)),
      );
  }

  saveList() {
    const list = {
      id: this.shoppingListForm.get('id').value,
      title: this.shoppingListForm.get('title').value,
    };
    console.log('id' + this.shoppingListForm.get('id').value);
    this.http.post(environment.apiUrl + this.id$.getValue() + '/shopping-list', list,
      {observe: 'response'}).subscribe(
      (response: HttpResponse<any>) => {
        if (response != null){
          console.log(response);
          this.shoppingListId$.next(response.body.id);
        }
      }, (error) => {
        console.log(error.message);
      });
  }
}
