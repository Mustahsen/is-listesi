import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { User } from '../models/user.model';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    loginUrl = '/authenticateUser';
    redirectUrl: string;

    constructor(private httpClient: HttpClient) { }

    authenticate(username, password) {

        sessionStorage.removeItem('username');

        const authString = 'Basic ' + btoa(username + ':' + password);
        sessionStorage.setItem('basicauth', authString);

        const headers = new HttpHeaders({Authorization : authString});

        return this.httpClient.get(this.loginUrl, {headers: headers});
    }

    isLoggedIn() {
        let user = sessionStorage.getItem('username');
        return !(user === null);
    }

    logOut() {
        sessionStorage.removeItem('username');
    }
}