import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RecipeListComponent } from './recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail.component';
import { RecipeDetailGuard } from './recipe-detail.guard';
import {AppRoutingModule} from '../app-routing.module';
import {ModalModule} from '../utils/modal';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'recipes', component: RecipeListComponent},
      {
        path: 'recipes/:id',
        canActivate: [RecipeDetailGuard],
        component: RecipeDetailComponent
      }
    ]),
    AppRoutingModule,
    ModalModule,
    CommonModule,
  ],
  exports: [
    RecipeListComponent
  ],
  declarations: [
    RecipeListComponent,
    RecipeDetailComponent,
  ]
})
export class RecipeModule { }
