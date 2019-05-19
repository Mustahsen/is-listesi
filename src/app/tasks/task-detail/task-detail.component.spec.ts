import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TaskDetailComponent } from './task-detail.component';
import { FormsModule } from '@angular/forms';
import { HttpHandler } from '@angular/common/http';
import { HttpErrorHandler } from 'src/app/http-error-handler.service';
import { MessageService } from 'src/app/message.service';

describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDetailComponent ],
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
    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
