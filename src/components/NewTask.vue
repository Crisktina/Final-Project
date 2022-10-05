<template>
<div class="layout">
    <button class="button-add-task title" @click.prevent="uploadTask"></button>
    
    <input
    class="input text-base"
      v-model="taskTitle"
      type="text"
      id="newTaskTitle"
      placeholder="New task title..."
    />

    <input
    class="input text-base"
      v-model="taskDesc"
      type="text"
      id="newTaskDesc"
      placeholder="Description..."
    />

  </div>
  <div>
    <h3 v-if="errorBool">{{ emptyString }}</h3>
  </div>
</template>


<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";
import { useTaskStore } from "../stores/task.js";

const emit = defineEmits(["childNewTask"]);

let taskTitle = ref("");
let taskDesc = ref("");
let errorBool = ref(false);
const emptyString = ref("");

function uploadTask() {
  if (taskTitle.value === "") {
    errorBool.value = true;
    emptyString.value = "Title is required.";
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

// async function uploadTask() {
//   const { data, error } = await supabase.from("tasks").insert([
//     {
//       user_id: "5fa3d22c-892b-44fc-a3a6-efc7e5503032",
//       title: taskTitle.value,
//       is_complete: false,
//       description: taskDesc.value,
//     },
//   ]);
// }

// constant to save a variable that define the custom event that will be emitted to the homeView

// constant to save a variable that holds the value of the title input field of the new task

// constant to save a variable that holds the value of the description input field of the new task

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty

// const constant to save a variable that holds the value of the error message

// arrow function to call the form holding the task title and task description that uses a conditional to first checks if the task title is empty, if true the error message is displayed through the errorMessage container and sets a timeOut method that hides the error after some time. Else, its emmits a custom event to the home view with the task title and task description; clears the task title and task description input fields.
</script>


<style></style>
