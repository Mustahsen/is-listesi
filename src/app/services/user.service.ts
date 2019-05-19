import { Injectable } from '@angular/core';
import {User} from "../models/user.model";
import {AppComponent} from "../app.component";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
  registerUrl = 'https://calm-oasis-87327.herokuapp.com/generateUser';
  //registerUrl = 'http://localhost/generateUser'; test

  constructor(public http: HttpClient) {
  }

  createUser (user: User): Observable<User> {
    
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');

    return this.http.post<User>(this.registerUrl, user, { headers })
  }
}