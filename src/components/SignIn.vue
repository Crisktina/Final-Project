<template>
<div class="center-logo-login">
<img class="logo-sign" src="/src/assets/logo.svg" alt="Task-it logo"/>
</div>
  <div class="layout">
    <p class="title">Let's Login</p>
    <p class="text-base">And start taking notes!</p>
    <p v-if="errorMsg" class="">
      {{ errorMsg }}
    </p>
    <form @submit.prevent="signIn" class="form-container">
      <div class="form-section">
        <label class="text-medium" for="">Email Address</label>
        <input
          class="input-form text-base"
          type="email"
          placeholder="example@gmail.com"
          v-model="email"
          id="email"
        />
      </div>
      <div class="form-section">
        <label class="text-medium" for="">Password</label>

        <div class="">
          <input
            class="input-form text-base"
            :type="passwordFieldType"
            onpaste="return false"
            placeholder="************"
            v-model="password"
            id="password"
          />
          <span class="">
            <EyeIcon
              :class="[passwordFieldIcon]"
              @click.prevent="hidePassword = !hidePassword"
            />
          </span>
        </div>
      </div>

      <button class="button text-medium" type="submit">Login</button>
      <p class="centered">
        <span class="text-medium purple">Don’t have any account? </span>

        <PersonalRouter class="text-medium purple" :route="route" :buttonText="buttonText" />
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/sign-up";
const buttonText = "Register here";

// Input Fields
const email = ref("");
const password = ref("");

// Error Message
const errorMsg = ref("");

//Show hide password variables
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const hidePassword = ref(true);

// Router to push user once SignedIn to the HomeView
const redirect = useRouter();

// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    await useUserStore().signIn(email.value, password.value);
    // redirects user to the homeView
    redirect.push({ path: "/" });
  } catch (error) {
    // displays error message
    errorMsg.value = `Error: ${error.message}`;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>
<style>

/* @import "../assets/main.css"; */

</style>