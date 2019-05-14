import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[];
  @ViewChild('f') form: NgForm;
  subscription: Subscription;
  editMode = false;
  taskIndex: number;
  editedTask: Task;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.tasks = this.taskService.getTasks();

    this.subscription = this.taskService.taskEditStarted
      .subscribe(
        (index: number) => {
          this.taskIndex = index;
          this.editMode = true;
          this.editedTask = this.taskService.getTask(index);
          this.form.setValue({
            name: this.editedTask.name
          })
        }
      );
    
    
    this.subscription = this.taskService.tasksChanged
      .subscribe(
        (tasks: Task[]) => {
          this.tasks = tasks;
        }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEditItem(index: number){
    this.taskService.taskEditStarted.next(index);
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    var task = new Task(null, value.name, null);
    if (this.editMode) {
      task.id = this.editedTask.id;
      task.todoitems = this.editedTask.todoitems;
      this.taskService.updateTask(task, this.taskIndex);
    } else {
      this.taskService.addTask(task);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  onDelete() {
    this.taskService.deleteTask(this.taskIndex);
    this.onClear();
  }

}

