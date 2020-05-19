import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {WelcomeComponent} from './home/welcomeComponent/welcome.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ModalModule} from './utils/modal';
import {FooterComponent} from './home/footerComponent/footer.component';
import {InterceptorService} from './utils/interceptor.service';
import {AppRoutingModule} from './app-routing.module';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './home/navbarComponent/navbar.component';
import {RecipeDetailComponent} from './recipes/recipe-detail.component';
import {RecipeListComponent} from './recipes/recipe-list.component';
import {UserRegistrationComponent} from './utils/forms/registration-form.component';
import {UserLoginComponent} from './utils/forms/login-form.component';
import {AddRecipeFormComponent} from './utils/forms/add-recipe-form.component';
import {UpdateRecipeFormComponent} from './utils/forms/update-recipe-form.component';

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
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ModalModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}],
  exports: [
    FooterComponent,
    WelcomeComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
