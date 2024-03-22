<script setup>
import { ref } from "vue";

defineProps({
  clients: {
    type: Array,
    default: () => [],
  },
});
const isOpen = ref(true);
</script>

<template>
  <div>
    <Sidebar
      v-model:open="isOpen"
      class="sidebar"
      :class="{ 'sidebar--open': isOpen }"
      :clients
    />
    <div :class="{ 'content--compressed': isOpen }" class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  height: 100vh;
  transition: padding-left 0.3s ease;
  justify-content: center;
  align-items: center;
}

.content--compressed {
  padding-left: 300px;
}

.sidebar {
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.sidebar--open {
  transform: translateX(0);
}

@media screen and (max-width: 769px) {
  .content--compressed {
    padding-left: 0;
  }
}
</style>
