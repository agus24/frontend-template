import { TodoService } from "~/services/TodoService";

export class Todo {
  constructor(
    public id: number,
    public userId: number,
    public title: string,
    public completed: boolean,
  ) {}

  static fromJson(json: Todo) {
    return new Todo(
      json.id,
      json.userId,
      json.title,
      json.completed,
    )
  }

  static get() {
    // 
  }

  getForUpdate() {
    return {
      id: this.id,
      userid: this.userId,
      title: this.title,
      completed: this.completed,
    };
  }

  getForCreate() {
    return {
      id: this.id,
      userid: this.userId,
      title: this.title,
      completed: this.completed,
    };
  }

  create() {
    TodoService.create(this);
  }

  save() {
    TodoService.update(this)
  }
}
