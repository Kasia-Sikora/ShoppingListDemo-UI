import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './users/user-list.component';
import {CommonModule} from '@angular/common';
import {RecipeListComponent} from './recipes/recipe-list.component';
import {UserRegistrationComponent} from './utils/forms/registration-form.component';
import {UserLoginComponent} from './utils/forms/login-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ModalModule} from './utils/modal';
import {AddRecipeFormComponent} from './utils/forms/add-recipe-form.component';


const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}), CommonModule, ReactiveFormsModule, ModalModule],
  declarations: [
    UserListComponent,
    RecipeListComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    AddRecipeFormComponent,
  ],
  exports: [RouterModule, UserListComponent, UserRegistrationComponent, UserLoginComponent, RecipeListComponent]
})
export class AppRoutingModule {
}
