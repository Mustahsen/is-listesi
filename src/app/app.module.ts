import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './/login/login.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';
import { TaskItemComponent } from './tasks/task-list/task-item/task-item.component';
import { TodoItemComponent } from './tasks/task-detail/todo-item/todo-item.component';


import { ItemService } from './services/item.service';
import { TaskService } from './services/task.service';
import { HttpErrorHandler }     from './http-error-handler.service';
import { MessageService }       from './message.service';
import { AuthenticationService } from './services/authentication.service';
import { LogoutComponent } from './logout/logout.component';
import { AuthorizationGuardService } from './services/authorizationGuard.service';
import { RegisterComponent } from './register/register.component';
import { UserService } from './services/user.service';

const routes: Routes = [
  { path: '', component: TasksComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    TasksComponent,
    TaskListComponent,
    TaskDetailComponent,
    TaskItemComponent,
    TodoItemComponent,
    LogoutComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    HttpErrorHandler,
    MessageService,
    TaskService, 
    ItemService,
    AuthenticationService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


