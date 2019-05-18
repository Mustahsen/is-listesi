import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { User } from '../models/user.model';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    loginUrl = 'http://localhost/login';

    constructor(private httpClient: HttpClient) { }

    authenticate(username, password, callback) {

        const headers = new HttpHeaders({Authorization : 'Basic ' + btoa(username + ':' + password)});

        this.httpClient.get(this.loginUrl, {headers: headers}).subscribe(response => {
            console.log(username);
            console.log(response);
            if (response['name']) {
            } else {
            }
            return callback && callback();
        });
    }

    isLoggedIn() {
        let user = sessionStorage.getItem('username');
        return !(user === null);
    }

    logOut() {
        sessionStorage.removeItem('username');
    }
}