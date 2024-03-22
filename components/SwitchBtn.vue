<script setup>
import { defineModel } from "vue";

defineProps({
  tabs: {
    type: Array,
    default: () => ["clients", "rating"],
  },
});
const currentTab = defineModel("tab");
</script>

<template>
  <div class="switch-container">
    <div class="switch-btn-wrapper">
      <button
        v-for="(tab, index) in tabs"
        :key="tab + index"
        class="switch-btn"
        @click="currentTab = index"
      >
        <span class="switch-btn-text">{{ tab }}</span>
      </button>
      <div
        :style="{ left: !currentTab ? '0%' : '50%' }"
        class="switch-indicator"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.switch-container {
  display: flex;
  position: relative;
  border-radius: 4px;
  padding: 2px;
  background-color: #b7dbec;
}

.switch-btn-wrapper {
  position: relative;
  width: 100%;
  display: flex;
}

.switch-btn {
  position: relative;
  width: 50%;
  border-radius: 4px;
  cursor: pointer;
  height: 32px;
  background-color: #b7dbec;
  border-color: transparent;
}

.switch-btn-text {
  position: absolute;
  text-transform: capitalize;
  top: 50%;
  left: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
}

.switch-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50%;
  border-radius: 4px;
  height: 32px;
  background-color: rgb(255, 255, 255);
  transition: left 0.3s ease;
}
</style>
