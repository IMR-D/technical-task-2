import { useLocalStorage } from "@/composables/useLocalStorage.js";

export async function getClients() {
  try {
    const config = useRuntimeConfig();
    const { data, pending, error, refresh } = await useAsyncData(
      "clients",
      () => $fetch(`${config.public.reqresApi}/api/users`),
    );
    if (data?.value?.data) {
      useLocalStorage().setData("allUsers", data.value.data);
      data.value.data.forEach((item) => {
        clientExpansion(item, ["points", "comment"]);
      });
    }
    return { data, pending, error, refresh };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function getClientById(id) {
  try {
    const config = useRuntimeConfig();
    const { data, pending, error, refresh } = await useAsyncData("client", () =>
      $fetch(`${config.public.reqresApi}/api/users/${id}`),
    );

    if (data?.value?.data) {
      clientExpansion(data.value.data, ["points", "comment"]);
    }

    return { data, pending, error, refresh };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export function clientExpansion(objectClient, [points, comment]) {
  try {
    const clientsInfo = useLocalStorage().getData("clientsInfo");

    if (clientsInfo && Object.keys(clientsInfo).length) {
      objectClient[points] =
        (clientsInfo[objectClient.id] &&
          clientsInfo[objectClient.id][points]) ||
        0;
      objectClient[comment] =
        (clientsInfo[objectClient.id] &&
          clientsInfo[objectClient.id][comment]) ||
        "";
      return objectClient;
    } else {
      return {
        ...objectClient,
        points: 0,
        comment: "",
      };
    }
  } catch (error) {
    console.error("Extension error check the arguments", error);
    throw error;
  }
}
