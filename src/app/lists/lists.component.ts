import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { List } from './list.model';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  selectedList: List;

  @Output() listWasSelected = new EventEmitter<List>();
  lists: List[] = [
    new List(1, 'A Test List'),
    new List(2, 'Another Test List')    
  ];

  constructor() { }

  ngOnInit() {
  }

  onListSelected(list: List) {
    this.selectedList = list;
  }

}
