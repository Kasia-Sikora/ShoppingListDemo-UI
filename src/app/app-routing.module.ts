import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipeListComponent} from './recipes/recipe-list.component';
import {RecipeDetailComponent} from './recipes/recipe-detail.component';
import {WelcomeComponent} from './home/welcomeComponent/welcome.component';


const routes: Routes = [{path: '', component: WelcomeComponent},
  {path: 'recipes', component: RecipeListComponent},
  {path: 'recipe/:id', component: RecipeDetailComponent},
  { path: '**', component: WelcomeComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
