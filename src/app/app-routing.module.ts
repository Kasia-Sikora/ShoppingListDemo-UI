import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipeListComponent} from './recipes/recipe-dashboard/recipe-list.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {WelcomeComponent} from './home/welcomeComponent/welcome.component';
import {ConfirmRegistrationComponent} from './utils/forms/userForms/confirm-registration.component';
import {ShoppingListDashboardComponent} from './shoppingLists/shoppingListDashboard/shopping-list-dashboard.component';


const routes: Routes = [
  {path: 'recipes', component: RecipeListComponent},
  {path: 'recipe/:id', component: RecipeDetailComponent},
  {path: 'activate', component: ConfirmRegistrationComponent},
  {path: 'shoppingList', component: ShoppingListDashboardComponent},
  {path: '', component: WelcomeComponent},
  {path: '**', component: WelcomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
