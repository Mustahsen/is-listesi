import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TaskDetailComponent } from './task-detail.component';
import { FormsModule, ReactiveFormsModule, NgForm, FormBuilder } from '@angular/forms';
import { HttpHandler } from '@angular/common/http';
import { HttpErrorHandler } from 'src/app/http-error-handler.service';
import { MessageService } from 'src/app/message.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { formatNumber } from '@angular/common';

describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDetailComponent ],
      imports: [
        FormsModule,
        HttpClientTestingModule
      ],
      providers: [
        HttpHandler,
        HttpErrorHandler,
        MessageService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges()
  }));

  beforeEach(() => {

    debugElement = fixture.debugElement.query(By.css('form'));
    htmlElement = debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should call the onSubmit method`, async(() => {
    spyOn(component, 'onSubmit');
    htmlElement = fixture.debugElement.query(By.css('button')).nativeElement;
    htmlElement.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(0);
  }));

  it(`form should be invalid`, async(() => {
    component.model.name = '';
    component.model.deadline = '';
    fixture.detectChanges();

    component.form.controls['name'].setValue('');
    component.form.controls['deadline'].setValue('');

    expect(component.form.valid).toBeFalsy();
  }));

  it(`form should be valid`, async(() => {
    component.model.name = 'test name';
    component.model.deadline = new Date();
    fixture.detectChanges();

    component.form.controls['name'].setValue('test name');
    component.form.controls['deadline'].setValue(new Date());

    expect(component.form.valid).toBeTruthy();
  }));



});
