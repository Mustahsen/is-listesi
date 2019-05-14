import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { ToDoItem } from '../todoitem.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  @Input() task: Task;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  onAddToDoItem() {
    const id = 3
    const name = 'new TODO Item';
    const deadline = new Date();
    const status = false;
    const dependentItemId = null;
    const toDoItem = new ToDoItem(id, name, deadline, status, dependentItemId);
    this.taskService.onToDoItemAdded(this.task, toDoItem);
  }


}
