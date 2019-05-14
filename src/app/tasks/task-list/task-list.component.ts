import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Output() taskWasSelected = new EventEmitter<Task>();
  tasks: Task[];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

  onTaskSelected(task: Task) {
    this.taskWasSelected.emit(task);
   }
}
