import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ToDoItem } from '../models/todoitem.model';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

@Injectable()
export class ToDoService{
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('ToDoService');
    }

}