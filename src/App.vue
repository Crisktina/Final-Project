<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/user.js";
import { ref } from "vue";
import Nav from "./components/Nav.vue";
import Footer from "./components/Footer.vue"

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

onMounted(async () => {
  const appReady = ref(null);
  try {
    await userStore.fetchUser(); // here we call fetch user
    if (!user.value) {
      // redirect them to logout if the user is not there
      appReady.value = true;
      router.push({ path: "/auth/login" });
    } else {
      // continue to dashboard
      // router.push({ path: "/" });
    }
  } catch (e) {
    console.log(e);
  }
});
</script>

<template>
  <div>
    <Nav />
    <router-view />
    <Footer />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap');
 
 * {
     margin: 0px;
     padding: 0px;
     font-family: Inter, sans-serif;
     font-style: normal;
     box-sizing: border-box;
 }
</style>
