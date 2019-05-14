import { Component, OnInit, Input } from '@angular/core';

import { List } from '../list.model';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {
  @Input() list: List;

  constructor() { }

  ngOnInit() {
  }

}
