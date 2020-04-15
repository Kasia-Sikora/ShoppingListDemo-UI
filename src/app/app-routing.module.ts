import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserListComponent} from './users/user-list.component';
import {CommonModule} from '@angular/common';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
    declarations: [
        UserListComponent
    ],
    exports: [RouterModule, UserListComponent]
})
export class AppRoutingModule { }
