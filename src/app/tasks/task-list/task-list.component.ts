import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[];
  editTask: Task;
  @ViewChild('f') form: NgForm;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
    
  }

  getTasks(){
    this.taskService.getTasks()
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
    this.editTask = undefined;
  }

  edit(task){
    this.editTask = task;
    this.taskService.sendSelectedTaskMessage(task);
  }

  onSubmit(form: NgForm) {
    const name = form.value.name;
    if (this.editTask) {
      this.editTask.name = name;
      this.updateTask(this.editTask);
    } else {
      this.addTask(name);
    }
  }

  clearSelection(){
    this.editTask = undefined;
    this.form.controls.name.reset();
  }
}

