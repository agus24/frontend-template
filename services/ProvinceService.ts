import { Todo } from "~/models/Todo";
import type { Todo as TodoResponse } from "~/types/ApiResponse";

export const ProvinceService = {
  async get() {
    const api = useApi();

    try {
      const { data } = await api.get({url: "/api/v1/area/provinces"})
      console.log(data);
      
    } catch (error) {
      throw error;
    }
  },
  async update(todo: Todo) {
    const api = useApi();
    const { data } = await api.patch<any>({url: `/todos/${todo.id}`, params: todo.getForUpdate()});
  },
}
