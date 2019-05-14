import { Task } from './task.model'
import { EventEmitter } from '@angular/core';

export class TaskService{
    private tasks: Task[] = [
        new Task(1, 'A Test Task', []),
        new Task(2, 'Another Test Task', [])
    ];

    getTasks(){
        return this.tasks.slice();
    }

    taskSelected = new EventEmitter<Task>();
}