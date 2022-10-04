<template>
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
          class="input text-base"
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
            class="input text-base"
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
      <p class="text-medium">
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
.layout {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.title {
  font-weight: 700;
  font-size: 32px;
  line-height: 120%;
  color: #180e25;
  margin-top: 30px;
  margin-bottom: 16px;
}
.text-base {
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  color: #827d89;
}
.text-medium {
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  color: #180e25;
}
.form-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 100%;
  height: 372px;
}
.form-section {
  width: 100%;
  margin-top: 32px;
}
.input {
  flex: none;
  align-self: center;
  flex-grow: 0;
  background: #ffffff;
  border: 1px solid #c8c5cb;
  border-radius: 8px;
  padding: 16px;
  margin-top: 12px;
  width: 100%;
  color: #c8c5cb;
}
.button {
  background: #6a3ea1;
  border: none;
  border-radius: 100px;
  width: 100%;
  padding: 16px;
  color: #ffffff;
  margin: 40px 0;
}
.purple {
  color: #6a3ea1;
}
</style>
