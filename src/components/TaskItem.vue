<template>
  <div class="task-layout">
    <div :class="taskData.is_complete ? 'taskItem-done' : 'taskItem-active'">
      <li>
        <div class="check-title-alignment">
          <button
            @click="completedTask"
            :class="
              taskData.is_complete ? 'check-icon-done' : 'check-icon-active'
            "
            class="check-icon-active"
          ></button>
          <!-- input para cambiar titulo -->
          <div class="input-modify-box" v-if="showModify">
            <input
              class="input-modify text-medium-bold"
              type="text"
              placeholder=" "
              v-model="taskTitle"
            />
            <!-- <span>
              <button class="ok-modify-button" @click.prevent="modifyTask">
                DONE
              </button>
            </span> -->
          </div>
          <b
            v-else
            :class="
              taskData.is_complete
                ? 'text-medium-bold-done'
                : 'text-medium-bold'
            "
            >{{ taskData.title }}
          </b>
        </div>
        <hr class="hr-purple" />
        <!-- input para cambiar description -->
        <div v-if="showModify">
          <input
            class="input-modify task-text-active"
            type="text"
            placeholder=" "
            v-model="taskDesc"
          />
          <span>
            <button class="ok-modify-button" @click.prevent="modifyTask">
              SUBMIT
            </button>
          </span>
        </div>

        <p
          v-else
          :class="taskData.is_complete ? 'task-text-done' : 'task-text-active'"
        >
          {{ taskData.description }}
        </p>
      </li>
    </div>
    <div class="icons-task-alignment">
      <button @click="deleteTask" class="icons-task button-x-icon"></button>
      <button @click="toggleModify" class="icons-task button-modify"></button>
    </div>
  </div>
</template>

<script setup>
// 1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or like an object, up to you.
import { ref, reactive } from "vue";

// 2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error, a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit the new task detail or details[this is in reference of the task title and the task description].
// const props = defineProps(["ENTER-PROP-HERE"]);
const props = defineProps(["taskData"]);

const taskDesc = ref(props.taskData.description);
const taskTitle = ref(props.taskData.title);
const showModify = ref(false);
// 5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the inputField will be used here to save the value as a prop on this function.
function toggleModify() {
  showModify.value = !showModify.value;
}
// 7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional that first checks if the value of the task [either title and description or just title] is empty which if true it runs the function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2 back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2; a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field to an empty string to clear it from the ui.
const modifyTask = () => {
  emit(
    "modifyTaskChildren",
    props.taskData.id,
    taskTitle.value,
    taskDesc.value
  );
  showModify.value = !showModify.value;
};

// 3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the status[completed, not complted] of the taskItem.
// const emit = defineEmits([ENTER-EMITS-HERE])
const emit = defineEmits([
  "deleteTaskChildren",
  "completedTaskChildren",
  "modifyTaskChildren",
]);

// 8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the removal of  the task on the homeview.
// function deleteTask() {
//    emit("deleteTaskChildren", props.taskData.id);
// }
const deleteTask = () => {
  emit("deleteTaskChildren", props.taskData.id);
};

// 6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.
// función para completar task
const completedTask = () => {
  emit("completedTaskChildren", props.taskData.id, props.taskData.is_complete);
};
</script>

<style></style>

<!-- 
**Hints**



4. Function to handle the error with the data properties used to control the error and the boolean controlling the boolean empty variable.




-->
