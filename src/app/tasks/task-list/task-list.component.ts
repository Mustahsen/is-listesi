import { Component, OnInit, ViewChild } from '@angular/core';
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
    this.taskService.addTask(newTask).subscribe(
      task => {
        this.model.addSuccessMessage = newTask.name;
        this.tasks.push(task);
      },
      error => {
        this.model.addErrorMessage = newTask.name;
      });
  }

  updateTask (task: Task) {
    const oldName = this.editTask.name;
    this.editTask.name = this.model.name;
    this.taskService.updateTask(this.editTask)
      .subscribe(
        response => {
          const ix = task ? this.tasks.findIndex(t => t.id === task.id) : -1;
          if (ix > -1) {
            this.model.updateSuccessMessage = oldName + ' => ' + task.name;
            this.tasks[ix] = task; 
          }
        },
        error => {
          this.model.updateErrorMessage = task.name;
        });
    this.editTask = undefined;
  }

  deleteTask(): void {
    const task = this.editTask;
    this.taskService.deleteTask(this.editTask).subscribe(
      response => {
        this.tasks = this.tasks.filter(t => t !== this.editTask);
        this.model.deleteSuccessMessage = this.editTask.name;
      },
      error => {
        this.model.deleteErrorMessage = task.name;
      });
    this.clearSelection();
  }

  edit(task){
    this.editTask = task;
    this.model.name = this.editTask.name;
    this.taskService.sendSelectedTaskMessage(this.editTask);
    this.itemService.sendItemsMessage(this.editTask.itemList);
  }

  onSubmit(form: NgForm) {
    if (this.editTask) {
      this.updateTask(this.editTask);
    } else {
      this.addTask(this.model.name);
    }
  }

  clearSelection(){
    this.editTask = undefined;
    this.model.name = undefined;
    this.model.addSuccessMessage = undefined;
    this.model.updateSuccessMessage = undefined;
    this.model.addErrorMessage = undefined;
    this.model.updateErrorMessage = undefined;
    this.form.resetForm();
    this.taskService.sendSelectedTaskMessage(this.editTask);
  }
}

