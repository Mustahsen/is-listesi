import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { List } from '../list.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() list: List;
  @Output() listSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onSelected() {
    this.listSelected.emit();
  }

}
