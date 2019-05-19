import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Item } from '../models/item.model';
import { Task } from '../models/task.model';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

@Injectable({
    providedIn: 'root',
})
export class ItemService{
    itemUrl = 'https://calm-oasis-87327.herokuapp.com/items/';
    //itemUrl = 'http://localhost/items/'; test
    private subjectSingular = new Subject<Item>();
    private subjectPlural = new Subject<Item[]>();
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('ToDoService');
    }

    
    getItems (task: Task): Observable<Item[]> {
        const  params = new  HttpParams().set('toDoListId', task.id.toString());
        return this.http.get<Item[]>(this.itemUrl + 'all/')
            .pipe(
                catchError(this.handleError('getItems', []))
            );
    }

    getItem (Item: Item){
        const  params = new  HttpParams().set('itemId', Item.id.toString());
        return this.http.get(this.itemUrl, {params});
    }

    addItem (task: Task, Item: Item): Observable<Item> {
        const  params = new  HttpParams().set('toDoListId', task.id.toString());
        return this.http.post<Item>(this.itemUrl, Item, { params });
    }

    updateItem (task: Task, item: Item): Observable<Item> {
        const  params = new  HttpParams().set('toDoListId', task.id.toString());
        return this.http.put<Item>(this.itemUrl, item, { params });

    }

    deleteItem(Item: Item) {
        const  params = new  HttpParams().set('itemId', Item.id.toString());
        return this.http.delete<Item>(this.itemUrl, { params });
    }

    sendItemsMessage(items: Item[]){
        this.subjectPlural.next(items);
    }

    getItemsMessage(): Observable<Item[]> {
        return this.subjectPlural.asObservable();
    }
}