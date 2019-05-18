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

    authenticate(username, password) {

        sessionStorage.removeItem('username');
        sessionStorage.removeItem('basicauth');

        const authString = 'Basic ' + btoa(username + ':' + password);
        const headers = new HttpHeaders({Authorization : authString});

        return this.httpClient.get(this.loginUrl, {headers: headers}).pipe(
            map(userData => {
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('basicauth', authString);
                return userData;
            })
        );
    }

    isLoggedIn() {
        let user = sessionStorage.getItem('username');
        console.log(!(user === null))
        return !(user === null);
    }

    logOut() {
        sessionStorage.removeItem('username');
    }
}