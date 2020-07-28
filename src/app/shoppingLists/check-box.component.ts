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

  constructor(recipeDetailComponent: RecipeDetailComponent) {
    if (recipeDetailComponent.productQuantity.length){
      for (const product of recipeDetailComponent.productQuantity){
        // @ts-ignore
        this.task.subtasks.push({name: product.product.name + product.quantity + product.unit, completed: false, color: 'primary'});
      }
    }
    console.log(this.task.subtasks);
  }

  task: Task = {
    name: 'Indeterminate',
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
}
