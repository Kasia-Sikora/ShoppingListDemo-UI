import {IProductQuantity} from '../products/product-quantity';

export interface IRecipe {
  id: number;
  user_id: number;
  title: string;
  method: string;
  picture: string;
  productsQuantity?: IProductQuantity[];
  is_favourite: boolean;
}
