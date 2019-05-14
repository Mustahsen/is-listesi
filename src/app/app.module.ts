import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppService } from './app.service';
import { HomeComponent } from './/home/home.component';
import { LoginComponent } from './/login/login.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';
import { TaskItemComponent } from './tasks/task-list/task-item/task-item.component';
import { TodoItemComponent } from './tasks/task-detail/todo-item/todo-item.component';

const routes: Routes = [
  { path: '', component: TasksComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    TasksComponent,
    TaskListComponent,
    TaskDetailComponent,
    TaskItemComponent,
    TodoItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }


