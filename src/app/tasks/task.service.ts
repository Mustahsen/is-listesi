import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Task } from './task.model';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

@Injectable()
export class TaskService{
    private subject = new Subject<Task>();
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('TaskService');
    }

    getTasks (): Observable<Task[]> {
        return this.http.get<Task[]>('http://localhost/task-list')
            .pipe(
                catchError(this.handleError('getTasks', []))
            );
    }

    getTask (task: Task){
        const  params = new  HttpParams().set('id', task.id.toString());
        return this.http.get('http://localhost/task-list/', {params});
    }

    addTask (task: Task): Observable<Task> {
        return this.http.post<Task>('http://localhost/task-list/', task)
            .pipe(
                catchError(this.handleError('addTask', task))
            );
    }

    updateTask (task: Task): Observable<Task> {
        const  params = new  HttpParams().set('id', task.id.toString());
        return this.http.put<Task>('http://localhost/task-list/', task, { params })
            .pipe(
                catchError(this.handleError('updateTask', task))
            );

    }

    deleteTask(task: Task) {
        const  params = new  HttpParams().set('id', task.id.toString());
        return this.http.delete<Task>('http://localhost/task-list/', { params })
            .pipe(
                catchError(this.handleError('deleteTask', task))
            );
    }

    sendSelectedTaskMessage(task: Task){
        this.subject.next(task);
    }

    getSelectedTaskMessage(): Observable<Task> {
        return this.subject.asObservable();
    }

}