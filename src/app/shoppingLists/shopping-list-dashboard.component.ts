import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IShoppingList} from './shoppingList';
import {AuthorisationService} from '../utils/authorisation/authorisation.service';
import {ShoppingListService} from './shopping-list.service';

@Component({
  templateUrl: './shopping-list-dashboard.component.html',
  styleUrls: ['./shopping-list-dashboard.component.css']
})
export class ShoppingListDashboardComponent implements OnInit {

  shoppingLists$ = new BehaviorSubject<IShoppingList[]>(null);
  errorMessage: string;

  constructor(private shoppingListService: ShoppingListService,
              private authorisationService: AuthorisationService) {
  }

  ngOnInit(): void {
    this.shoppingListService.setId(this.authorisationService.getUserId());
    this.shoppingListService.getShoppingLists().subscribe({
      next: recipes => {
        this.shoppingLists$.next(recipes);
        console.log(this.shoppingLists$.getValue());
      },
      error: err => this.errorMessage = err
    });
  }

}
