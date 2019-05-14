import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { ToDoItem } from '../todoitem.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  @Input() task: Task;
  @ViewChild('f') form: NgForm;
  subscription: Subscription;
  editMode = false;
  itemIndex: number;
  editedItem: ToDoItem;



  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.subscription = this.taskService.editStarted
      .subscribe(
        (index: number) => {
          this.itemIndex = index;
          this.editMode = true;
          this.editedItem = this.taskService.getToDoItem(this.task, index);
          this.form.setValue({
            name: this.editedItem.name,
            deadline: this.editedItem.deadline,
            status: this.editedItem.status
          })
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEditItem(index: number){
    this.taskService.editStarted.next(index);
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newToDoItem = new ToDoItem(6, value.name, value.deadline, value.status, null);
    if (this.editMode) {
      this.taskService.updateIngredient(this.task, this.itemIndex, newToDoItem);
    } else {
      this.taskService.addToDoItem(this.task, newToDoItem);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  onDelete() {
    this.taskService.deleteIngredient(this.task, this.itemIndex);
    this.onClear();
  }


}
