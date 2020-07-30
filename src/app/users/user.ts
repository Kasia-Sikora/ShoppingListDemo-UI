import {IRecipe} from '../recipes/recipe';
import {IShoppingList} from '../shoppingLists/shoppingList';

export interface IUser {
  id: number;
  login: string;
  password: string;
  email: string;
  recipes?: IRecipe[];
  shoppingLists?: IShoppingList[];
}
