import { Component, OnInit } from '@angular/core';
import {IRecipe} from '../../recipes/recipe';
import {IProduct} from './product';

@Component({
  // selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {

  products: IProduct[] = [];
  errorMessage: string;

  constructor() { }

  ngOnInit(): void {
  }

}
