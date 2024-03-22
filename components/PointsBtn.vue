<script setup>
const points = defineModel("points");

function increasePoint() {
  points.value++;
}

function decreasePoint() {
  points.value--;
}
</script>

<template>
  <div class="points-btn">
    <button @click="decreasePoint">-</button>
    <span>{{ points }} points</span>
    <button @click="increasePoint">+</button>
  </div>
</template>

<style scoped>
.points-btn {
  padding: 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  background-color: #e1e1e1;

  button {
    background-color: white;
    border-radius: 8px;
    width: 34px;
    height: 34px;
    cursor: pointer;
    border: transparent;
    &:hover {
      background-color: #0ea5e9;
      color: white;
    }
  }
}
</style>
