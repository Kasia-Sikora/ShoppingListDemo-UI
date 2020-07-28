import {Component, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {RecipeDetailComponent} from '../recipes/recipe-detail.component';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css']
})
export class CheckBoxComponent {

  constructor(private recipeDetailComponent: RecipeDetailComponent) {
    this.addProductsToTask();
  }

  task: Task = {
    name: 'Zaznacz wszystko',
    completed: false,
    color: 'primary',
    subtasks: []
  };

  allComplete = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }

  addProductsToTask() {
    this.recipeDetailComponent.getProductQuantity().subscribe(
      next => {
        for (const product of next) {

          console.log(next);
          // @ts-ignore
          this.task.subtasks.push({name: product.product.name, completed: false, color: 'primary'});
        }
      }
    );
    console.log(this.task);
  }
}
