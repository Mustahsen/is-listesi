import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  invalidLogin = false;

  constructor(private http: HttpClient, private router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;
    this.authenticationService.authenticate(username, password, () => {
        this.router.navigateByUrl('/');
      });
    return false;
  }
}
