import { useLocalStorage } from "@/composables/useLocalStorage.js";

export default defineNuxtRouteMiddleware((to, from) => {
  const users = useLocalStorage().getData("allUsers");
  const router = useRouter();
  if (users) {
    const clientExists = users.some((client) => +client.id === +to.params.id);
    if (!clientExists) {
      router.replace("/non-existing-route");
      return false;
    }
  }

  return true;
});
