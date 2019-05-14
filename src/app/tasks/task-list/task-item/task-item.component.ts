import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;
  @Output() taskSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onSelected() {
    this.taskSelected.emit();
  }

}
