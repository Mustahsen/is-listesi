import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TaskDetailComponent implements OnInit {
  model: any = {};
  items: Item[];
  dependentItems: Item[];
  editItem: Item;
  task: Task;
  @ViewChild('f') form: NgForm;

  private taskSubscription: Subscription;
  private ItemSubscription: Subscription;

  constructor(private taskService: TaskService, private itemService: ItemService) { }

  ngOnInit() {
    this.taskSubscription = this.taskService.getSelectedTaskMessage()
      .subscribe(
        (task: Task) => {
          this.task = task;
          if(!task) {
            this.items = undefined;
            this.dependentItems = undefined;
            this.itemService.sendItemsMessage(undefined);
          }else{
            this.dependentItems = this.task.itemList;
            this.itemService.sendItemsMessage(this.task.itemList);
          }
        }
    );
    this.ItemSubscription = this.itemService.getItemsMessage()
      .subscribe(
        (items: Item[]) => {
          this.items = items;
        }
      );
  }

  addItem (name: string, deadline: Date, status: boolean, dependentItemId: number): void{
    this.editItem = undefined;
    name = name.trim();
    if(!name) { return; }

    const newItem: Item = new Item(null, name, deadline, status, dependentItemId);
    this.itemService.addItem(this.task, newItem).subscribe(
      item => {
        this.model.addSuccessMessage = newItem.name;
        this.taskService.fetchTask(this.task);
      },
      error => {
        this.model.addErrorMessage = newItem.name;
      });
  }

  updateItem (task: Task, item: Item) {
    const oldName = item.name;
    item.name = this.model.name;
    item.deadline = this.model.deadline;
    item.status = this.model.status;
    item.dependentItemId = this.model.dependentItemId;

    this.itemService.updateItem(task, item).subscribe(
      response => {
        const ix = item ? this.task.itemList.findIndex(i => i.id === item.id) : -1;
        if (ix > -1) { 
          this.model.updateSuccessMessage = oldName + ' => ' + item.name;
          this.task.itemList[ix] = item; 
        }
      },
      error => {
        this.model.updateErrorMessage = item.name;
      });
    this.onClear();
  }

  deleteItem(): void {
    const item = this.editItem;
    this.itemService.deleteItem(this.editItem).subscribe(
      response => {
        this.items = this.items.filter(i => i !== item);
        this.model.deleteSuccessMessage = item.name;
      },
      error => {
        this.model.deleteErrorMessage = this.editItem.name;
      });
    this.onClear();
  }

  onSubmit(form: NgForm) {
    const index = this.model.dependentItemId ? this.dependentItems.findIndex(item => item.id.toString() === this.model.dependentItemId) : -1;
    const depentendItem = this.dependentItems[index];

    if(depentendItem && !depentendItem.status && this.model.status == false){
      this.model.updateStatusMessage = "You can't complete an item before finishing dependent one!"
      return;
    }

    if (this.editItem) {
      this.updateItem(this.task, this.editItem);
    } else {
      this.addItem(this.model.name, this.model.deadline, this.model.status, this.model.dependentItemId);
    }
  }

  onEditItem(item){
    this.editItem = item;
    this.form.controls['name'].setValue(this.editItem.name);
    this.form.controls['deadline'].setValue(this.editItem.deadline);
    this.form.controls['status'].setValue(this.editItem.status);
    this.form.controls['dependentItemId'].setValue(this.editItem.dependentItemId);

    this.dependentItems = this.items.filter(i => i.id !== this.editItem.id);

    this.itemService.sendSelectedItemMessage(this.editItem);
  }

  onClear(){
    this.editItem = undefined;
    this.model.name = undefined;
    this.model.addSuccessMessage = undefined;
    this.model.updateSuccessMessage = undefined;
    this.model.addErrorMessage = undefined;
    this.model.updateErrorMessage = undefined;
    this.model.updateStatusMessage = undefined;
    this.dependentItems = this.items;
    this.form.resetForm();
    this.itemService.sendSelectedItemMessage(this.editItem);
  }

}
