import type { Todo } from "~/models/Todo";
import { TodoService } from "~/services/TodoService"

export const useUser = defineStore('user', {
  state: () => ({
    name: "testasdfasdf",
    todos: <Todo[]>[]
  }),
  actions: {
    get() {
      TodoService.get().then(todos => {
        this.todos = todos;
      });
    },
    update() {
      const todo = this.todos[0];
      todo.title = "asdfasdf";
      todo.save()
    }
  }
})
