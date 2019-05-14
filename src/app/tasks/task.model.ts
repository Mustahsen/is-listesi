import { ToDoItem } from './todoitem.model';

export class Task {
    public id: number;
    public name: string;
    public todoitems: ToDoItem[];
  
    constructor(id: number, name: string, todoitems: ToDoItem[]) {
        this.id = id;
        this.name = name;
        this.todoitems = todoitems;
    }
  }
  