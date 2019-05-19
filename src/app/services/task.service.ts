import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Task } from '../models/task.model';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root',
})
export class TaskService{
    taskListUrl = 'https://calm-oasis-87327.herokuapp.com/task-list/';
    //taskListUrl = 'http://localhost/task-list/'; test
    private subject = new Subject<Task>();
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('TaskService');
    }

    getTasks (): Observable<Task[]> {
        return this.http.get<Task[]>(this.taskListUrl + 'all/')
            .pipe(
                catchError(this.handleError('getTasks', []))
            );
    }

    getTasksForUser (): Observable<Task[]> {
        const  params = new  HttpParams().set('username', sessionStorage.getItem('username'));
        return this.http.get<Task[]>(this.taskListUrl + 'user/', { params })
            .pipe(
                catchError(this.handleError('getTasks', []))
            );
    }

    getTask (task: Task){
        const  params = new  HttpParams().set('id', task.id.toString());
        return this.http.get(this.taskListUrl, {params})
            .pipe(
                catchError(this.handleError('getTask', []))

            );
    }

    addTask (task: Task): Observable<Task> {
        const  params = new  HttpParams().set('username', sessionStorage.getItem('username'));
        return this.http.post<Task>(this.taskListUrl, task, { params });
    }

    updateTask (task: Task): Observable<Task> {
        const  params = new  HttpParams().set('id', task.id.toString()).set('username', sessionStorage.getItem('username'));
        return this.http.put<Task>(this.taskListUrl, task, { params });

    }

    deleteTask(task: Task) {
        const  params = new  HttpParams().set('id', task.id.toString());
        return this.http.delete<Task>(this.taskListUrl, { params });
    }

    fetchTask(task: Task){
        this.getTask(task).subscribe(
            (task: Task) => {
                this.sendSelectedTaskMessage(task);
            }
        );
    }

    sendSelectedTaskMessage(task: Task){
        this.subject.next(task);
    }

    getSelectedTaskMessage(): Observable<Task> {
        return this.subject.asObservable();
    }

}