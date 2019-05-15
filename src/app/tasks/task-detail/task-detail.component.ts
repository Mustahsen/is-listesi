import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { ToDoItem } from '../../models/todoitem.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  @Input() task: Task;
  @ViewChild('f') form: NgForm;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }


}
