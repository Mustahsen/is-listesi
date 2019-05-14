import { Task } from './task.model'
import { EventEmitter } from '@angular/core';
import { ToDoItem } from './todoitem.model';
import { Subject } from 'rxjs';

export class TaskService{
    taskSelected = new EventEmitter<Task>();
    toDoItemSelected = new EventEmitter<ToDoItem>();
    toDoItemsChanged = new Subject<ToDoItem[]>();
    tasksChanged = new Subject<Task[]>();
    toDoItemEditStarted = new Subject<number>();
    taskEditStarted = new Subject<number>();

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

    getTask(index: number){
        return this.tasks[index];
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

    updateToDoItem(task: Task, index: number, toDoItem: ToDoItem) {
        task.todoitems[index] = toDoItem;
        this.toDoItemsChanged.next(task.todoitems.slice());
    }

    deleteToDoItem(task: Task, index: number) {
        task.todoitems.splice(index, 1);
        this.toDoItemsChanged.next(task.todoitems.slice());
    }

    addTask(task: Task) {
        this.tasks.push(task);
        this.tasksChanged.next(this.tasks.slice());
    }

    updateTask(task: Task, index: number) {
        this.tasks[index] = task
        this.tasksChanged.next(this.tasks.slice());
    }

    deleteTask(index: number) {
        this.tasks.splice(index, 1);
        this.tasksChanged.next(this.tasks.slice());
    }
}