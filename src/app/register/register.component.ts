import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  errorMessage: string;
  
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onRegister() {
    const user = new User();
    user.username = this.form.value.username;
    user.email = this.form.value.email;
    user.password = this.form.value.password;
    this.userService.createUser(user).subscribe(data => {
        console.log(data);
        this.router.navigate(['/login']);
      }, err => {
        console.log(err);
        this.errorMessage = "Username already exists!";
      }
    )
  }
}
