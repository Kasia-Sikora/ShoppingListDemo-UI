import {IProduct} from './product';

export interface IProductQuantity {
  id: number;
  product_id: number;
  user_recipe_id: number;
  unit: string;
  quantity: number;
  department: string;
  product: IProduct;
}
