import { Province } from "~/models/Province";
import { ProvinceService } from "~/services/ProvinceService";
import type { ProvinceResponse } from "~/types/ApiResponse";

export const useProvince = defineStore('province', {
  state: () => ({
    provinces: <Province[]>[],
  }),
  actions: {
    async get() {
      const api = useApi();
      const pagination = usePagination();

      const {data, response} = await api.get<ProvinceResponse[]>({url: "/api/v1/area/provinces", params: {
        page: pagination.meta.current_page
      }});

      this.provinces = data.map(item => Province.fromJson(item));
      pagination.applyPagination(response.data.meta);
    }
  }
});
