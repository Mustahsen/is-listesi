import { Component, OnInit, Input } from '@angular/core';
import { ToDoItem } from '../../../models/todoitem.model';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todoitem: ToDoItem;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  onSelected() {
  }
}
