<script setup>
import { getClientById } from "@/composables/useClients.js";

definePageMeta({
  middleware: [
    function ({ params }) {
      const users = useLocalStorage().getData("allUsers") ?? [];
      if (!users.length) return;
      const clientExists = users.some((client) => +client.id === +params.id);

      if (!clientExists) {
        return navigateTo("/");
      }
    },
  ],
});

const route = useRoute();

const { data } = await getClientById(route.params.id);

const client = computed(() => {
  if (data?.value?.data) {
    return data.value.data;
  } else return [];
});
</script>

<template>
  <ClientCard :client />
</template>

<style scoped></style>
