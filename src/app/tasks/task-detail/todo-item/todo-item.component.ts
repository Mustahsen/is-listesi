import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../../models/item.model';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() item: Item;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  onSelected() {
  }
}
