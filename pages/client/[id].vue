<script setup>
import { clientExpansion, getClientById } from "@/composables/useClients.js";

definePageMeta({
  middleware: ["route-middleware"],
});

const route = useRoute();

const { data } = await getClientById(route.params.id);

const client = computed(() => {
  if (data.value) {
    return clientExpansion(data.value.data, ["points", "comment"]);
  } else return [];
});
</script>

<template>
  <ClientCard :client />
</template>

<style scoped></style>
