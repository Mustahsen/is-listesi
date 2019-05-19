import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../../models/item.model';
import { ItemService } from 'src/app/services/item.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() item: Item;
  dependentItem: Item;
  private subscription: Subscription;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.dependentItem = new Item(null, "", null, null, null);

    if(!this.item.dependentItemId) return;

    const item = new Item(this.item.dependentItemId, "", null, null, null);
    this.subscription = this.itemService.getItem(item).subscribe(
      (response: Item) => {
        this.dependentItem = response;
      }
    );
  }

  onSelected() {
  }
}
