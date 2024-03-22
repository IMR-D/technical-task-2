<script setup>
import PointsBtn from "@/components/PointsBtn.vue";
import { useLocalStorage } from "@/composables/useLocalStorage.js";
import { getClients } from "@/composables/useClients.js";

const props = defineProps({
  client: {
    type: Object,
    required: true,
  },
});

const points = ref(0);
const comment = ref("");

const fullName = computed(() => {
  const fname = props.client?.first_name ? props.client?.first_name : "";
  const lname = props.client?.last_name ? props.client?.last_name : "";
  return fname + " " + lname;
});

function handlerSave() {
  const clientsInfo = useLocalStorage().getData("clientsInfo");
  if (clientsInfo && Object.keys(clientsInfo).length) {
    useLocalStorage().setData(
      Object.assign(clientsInfo, {
        [props.client.id]: { points: points.value, comment: comment.value },
      }),
      "clientsInfo",
    );
  } else {
    useLocalStorage().setData(
      { [props.client.id]: { points: points.value, comment: comment.value } },
      "clientsInfo",
    );
  }
  getClients();
  alert("Данные успешно сохранены");
}

onMounted(() => {
  points.value = (function userPoints() {
    const clientsInfo = useLocalStorage().getData("clientsInfo");
    if (clientsInfo && Object.keys(clientsInfo).length) {
      if (clientsInfo[props.client.id]) {
        return clientsInfo[props.client.id].points;
      }
    }
    return 0;
  })();
});
</script>

<template>
  <div class="client-info">
    <div class="client-info__content content">
      <img
        class="client-info__content-img"
        :src="client.avatar"
        alt="Client's avatar"
      />
      <div class="client-info__details">
        <span class="client-info__name">{{ fullName }}</span>
        <span class="client-info__email">{{ client.email }}</span>
        <div class="client-info__points">
          <PointsBtn v-model:points="points" />
        </div>
        <textarea v-model="comment" placeholder="Write a message..."></textarea>
      </div>
    </div>
    <button class="client-info__save" @click="handlerSave">Save</button>
  </div>
</template>

<style scoped>
.client-info {
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 24px;
  border-radius: 14px;
  width: max-content;
  height: max-content;
}
.content {
  display: flex;
  justify-content: space-between;
}
.client-info__details {
  margin-left: 24px;
  display: flex;
  width: 100%;
  flex-direction: column;
}
.client-info__name {
  font-size: 24px;
  font-weight: bold;
}
.client-info__points {
  margin-bottom: 10px;
  margin-top: 10px;
}
.client-info__content-img {
  border-radius: 12px;
}
.client-info__save {
  color: white;
  cursor: pointer;
  height: 32px;
  border-radius: 8px;
  width: 60%;
  margin: 12px auto;
  background-color: #007bff;
  border: transparent;
  &:hover {
    background-color: #0056b3;
  }
}
@media screen and (max-width: 400px) {
  .content {
    flex-direction: column;
  }
  .client-info__details {
    margin-left: 0;
  }
}
</style>
