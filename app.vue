<script lang="ts" setup>
const _controller = useProvince();
const _pagination = usePagination();

onMounted(() => {
  getData()
})

function getData() {
  _controller.get().then(() => {
    console.log(_pagination.meta);
  });
}
</script>

<template>
  <div>
    <table>
      <thead>
        <th>No</th>
        <th>Name</th>
      </thead>
      <tbody>
        <tr v-for="(province, index) in _controller.provinces" :key="province.id">
          <td>{{ index + 1 }}</td>
          <td>{{ province.name }}</td>
        </tr>
      </tbody>
    </table>
    <div>
      <Pagination @changePage="getData()" />
    </div>
  </div>
  <div>
    <button @click="_controller.update">update</button>
  </div>
</template>
