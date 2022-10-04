<template>
  <div>Sign Up</div>
  
 <p>Create your personal account to manage your own tasks.</p>
  <form @submit.prevent="signUp">
    <div class="">
      <label class="" for="">Email</label>
      <input
        class=""
        type="email"
        placeholder="user@email.com"
        v-model="email"
        id="email"
      />
    </div>
    <div class="">
      <label class="" for="">Password</label>
      <input
        class=""
        type="password"
        placeholder="************"
        v-model="password"
        id="password"
      />
    </div>
    <div class="">
      <label class="" for="">Confirm Password</label>
      <input
        class=""
        type="password"
        placeholder="************"
        v-model="confirmPassword"
        id="confirmPassword"
      />
    </div>
    <button class="" type="submit">Sign Up</button>
    <p class="">
      <span class="">Have an account? </span>
      <PersonalRouter :route="route" :buttonText="buttonText" />
    </p>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
// Route Variables
const route = "/auth/login";
const buttonText = "Test the Sign In Route";
// Input Fields
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const errorMsg = ref(null);
// Error Message
// Show hide password variable
// Show hide confrimPassword variable
// Router to push user once SignedUp to Log In
const redirect = useRouter();
// function to SignUp user to supaBase with a timeOut() method for showing the error
async function signUp() {
  if (password.value === confirmPassword.value) {
    try {
      await useUserStore().signUp(email.value, password.value);
      // if (error) throw error;
      redirect.push({ path: "/auth" });
    } catch (error) {
      errorMsg.value = error.message;
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

<style></style>