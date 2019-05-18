import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Task } from '../models/task.model';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

@Injectable({
    providedIn: 'root',
})
export class TaskService{
    taskListUrl = 'http://localhost/task-list/';  // URL to web api
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

    getTask (task: Task){
        const  params = new  HttpParams().set('id', task.id.toString());
        return this.http.get(this.taskListUrl, {params})
            .pipe(
                catchError(this.handleError('getTask', []))

            );
    }

    addTask (task: Task): Observable<Task> {
        return this.http.post<Task>(this.taskListUrl, task)
            .pipe(
                catchError(this.handleError('addTask', task))
            );
    }

    updateTask (task: Task): Observable<Task> {
        const  params = new  HttpParams().set('id', task.id.toString());
        return this.http.put<Task>(this.taskListUrl, task, { params })
            .pipe(
                catchError(this.handleError('updateTask', task))
            );

    }

    deleteTask(task: Task) {
        const  params = new  HttpParams().set('id', task.id.toString());
        return this.http.delete<Task>(this.taskListUrl, { params })
            .pipe(
                catchError(this.handleError('deleteTask', task))
            );
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