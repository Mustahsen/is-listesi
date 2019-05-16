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
    ItemUrl = 'http://localhost/items/';  // URL to web api
    private subjectSingular = new Subject<Item>();
    private subjectPlural = new Subject<Item[]>();
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('ToDoService');
    }

    
    getItems (task: Task): Observable<Item[]> {
        const  params = new  HttpParams().set('toDoListId', task.id.toString());
        return this.http.get<Item[]>(this.ItemUrl + 'all/')
            .pipe(
                catchError(this.handleError('getItems', []))
            );
    }

    /*getItem (Item: Item){
        const  params = new  HttpParams().set('id', Item.id.toString());
        return this.http.get(this.ItemUrl, {params})
            .pipe(
                catchError(this.handleError('getItem', []))
            );
    }*/

    addItem (task: Task, Item: Item): Observable<Item> {
        const  params = new  HttpParams().set('toDoListId', task.id.toString());
        return this.http.post<Item>(this.ItemUrl, Item, { params })
            .pipe(
                catchError(this.handleError('addItem', Item))
            );
    }

    updateItem (task: Task, item: Item): Observable<Item> {
        const  params = new  HttpParams().set('toDoListId', task.id.toString());
        return this.http.put<Item>(this.ItemUrl, item, { params })
            .pipe(
                catchError(this.handleError('updateItem', item))
            );

    }

    deleteItem(Item: Item) {
        const  params = new  HttpParams().set('itemId', Item.id.toString());
        return this.http.delete<Item>(this.ItemUrl, { params })
            .pipe(
                catchError(this.handleError('deleteItem', Item))
            );
    }

    sendSelectedItemMessage(item: Item){
        this.subjectSingular.next(item);
    }

    getSelectedItemMessage(): Observable<Item> {
        return this.subjectSingular.asObservable();
    }

    sendItemsMessage(items: Item[]){
        this.subjectPlural.next(items);
    }

    getItemsMessage(): Observable<Item[]> {
        return this.subjectPlural.asObservable();
    }
}