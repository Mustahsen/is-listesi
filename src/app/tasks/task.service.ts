import { Task } from './task.model'
import { EventEmitter } from '@angular/core';
import { ToDoItem } from './todoitem.model';

export class TaskService{
    private tasks: Task[] = [
        new Task(1, 'A Test Task', [{id: 1, 
                                     name: 'ToDo Item', 
                                     deadline: new Date(), 
                                     status: true, 
                                     dependentItemId: null},
                                     {id: 2, 
                                        name: 'ToDo Item2', 
                                        deadline: new Date(), 
                                        status: false, 
                                        dependentItemId: null}]),

        new Task(2, 'Another Test Task', [])
    ];

    getTasks(){
        return this.tasks.slice();
    }

    taskSelected = new EventEmitter<Task>();
    toDoItemSelected = new EventEmitter<ToDoItem>();

    onToDoItemAdded(selectedTask: Task, toDoItem: ToDoItem){
        selectedTask.todoitems.push(toDoItem);
    }
}