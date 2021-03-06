import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {WelcomeComponent} from './home/welcomeComponent/welcome.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalModule} from './utils/modal';
import {FooterComponent} from './home/footerComponent/footer.component';
import {InterceptorService} from './utils/authorisation/interceptor.service';
import {AppRoutingModule} from './app-routing.module';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './home/navbarComponent/navbar.component';
import {RecipeDetailComponent} from './recipes/recipe-detail.component';
import {RecipeListComponent} from './recipes/recipe-list.component';
import {UserRegistrationComponent} from './utils/forms/userForms/registration-form.component';
import {UserLoginComponent} from './utils/forms/userForms/login-form.component';
import {AddRecipeFormComponent} from './utils/forms/recipesForms/add-recipe-form.component';
import {UpdateRecipeFormComponent} from './utils/forms/recipesForms/update-recipe-form.component';
import {AddProductFormComponent} from './utils/forms/recipesForms/add-product-form.component';
import {ProductComponent} from './products/product/product.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {ProductQuantityComponent} from './products/product-quantity/product-quantity.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {ConfirmRegistrationComponent} from './utils/forms/userForms/confirm-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    FooterComponent,
    NavbarComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    AddRecipeFormComponent,
    UpdateRecipeFormComponent,
    AddProductFormComponent,
    ProductComponent,
    ProductQuantityComponent,
    ConfirmRegistrationComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ModalModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgbModule,
    NoopAnimationsModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    RecipeListComponent, AddRecipeFormComponent, UpdateRecipeFormComponent],
  exports: [
    FooterComponent,
    WelcomeComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
