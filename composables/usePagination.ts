import type { Meta } from "~/types/Responses";

export const usePagination = defineStore('pagination', {
  state: () => ({
    meta: <Meta>{},
  }),
  actions: {
    applyPagination(meta: Meta) {
      console.log(meta);
      this.meta = meta;
    },
    getCurrentPage() {
      return this.meta.current_page;
    },
    getNextApiCall(index: number) {
      return this.meta.links[index];
    },
    changePage(page: number|string) {
      return this.meta.current_page = typeof page == 'string' ? parseInt(page) : page;
    },
  }
});
