<template>
  <div>
    <NuxtLayout :clients>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
import { clientExpansion, getClients } from "@/composables/useClients";

const { data } = await getClients();

const clients = computed(() => {
  if (data.value && data.value.length) {
    data.value.data.forEach((item) => {
      clientExpansion(item, ["points", "comment"]);
    });
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
