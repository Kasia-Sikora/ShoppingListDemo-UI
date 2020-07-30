import {Component, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {RecipeDetailComponent} from '../../recipes/recipe-detail.component';

export interface Task {
  name: string;
  unit: string;
  quantity: number;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css']
})
export class CheckBoxComponent implements OnInit {

  constructor(private recipeDetailComponent: RecipeDetailComponent) {
  }

  task: Task = {
    name: 'Zaznacz wszystko',
    unit: '',
    quantity: null,
    completed: false,
    color: 'primary',
    subtasks: []
  };

  allComplete = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
    console.log(this.task);
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

  saveToList() {

  }

  ngOnInit(): void {
    this.recipeDetailComponent.getProductQuantity().subscribe(
      next => {
        for (const product of next) {
          console.log(next);
          this.task.subtasks.push({
            name: product.product.name,
            unit: product.unit,
            quantity: product.quantity,
            completed: false,
            color: 'primary'
          });
        }
      }
    );
  }
}
