import {IListProduct} from './listProduct';

export interface IShoppingList {
  id: number;
  productList: IListProduct[];
  title: string;
}
