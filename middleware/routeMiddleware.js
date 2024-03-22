import { useLocalStorage } from "@/composables/useLocalStorage.js";

export default defineNuxtRouteMiddleware((to, from) => {
  if (typeof localStorage !== "undefined") {
    const users = useLocalStorage().getData("allUsers");
    console.log(users, "users");
    const router = useRouter();
    if (users) {
      const clientExists = users.some((client) => +client.id === +to.params.id);
      if (!clientExists) {
        router.replace("/non-existing-route");
        return false;
      }
    }
  }
  return true;
});
