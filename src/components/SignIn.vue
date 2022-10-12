<template>
  <div class="bottom-space">
    <div class="main-layout">
      <div class="center-logo-login">
        <img class="logo-sign" src="/src/assets/logo.svg" alt="Task-it logo" />
        <img
          class="ilustration-sign"
          src="https://res.cloudinary.com/dz4jvwp3u/image/upload/v1665418391/Task%20App/illustrationLogIn_b6ag0k.svg"
          alt="illustration with person doing tasks"
        />
      </div>
      <div class="layout">
        <p class="title">Let's Login</p>
        <p class="text-base">And start taking notes!</p>
        <p v-if="errorMsg" class="error-text">
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
            <div>
              <input
                class="input-form text-base"
                :type="passwordFieldType"
                onpaste="return false"
                placeholder="************"
                v-model="password"
                id="password"
              />
              <span class="eye-icon-position">
                <button
                  class="icons-task eye-icon"
                  @click.prevent="hidePassword = !hidePassword"
                ></button>
              </span>
            </div>
          </div>

          <button class="button text-medium" type="submit">Login</button>
          <p class="centered">
            <span class="text-medium purple">Don’t have any account? </span>

            <PersonalRouter
              class="text-medium purple"
              :route="route"
              :buttonText="buttonText"
            />
          </p>
        </form>
      </div>
    </div>
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
