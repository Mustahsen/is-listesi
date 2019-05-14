import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [TaskService]
})
export class TasksComponent implements OnInit {
  selectedTask: Task;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.taskSelected.subscribe(
      (task: Task) => {
        this.selectedTask = task;
      }
    );
  }

}
