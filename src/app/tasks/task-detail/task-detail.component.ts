import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';

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
  itemNames: {};
  dependentItems: Item[];
  editItem: Item;
  task: Task;
  @ViewChild('f') form: NgForm;

  nameOrderAsc: boolean = true;
  descriptionOrderAsc: boolean = true;
  statusOrderAsc: boolean = true;
  deadlineOrderAsc: boolean = true;
  dependentItemOrderAsc: boolean = true;

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
            this.itemNames = undefined;
            this.itemService.sendItemsMessage(undefined);
          }else{
            this.dependentItems = this.task.itemList;
            if(this.items){
              this.itemNames = {}
              this.items.forEach(element => {
                this.itemNames[element.id] = element.name;
              });
            }
            this.itemService.sendItemsMessage(this.task.itemList);
          }
        }
    );
    this.ItemSubscription = this.itemService.getItemsMessage()
      .subscribe(
        (items: Item[]) => {
          this.items = items;
          this.dependentItems = this.task ? this.task.itemList : undefined;
          if(items){
            this.itemNames = {}
            items.forEach(element => {
              this.itemNames[element.id] = element.name;
            });
          }

        }
      );
  }

  addItem (name: string, deadline: Date, description: string, status: boolean, dependentItemId: number): void{
    this.editItem = undefined;
    name = name.trim();
    if(!name) { return; }

    const newItem: Item = new Item(null, name, deadline, description, status, dependentItemId);
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
    item.dependentItemId = this.model.dependentItemId == 0 ? undefined : this.model.dependentItemId;

    this.itemService.updateItem(task, item).subscribe(
      response => {
        const ix = item ? this.task.itemList.findIndex(i => i.id.toString() === item.id.toString()) : -1;
        if (ix > -1) { 
          this.model.updateSuccessMessage = oldName + ' => ' + item.name;
          this.task.itemList[ix] = item; 
          this.taskService.fetchTask(this.task);
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
    const index = this.model.dependentItemId ? this.dependentItems.findIndex(item => item.id.toString() === this.model.dependentItemId.toString()) : -1;


    if(index !== -1 && this.dependentItems[index].status === false && this.model.status === 'true'){
      console.log(this.dependentItems[index].status);
      this.model.updateStatusMessage = "You can't complete an item before finishing dependent one!";
      return;
    }

    if (this.editItem) {
      this.updateItem(this.task, this.editItem);
    } else {
      this.addItem(this.model.name, this.model.deadline, this.model.description, this.model.status, this.model.dependentItemId == 0 ? undefined : this.model.dependentItemId );
    }
  }

  onEditItem(item){
    if(item === this.editItem){
      this.editItem == undefined;
      this.onClear();
    }else{
      this.editItem = item;
      this.form.controls['name'].setValue(this.editItem.name);
      this.form.controls['deadline'].setValue(this.editItem.deadline);
      this.form.controls['description'].setValue(this.editItem.description);
      this.form.controls['status'].setValue(this.editItem.status);
      this.form.controls['dependentItemId'].setValue(this.editItem.dependentItemId);
  
      this.dependentItems = this.task.itemList.filter(i => i.id !== this.editItem.id);

      this.itemService.sendSelectedItemMessage(this.editItem);
    }
  }

  onSearch(){
    const filteredItemList : Item[] = [];

    for(let item of this.task.itemList){
      if(this.model.name){
        if (!item.name){
          continue;
        }else if(!item.name.includes(this.model.name)){
          continue;
        }
      }
      if(this.model.deadline){
        if (!item.deadline){
          continue;
        }else if(!(item.deadline.valueOf() === this.model.deadline.valueOf())){
          continue;
        }
      }
      if(this.model.description){
        if (!item.description){
          continue;
        }else if(!item.description.includes(this.model.description)){
          continue;
        }
      }
      if(this.model.status){
        if (item.status.toString() !== this.model.status){
          continue;
        }
      }
      if(this.model.dependentItemId){
        if (!item.dependentItemId){
          continue;
        }else if(item.dependentItemId.toString() !== this.model.dependentItemId){
          continue;
        }
      }
      filteredItemList.push(item);
    }
    this.itemService.sendItemsMessage(filteredItemList);
  }

  onClear(){
    this.editItem = undefined;
    this.model.name = undefined;
    this.model.addSuccessMessage = undefined;
    this.model.updateSuccessMessage = undefined;
    this.model.addErrorMessage = undefined;
    this.model.updateErrorMessage = undefined;
    this.model.updateStatusMessage = undefined;
    this.items = this.task ? this.task.itemList : null;
    this.dependentItems = this.items;
    this.form.resetForm();
    this.itemService.sendSelectedItemMessage(this.editItem);
  }

  private sortStringAscendingNullValuesAtTheEnd(a: string, b: string){
    if(a && b){
      if(a > b) {
        return 1;
      } else if(a < b) {
        return -1;
      } else {
        return 0;
      }
    } else if (a) {
      return -1;
    } else if (b) {
      return 1;
    } else {
      return 0;
    }
  }

  private sortBooleanAscending(a: boolean, b: boolean){
    if(a && b){
      return 0;
    } else if (a){
      return 1;
    } else {
      return -1;
    }
  }

  onColumnClick(column){

    if(!this.items) return;

    if(column === "name"){
      if(this.nameOrderAsc){
        this.items.sort((a, b) => this.sortStringAscendingNullValuesAtTheEnd(a.name, b.name));
        this.nameOrderAsc = false;
      } else{
        this.items.sort((a, b) => this.sortStringAscendingNullValuesAtTheEnd(b.name, a.name));
        this.nameOrderAsc = true;
      }
    } else if(column === "description"){
      if(this.descriptionOrderAsc){
        this.items.sort((a, b) => this.sortStringAscendingNullValuesAtTheEnd(a.description, b.description));
        this.descriptionOrderAsc = false;
      } else{
        this.items.sort((a, b) => this.sortStringAscendingNullValuesAtTheEnd(b.description, a.description));
        this.descriptionOrderAsc = true;
      }
    } else if(column === "status"){
      if(this.statusOrderAsc){
        this.items.sort((a, b) => this.sortBooleanAscending(a.status, b.status));
        this.statusOrderAsc = false;
      } else{
        this.items.sort((a, b) => this.sortBooleanAscending(b.status, a.status));
        this.statusOrderAsc  = true;
      }
    } else if(column === "deadline"){
      if(this.deadlineOrderAsc){
        this.items.sort(function(a,b){return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()});
        this.deadlineOrderAsc = false;
      } else{
        this.items.sort(function(a,b){return new Date(b.deadline).getTime() - new Date(a.deadline).getTime()});
        this.deadlineOrderAsc  = true;
      }
    } else if(column === "dependentItem"){
      if(this.dependentItemOrderAsc){
        this.items.sort((a, b) => this.sortStringAscendingNullValuesAtTheEnd(this.itemNames[a.dependentItemId], this.itemNames[b.dependentItemId]));
        this.dependentItemOrderAsc = false;
      } else{
        this.items.sort((a, b) => this.sortStringAscendingNullValuesAtTheEnd(this.itemNames[b.dependentItemId], this.itemNames[a.dependentItemId]));
        this.dependentItemOrderAsc = true;
      }
    }

  }

}
