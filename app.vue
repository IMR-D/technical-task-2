<template>
  <div>
    <NuxtLayout :clients>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
import { getClients } from "@/composables/useClients";

const { data } = await getClients();

const clients = computed(() => {
  if (data?.value?.data?.length) {
    return data.value.data;
  } else return [];
});
</script>

<style>
body {
  background-color: #ececec;
  margin: 0;
  padding: 0;
}
</style>
