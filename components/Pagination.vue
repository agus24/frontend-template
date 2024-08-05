<script lang="ts" setup>
const _pagination = usePagination();
const emit = defineEmits(["changePage"]);

function changePage(number) {
  _pagination.changePage(number);
  emit('changePage');
}
</script>

<template>
  <ul class="flex items-center gap-4 my-4">
    <li class="cursor-pointer border rounded-lg px-4 py-2 hover:bg-blue-400" @click="changePage(_pagination.meta.current_page - 1)">Previous</li>
    <li 
      class="cursor-pointer border rounded-lg px-4 py-2 hover:bg-blue-400"
      v-for="n in _pagination.meta.last_page"
      :key="n"
      @click="changePage(n)"
      v-html="n"
    ></li>
    <li class="cursor-pointer border rounded-lg px-4 py-2 hover:bg-blue-400" @click="changePage(_pagination.meta.current_page + 1)">Next</li>
  </ul>
</template>
