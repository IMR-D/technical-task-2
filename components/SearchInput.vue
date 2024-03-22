<script lang="ts" setup>
const searchQuery = defineModel("searchQuery");
</script>

<template>
  <div class="search-input">
    <div class="search-icon">
      <img src="@/assets/svg/searchIcon.svg" alt="search icon" />
    </div>
    <input
      v-model="searchQuery"
      placeholder="Enter username to search"
      type="search"
    />
  </div>
</template>

<style scoped>
.search-input {
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
}

input[type="search"] {
  width: 100%;
  height: 32px;
  padding: 8px 8px 8px 30px;
  border-radius: 4px;
  border-color: #b7dbec;
}

.search-icon {
  position: absolute;
  left: 5px;
  width: 20px;
  height: 20px;
  background-color: white;
}
img {
  width: 100%;
  height: 100%;
}
</style>
