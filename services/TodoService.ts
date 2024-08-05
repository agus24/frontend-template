import { Todo } from "~/models/Todo";
import type { Todo as TodoResponse } from "~/types/ApiResponse";

export const TodoService = {
  async get() {
    const api = useApi();

    try {
      const { data } = await api.get<TodoResponse[]>({url: "/todos"})
      return data.map(item => Todo.fromJson(item));
    } catch (error) {
      throw error;
    }
  },

  async create(todo: Todo) {
    const api = useApi();
    const { data } = await api.post<any>({url: `/todos/${todo.id}`, params: todo.getForCreate()});
  },

  async update(todo: Todo) {
    const api = useApi();
    const { data } = await api.patch<any>({url: `/todos/${todo.id}`, params: todo.getForUpdate()});
  },
}
