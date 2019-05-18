import { Injectable } from '@angular/core';
import {User} from "../models/user.model";
import {AppComponent} from "../app.component";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../http-error-handler.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
  registerUrl = 'http://localhost/register';
  private handleError: HandleError;

  constructor(public http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('TaskService');
  }

  createUser (user: User): Observable<User> {
    
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');

    return this.http.post<User>(this.registerUrl, user, { headers })
        .pipe(
            catchError(this.handleError('createUser', user))
        );
  }
}