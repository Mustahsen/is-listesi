import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { TaskService } from './task.service';
import { Task } from './task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [ TaskService ]
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
