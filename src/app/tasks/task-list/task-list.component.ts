import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  model: any = {};
  tasks: Task[];
  editTask: Task;
  @ViewChild('f') form: NgForm;

  constructor(private taskService: TaskService, private itemService: ItemService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(){
    this.taskService.getTasksForUser()
      .subscribe(tasks => this.tasks = tasks);
  }

  addTask (name: string): void{
    this.editTask = undefined;
    name = name.trim();
    if(!name) { return; }

    const newTask: Task = new Task(null, name, null);
    this.taskService.addTask(newTask)
      .subscribe(task => this.tasks.push(task));
  }

  updateTask (task: Task) {
    this.taskService.updateTask(this.editTask)
      .subscribe(task => {
        const ix = task ? this.tasks.findIndex(t => t.id === task.id) : -1;
        if (ix > -1) { this.tasks[ix] = task; }
      });
    this.editTask = undefined;
  }

  deleteTask(): void {
    this.tasks = this.tasks.filter(t => t !== this.editTask);
    this.taskService.deleteTask(this.editTask).subscribe();
    this.clearSelection();
  }

  edit(task){
    this.editTask = task;
    this.model.name = this.editTask.name;
    this.taskService.sendSelectedTaskMessage(this.editTask);
  }

  onSubmit(form: NgForm) {
    if (this.editTask) {
      this.editTask.name = this.model.name;
      this.updateTask(this.editTask);
    } else {
      this.addTask(this.model.name);
    }
  }

  clearSelection(){
    this.editTask = undefined;
    this.model.name = undefined;
    this.form.resetForm();
    this.taskService.sendSelectedTaskMessage(this.editTask);
  }
}

