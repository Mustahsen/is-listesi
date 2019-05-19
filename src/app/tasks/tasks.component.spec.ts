import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksComponent } from './tasks.component';
import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpErrorHandler } from '../http-error-handler.service';
import { MessageService } from '../message.service';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        TasksComponent,
        MockTaskListComponent,
        MockTaskDetailComponent
      ],
      providers: [
        TaskService,
        HttpClient,
        HttpHandler,
        HttpErrorHandler,
        MessageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'app-task-list',
  template: ''
})
class MockTaskListComponent {
}
@Component({
  selector: 'app-task-detail',
  template: ''
})
class MockTaskDetailComponent {
}
