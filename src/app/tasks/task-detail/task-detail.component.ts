import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  items: Item[];
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
            this.itemService.sendItemsMessage(undefined);
          }else{
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
    this.itemService.addItem(this.task, newItem)
      .subscribe(Item => {
            this.taskService.fetchTask(this.task);
      });
  }

  updateItem (task: Task, item: Item) {
    this.itemService.updateItem(task, item)
      .subscribe(Item => {
        const ix = Item ? this.task.itemList.findIndex(t => t.id === Item.id) : -1;
        if (ix > -1) { this.task.itemList[ix] = Item; }
      });
    this.editItem = undefined;
  }

  deleteItem(): void {
    this.items = this.items.filter(i => i !== this.editItem);
    this.itemService.deleteItem(this.editItem).subscribe();
    this.onClear();
  }

  onSubmit(form: NgForm) {
    const name = form.value.name;
    const deadline = form.value.deadline;
    const status = form.value.status;
    const dependentItemId = form.value.dependentItemId;
    if (this.editItem) {
      this.editItem.name = name;
      this.editItem.deadline = deadline;
      this.editItem.status = status;
      this.editItem.dependentItemId = dependentItemId;
      this.updateItem(this.task, this.editItem);
    } else {
      this.addItem(name, deadline, status, dependentItemId);
    }
  }

  onEditItem(item){
    this.editItem = item;
    this.form.controls['name'].setValue(this.editItem.name);
    this.form.controls['deadline'].setValue(this.editItem.deadline);
    this.form.controls['status'].setValue(this.editItem.status);
    if(this.editItem.dependentItemId) this.form.controls['dependentItemId'].setValue(this.editItem.dependentItemId);
    this.itemService.sendSelectedItemMessage(this.editItem);
  }

  onClear(){
    this.editItem = undefined;
    this.form.controls.name.reset();
    this.itemService.sendSelectedItemMessage(this.editItem);
  }


}
