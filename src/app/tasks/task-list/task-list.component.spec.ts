import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpHandler } from '@angular/common/http';
import { HttpErrorHandler } from 'src/app/http-error-handler.service';
import { MessageService } from 'src/app/message.service';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskListComponent ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        HttpHandler,
        HttpErrorHandler,
        MessageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
