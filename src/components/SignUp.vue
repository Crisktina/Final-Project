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
        <p class="title">Register</p>
        <p class="text-base">And start taking notes!</p>
        <p v-if="errorMsg" class="error-text">
          {{ errorMsg }}
        </p>
        <form @submit.prevent="signUp" class="form-container">
          <div class="form-section">
            <label class="text-medium" for="">Email Address</label>
            <input
              class="input-form text-base"
              type="email"
              placeholder="user@email.com"
              v-model="email"
              id="email"
            />
          </div>
          <div class="form-section">
            <label class="text-medium" for="">Password</label>
            <input
              class="input-form text-base"
              :type="passwordFieldType"
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
          <div class="form-section">
            <label class="text-medium" for="">Confirm Password</label>
            <input
              class="input-form text-base"
              :type="passwordFieldTypeConfirm"
              placeholder="************"
              v-model="confirmPassword"
              id="confirmPassword"
            />
            <span class="eye-icon-position">
              <button
                class="icons-task eye-icon"
                @click.prevent="hidePasswordConfirm = !hidePasswordConfirm"
              ></button>
            </span>
          </div>
          <button class="button text-medium" type="submit">Register</button>
          <p class="centered">
            <span class="text-medium purple">Already have an account?</span>
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
const route = "/auth/login";
const buttonText = " Login here";

// Input Fields
const email = ref("");
const password = ref("");

// Error Message
const errorMsg = ref("");

// Show hide password variable
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const hidePassword = ref(true);

// Show hide confrimPassword variable
const passwordFieldTypeConfirm = computed(() =>
  hidePasswordConfirm.value ? "password" : "text"
);
const hidePasswordConfirm = ref(true);

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// function to SignUp user to supaBase with a timeOut() method for showing the error
async function signUp() {
  if (password.value === confirmPassword.value) {
    try {
      await useUserStore().signUp(email.value, password.value);
      // if (error) throw error;
      redirect.push({ path: "/auth/login" });
    } catch (error) {
      // displays error message
      errorMsg.value = error.message;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "Passwords do not match";
  setTimeout(() => {
    errorMsg.value = null;
  }, 5000);
}
</script>
