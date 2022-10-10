<template>
  <div class="nav-layout">
    <img class="logo" src="/src/assets/logo.svg" alt="Task-it logo" />

    <div>
      <!-- constant that saves the user email and cleans out the @client from the user -->
      <div class="text-base small-text user-name">
        Welcome Back <br />
        {{ userName.toUpperCase().substring(0, userName.indexOf("@")) }}
      </div>
      <button
        @click="signOut"
        class="button-log-out text-medium"
        type="submit"
      ></button>
    </div>
    <div v-if="errorMessageContainer">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user.js";
import { useRouter } from "vue-router";
//coger el email del usuario
// constant that calls user email from the useUSerStore
let userName = ref(useUserStore().user.email);

//variable para mostrar error
const errorMessage = ref("");

// variable que tiene el mensaje de error
const errorMessageContainer = ref(false);

//constant to save a variable that will hold the use router method
// Router to push user once SignedIn to the HomeView
const redirect = useRouter();
// constant to save a variable that will get the user from store with a computed function imported from vue
const userStore = useUserStore();
// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
// TEMPLATE: async function signOut() {}
async function signOut() {
  //caso de uso si existe un error por supabase, supabase se encarga de darnos un tipo de error por la función de la store de user.js
  try {
    await userStore.signOut();
    // redirects user to the homeview
    redirect.push({ path: "/auth/login" });
  } catch (error) {
    errorMessage.value = error.message;
    setTimeout(() => {
      errorMessage.value = null;
      errorMessageContainer.value = false;
    }, 2000);
  }
}
</script>

<style></style>
