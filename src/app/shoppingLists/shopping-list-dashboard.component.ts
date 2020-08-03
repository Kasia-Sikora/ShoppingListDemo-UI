import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IShoppingList} from './shoppingList';
import {AuthorisationService} from '../utils/authorisation/authorisation.service';
import {ShoppingListService} from './shopping-list.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './shopping-list-dashboard.component.html',
  styleUrls: ['./shopping-list-dashboard.component.css']
})
export class ShoppingListDashboardComponent implements OnInit {

  shoppingLists$ = new BehaviorSubject<IShoppingList[]>(null);
  errorMessage: string;

  constructor(private shoppingListService: ShoppingListService,
              private authorisationService: AuthorisationService,
              private router: Router,) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  removeList(id: number) {
    this.shoppingListService.remove(id).subscribe({
      next: next => this.refresh(),
      error: err => this.errorMessage = err
    });
  }

  refresh() {
    this.shoppingListService.setId(this.authorisationService.getUserId());
    this.shoppingListService.getShoppingLists().subscribe({
      next: lists => {
        this.shoppingLists$.next(lists);
        console.log(this.shoppingLists$.getValue());
      },
      error: err => this.errorMessage = err
    });
  }
}
