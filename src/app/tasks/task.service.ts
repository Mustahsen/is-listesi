import { Task } from './task.model'

export class TaskService{
    private tasks: Task[] = [
        new Task(1, 'A Test Task'),
        new Task(2, 'Another Test Task')
    ];

    getTasks(){
        return this.tasks.slice();
    }
}