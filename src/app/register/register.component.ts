import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  errorMessage: string;
  
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    const user = new User();
    user.username = this.model.username
    user.email = this.model.email;
    user.password = this.model.password;
    this.userService.createUser(user).subscribe(
      data => {
        this.errorMessage = undefined;
        this.router.navigate(['/login']);
      }, error => {
        if(error.status == 409){
          this.errorMessage = "Username already exists!";
        }else{
          this.errorMessage = "Unknown error occured, please try again later!";
        }
      }
    )
  }
}
