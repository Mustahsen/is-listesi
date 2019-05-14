import { Task } from './task.model'
import { EventEmitter } from '@angular/core';
import { ToDoItem } from './todoitem.model';
import { Subject } from 'rxjs';

export class TaskService{
    taskSelected = new EventEmitter<Task>();
    toDoItemSelected = new EventEmitter<ToDoItem>();
    toDoItemsChanged = new Subject<ToDoItem[]>();
    editStarted = new Subject<number>();

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


    onToDoItemAdded(selectedTask: Task, toDoItem: ToDoItem){
        selectedTask.todoitems.push(toDoItem);
    }

    getToDoItems(task: Task) {
        return task.todoitems.slice();
    }

    getToDoItem(task: Task, index: number) {
        return task.todoitems[index];
    }

    addToDoItem(task: Task, toDoItem: ToDoItem) {
        task.todoitems.push(toDoItem);
        this.toDoItemsChanged.next(task.todoitems.slice());
    }

    addToDoItems(task: Task, toDoItems: ToDoItem[]) {
        task.todoitems.push(...toDoItems);
        this.toDoItemsChanged.next(task.todoitems.slice());
    }

    updateIngredient(task: Task, index: number, toDoItem: ToDoItem) {
        task.todoitems[index] = toDoItem;
        this.toDoItemsChanged.next(task.todoitems.slice());
    }

    deleteIngredient(task: Task, index: number) {
        task.todoitems.splice(index, 1);
        this.toDoItemsChanged.next(task.todoitems.slice());
    }
}