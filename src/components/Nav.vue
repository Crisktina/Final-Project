<template>
<div class="nav-layout">
  <div class=""><a href="">Task-it</a></div>
  <div class="text-base small-text">{{ userName.toUpperCase().substring(0, userName.indexOf('@')) }}</div>
  <button class="button-log-out text-medium" type="submit"></button>
  </div>
</template>

<script setup>
import { ref } from "vue";
//coger el email del usuario
import { useUserStore } from "@/stores/user.js";
let userName = ref(useUserStore().user.email);
//constant to save a variable that will hold the use router method

// constant to save a variable that will get the user from store with a computed function imported from vue

// constant that calls user email from the useUSerStore

// constant that saves the user email and cleans out the @client from the user

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
</script>

<style>

</style>
