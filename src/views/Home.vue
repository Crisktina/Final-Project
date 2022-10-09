<template>
  <Nav />
  <!-- TO-DO-TASKS -->
  <div class="main-layout">
    <div class="layout">
      <p class="text-base small-text margin-text">
        ACTIVE TASKS: {{ taskArrayUndone.length }}
      </p>
      <ol>
        <!-- poner v-if v-else en esta sección -->
        <div>
          <TaskItem
            @deleteTaskChildren="deleteTaskFather"
            @completedTaskChildren="completeTaskFather"
            @modifyTaskChildren="modifyTaskFather"
            v-for="(task, index) in taskArrayUndone"
            :key="index"
            :taskData="task"
          ></TaskItem>
        </div>
        <!-- SECTION WITH EMPTY TASKS -->
        <div class="layout-illustration">
          <img
            class="ilustration-tasks"
            src="src/assets/ilustrationActiveTasks.svg"
            alt="ilustration about girl with idea"
          />
          <h2 class="text-xl-bold">Start Your Journey</h2>
          <p class="text-base center-text margin-text">
            Every big step start with small task.<br />
            Notes your first task and start being organized!
          </p>
        </div>
      </ol>
    </div>
    <hr class="hr-grey" />
    <!-- DONE-TASKS -->
    <div class="layout">
      <p class="text-base small-text margin-text">
        COMPLETED TASKS: {{ taskArrayCompleted.length }}
      </p>
      <ol>
        <TaskItem
          @deleteTaskChildren="deleteTaskFather"
          @completedTaskChildren="completeTaskFather"
          @modifyTaskChildren="modifyTaskFather"
          v-for="(task, index) in taskArrayCompleted"
          :key="index"
          :taskData="task"
        ></TaskItem>
        <!-- SECTION WITH EMPTY TASKS -->
        <div class="layout-illustration">
          <img
            class="ilustration-tasks"
            src="src/assets/ilustrationCompletedTasks.svg"
            alt="ilustration about girl with idea"
          />
          <h2 class="text-xl-bold">No Completed Tasks Yet</h2>
          <p class="text-base center-text margin-text">
            Once you finish a task, it will be appeared on this screen. So,
            let’s start!
          </p>
        </div>
      </ol>
    </div>
  </div>
  <!-- NEW-TASK -->
  <div class="menu-add-task">
    <NewTask @childNewTask="sendToStore" />
  </div>
</template>

<script setup>
// 1. ref() is used here!
import { ref, onMounted } from "vue";
// 2. (NewTask, TaskItem, Footer, Nav) components are used here!
import Nav from "../components/Nav.vue";
import NewTask from "@/components/NewTask.vue";
import TaskItem from "../components/TaskItem.vue";

import { useTaskStore } from "../stores/task.js";
import { supabase } from "../supabase";

// nos definimos la tienda del usuario dentro de una constante
const taskStore = useTaskStore();

// 3. Tasks are going to be contained in an array here!
// Inicializamos array de tareas
const taskArrayUndone = ref([]);
const taskArrayCompleted = ref([]);
const taskArrayModify = ref([]);

onMounted(() => {
  taskStore.fetchTasks();
});

async function readFromStore() {
  taskArrayUndone.value = await taskStore.fetchTasksTrue(false);
  taskArrayCompleted.value = await taskStore.fetchTasksTrue(true);
  taskArrayModify.value = await taskStore.fetchTasksTrue(true);
}
readFromStore();

// Enviamos los datos de la tarea a la Tienda taskStore
async function sendToStore(title, description) {
  await taskStore.addTask(title, description);
  readFromStore();
}

// 4. An async function is needed to get all of the tasks stored within the supabase database, this async function's body will contain the tasks value which be use to store the fetchTasks method which lives inside the userTaskStore. This function needs to be called within the setUp script in order to run within the first instance of this component lifecycle.
async function readAll() {
  let { data: tasks, error } = await supabase.from("tasks").select("*");
}
readAll();

// function para borrar Task
const deleteTaskFather = async (deleteId) => {
  await taskStore.deleteOneTask(deleteId);
  readFromStore();
};

//function para completed Task

const completeTaskFather = async (id, status) => {
  await taskStore.completeTask(id, status);
  readFromStore();
};

//function para modify Task

const modifyTaskFather = async (id) => {
  await taskStore.modifyTask(id);
  readFromStore();
};
</script>

<style scoped></style>

<!-- 
**Hints**

5. NewTask component will receive a customEvent on this instance of the homeView that will fire the add-to-do function
6. add-to-do function will receive 2 params/arguments that will tak a taskTitle and a taskDescription and the body of this async function will call the taskStore that calls the addTask function from the store that pushes the info of the task to the backEnd. This is possible by passing the 2 param/arguments that will be passed by the user from the inputs within the NewTask Component. 
7. TaskItem component will loop through the tasks-array that will print an individual instance of an individual TaskItem component. TaskItem will receive 3 customEvents on this instance of the homeView. 1 customEvent for toggling the task to show either a text or an icon to display if the task is completed or not completed. 1 customEevent for removing/deleting the task out of the array. 1 customEvent for editing the task title and description. This function needs to call the function mentioned on hint4.
7.1-customEvent will fire an async function that will take in 1 param/argument. On the body of this function the param/argument will be used to define 2 constants. 1 of this constants will take care of setting the boolean value to the opposite of the value that checks wether this task is_complete. 1 of this constants will take of calling the id of this specific task in order to call the right id. 
7.2-customEvent will fire an asynf function that will take in 1 param/argument. This async function's body will be used to call the deleteTaskmethod which will take the param/argument's id in order to delete the task. This function needs to call the function mentioned on hint4. 
7.3-customEvent will fire an async function that will take in 1 param/argument. this async function's body will be used to take in 2 constants. 1 constant will take in the param/argument newValue. 1 constant will be used to get the param/argument oldValue id. These 2 constants will be sent to the backend via the useTaskStore which holds an editTask method. This function needs to call the function mentioned on hint4.
-->
