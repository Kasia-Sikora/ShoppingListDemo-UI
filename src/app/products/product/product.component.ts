import {Component, OnInit} from '@angular/core';
import {IProduct} from './product';

@Component({
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {

  products: IProduct[] = [];
  errorMessage: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
