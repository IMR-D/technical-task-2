<template>
  <aside class="sidebar">
    <div class="sidebar__header">
      <button class="sidebar__toggle" @click="open = !open">
        <img
          v-show="!open"
          src="@/assets/svg/caretRightIcon.svg"
          alt="Open sidebar"
        />
        <img
          v-show="open"
          src="@/assets/svg/caretLeftIcon.svg"
          alt="Close sidebar"
        />
        <img
          class="sidebar__toggle-close"
          src="@/assets/svg/closeIcon.svg"
          alt="Close sidebar"
        />
      </button>
      <SwitchBtn v-model:tab="currentTab" class="sidebar__switch" />
      <SearchInput
        v-show="currentTab === 0"
        v-model:searchQuery="searchQuery"
        class="sidebar__search-input"
      />
    </div>
    <div class="sidebar__users-wrapper">
      <div aria-label="Users navigation" class="sidebar__users-list">
        <div v-if="!sortedClients.length" class="sidebar__users--warning">
          Users are missing
        </div>
        <ul v-else class="sidebar__users">
          <li v-for="client in sortedClients" :key="client.id">
            <ClientListItem :client :current-tab />
          </li>
        </ul>
      </div>
      <button
        v-show="currentTab === 0"
        class="sidebar__update-list"
        @click="getClients()"
      >
        Update list
      </button>
    </div>
  </aside>
</template>

<script setup>
import { defineModel } from "vue";
import ClientListItem from "@/components/ClientListItem.vue";
import SwitchBtn from "@/components/SwitchBtn.vue";
import SearchInput from "@/components/SearchInput.vue";
import {
  filterData,
  sortByPointsAndLastName,
  sortByProperty,
} from "@/utils/sorting.js";
import { getClients } from "~/composables/useClients.js";

const props = defineProps({
  clients: {
    type: Array,
    default: () => [],
  },
});

const currentTab = ref(0);
const searchQuery = ref("");
const open = defineModel("open");

const sortedClients = computed(() => {
  const property = currentTab.value === 0 ? "last_name" : "points";
  const filteredClients = filterData(props.clients, searchQuery.value);
  return property === "last_name"
    ? sortByProperty(filteredClients, property)
    : sortByPointsAndLastName(props.clients);
});
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 300px;
  background: white;
  box-shadow: 5px 0 5px rgba(0, 0, 0, 0.1);
}
.sidebar__header {
  background-color: #a2d8f1;
  padding: 24px;
}
.sidebar__toggle {
  position: absolute;
  cursor: pointer;
  right: 0;
  top: 24px;
  height: 40px;
  width: 24px;
  background-color: #a2d8f1;
  border: transparent;
  border-bottom-right-radius: 12px;
  border-top-right-radius: 12px;
  transform: translateX(100%);
}
.sidebar__toggle-close {
  cursor: pointer;
  position: absolute;
  right: 34px;
  top: -20px;
  visibility: hidden;
}
.sidebar__users {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.sidebar__switch {
  margin-bottom: 12px;
}
.sidebar__users-list {
  background-color: white;
  height: 100%;
  max-height: calc(100vh - 128px);
  overflow: auto;
}
.sidebar__users--warning {
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 128px);
}
.sidebar__users-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 128px);
}
.sidebar__update-list {
  height: 40px;
  margin: 8px;
  background-color: #007bff;
  cursor: pointer;
  color: white;
  border: transparent;
  &:hover {
    background-color: #0056b3;
  }
}
@media screen and (max-width: 769px) {
  .sidebar__toggle-close {
    visibility: visible;
  }
  .sidebar {
    width: 100%;
  }
  .sidebar__users-list {
    height: 100%;
  }
}
</style>
