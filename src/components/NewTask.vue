<template>
  <button class="button-add-task" @click.prevent="uploadTask"></button>
  <div class="new-task-box">
    <input
      class="input-task-up text-medium-bold text-imput"
      v-model="taskTitle"
      type="text"
      placeholder="New task title..."
    />
    <div class="">
      <h3 class="error-text" v-if="errorBool">{{ emptyString }}</h3>
    </div>
    <hr class="hr-purple-new-task" />
    <input
      class="input-task-under text-base text-imput"
      v-model="taskDesc"
      type="text"
      placeholder="Description..."
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";
import { useTaskStore } from "../stores/task.js";
// constant to save a variable that define the custom event that will be emitted to the homeView
const emit = defineEmits(["childNewTask"]);
// constant to save a variable that holds the value of the title input field of the new task
const taskTitle = ref("");
// constant to save a variable that holds the value of the description input field of the new task
const taskDesc = ref("");
// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const errorBool = ref(false);
// const constant to save a variable that holds the value of the error message
const emptyString = ref("");
// arrow function to call the form holding the task title and task description that uses a conditional to first checks if the task title is empty, if true the error message is displayed through the errorMessage container and sets a timeOut method that hides the error after some time. Else, its emmits a custom event to the home view with the task title and task description; clears the task title and task description input fields.
function uploadTask() {
  if (taskTitle.value === "") {
    errorBool.value = true;
    emptyString.value = "Title is required!";
    setTimeout(() => {
      errorBool.value = false;
    }, 1000);
  } else {
    emit("childNewTask", taskTitle.value, taskDesc.value);
    taskTitle.value = "";
    taskDesc.value = "";
    console.log(taskTitle.value);
  }
}
</script>

<style></style>
