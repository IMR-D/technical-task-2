<script setup>
import { useLocalStorage } from "@/composables/useLocalStorage.js";

const props = defineProps({
  client: {
    type: Object,
    required: true,
  },
  currentTab: {
    type: Number,
    default: 0,
  },
});

const fullName = computed(() => {
  const fname = props.client?.first_name ? props.client?.first_name : "";
  const lname = props.client?.last_name ? props.client?.last_name : "";
  return fname + " " + lname;
});

const userPoints = computed(() => {
  const clientsInfo = useLocalStorage().getData("clientsInfo");
  if (clientsInfo && Object.keys(clientsInfo).length) {
    if (clientsInfo[props.client.id]) {
      return clientsInfo[props.client.id].points;
    }
  }
  return 0;
});
</script>

<template>
  <NuxtLink
    :to="`/client/${client.id}`"
    aria-label="Go to profile of {{ fullName }}"
    class="clients-list-item__nav-link"
  >
    <div class="clients-list-item__user-info">
      <span v-if="currentTab" class="clients-list-item__user-points">
        {{ userPoints }}
      </span>
      <img
        v-else
        :alt="`Avatar of ${fullName}`"
        :src="client.avatar"
        class="clients-list-item__user-avatar"
      />
      <span class="clients-list-item__user-name">{{ fullName }}</span>
    </div>
    <img
      class="clients-list-item__icon"
      src="@/assets/svg/caretRightIcon.svg"
      alt="caret right icon"
    />
  </NuxtLink>
</template>

<style scoped>
.clients-list-item__nav-link {
  display: flex;
  height: 100%;
  width: 100%;
  text-decoration: none;
  color: black;
  justify-content: space-between;
  border-top: 1px solid black;
  padding-top: 8px;
  padding-bottom: 8px;
  min-height: 80px;
}
.clients-list-item__nav-link:hover {
  background-color: rgba(204, 204, 204, 0.26);
}

.clients-list-item__user-info {
  display: flex;
  align-items: center;
}
.clients-list-item__user-avatar {
  height: 60px;
  width: 60px;
  border-radius: 12px;
  margin-right: 16px;
  margin-left: 16px;
}
.clients-list-item__user-name {
  font-size: 18px;
  font-weight: bold;
}
.clients-list-item__user-points {
  font-size: 24px;
  font-weight: bold;
  margin-right: 16px;
  margin-left: 16px;
}
.clients-list-item__icon {
  margin-right: 12px;
}
.router-link-active {
  background-color: rgba(204, 204, 204, 0.26);
}
</style>
