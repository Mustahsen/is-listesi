export class Item {
    public id: number;
    public name: string;
    public deadline: Date;
    public status: boolean;
    public dependentItemId: number;
  
    constructor(id: number, name: string, deadline: Date, status: boolean, dependentItemId: number) {
        this.id = id;
        this.name = name;
        this.deadline = deadline;
        this.status = status;
        this.dependentItemId = dependentItemId;
    }
  }
  