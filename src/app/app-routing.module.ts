import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './users/user-list.component';
import {CommonModule} from '@angular/common';
import {RecipeListComponent} from './recipes/recipe-list.component';
import {UserRegistrationComponent} from './utils/forms/registration-form.component';
import {UserLoginComponent} from './utils/forms/login-form.component';
import {ReactiveFormsModule} from '@angular/forms';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule, ReactiveFormsModule],
  declarations: [
    UserListComponent,
    RecipeListComponent,
    UserRegistrationComponent,
    UserLoginComponent
  ],
  exports: [RouterModule, UserListComponent, UserRegistrationComponent, UserLoginComponent, RecipeListComponent]
})
export class AppRoutingModule {
}
