import { Item } from './item.model';

export class Task {
    public id: number;
    public name: string;
    public itemList: Item[];
  
    constructor(id: number, name: string, itemList: Item[]) {
        this.id = id;
        this.name = name;
        this.itemList = itemList;
    }
  }
  