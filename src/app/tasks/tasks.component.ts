import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { TaskService } from '../services/task.service';
import { ItemService } from '../services/item.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  selectedTask: Task;
  private subscription: Subscription;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.subscription = this.taskService.getSelectedTaskMessage()
      .subscribe(
        (task: Task) => {
          this.selectedTask = task;
        }
      );
  }

}
