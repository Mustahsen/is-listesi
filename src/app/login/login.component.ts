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
  model: any = {};
  errorMessage: string;

  constructor(private http: HttpClient, private router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.authenticationService.authenticate(this.model.username, this.model.password).subscribe(
      data => {
        this.errorMessage = undefined;
        sessionStorage.setItem('username', this.model.username);
        sessionStorage.setItem('password', this.model.password);
        console.log(data);
        this.router.navigate(['']);
      },
      error => {
        if(error.status == 401){
          this.errorMessage = "Invalid Credentials";
        }else{
          this.errorMessage = "Unknown error occured, please try again later!";
        }
      });
  }
}
