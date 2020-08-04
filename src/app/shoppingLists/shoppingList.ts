import {IListProduct} from './listProduct';

export interface IShoppingList {
  id: number;
  products: IListProduct[];
  title: string;
}
