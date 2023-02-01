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
        <div v-if="showTaskUndone">
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
        <div v-else class="layout-illustration">
          <img
            class="ilustration-tasks"
            src="https://res.cloudinary.com/dz4jvwp3u/image/upload/v1665418391/Task%20App/ilustrationActiveTasks_qanv6p.svg"
            alt="ilustration about girl with idea"
          />
          <h2 class="text-xl-bold center-text">Start Your Journey</h2>
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
        <div v-if="showTaskCompleted">
          <TaskItem
            @deleteTaskChildren="deleteTaskFather"
            @completedTaskChildren="completeTaskFather"
            v-for="(task, index) in taskArrayCompleted"
            :key="index"
            :taskData="task"
          ></TaskItem>
        </div>
        <!-- SECTION FOR EMPTY TASKS -->
        <div v-else class="layout-illustration">
          <img
            class="ilustration-tasks"
            src="https://res.cloudinary.com/dz4jvwp3u/image/upload/v1665418391/Task%20App/ilustrationCompletedTasks_bbifps.svg"
            alt="ilustration about girl with idea"
          />
          <h2 class="text-xl-bold center-text">No Completed Tasks Yet</h2>
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

// hacer toggle para mostrar u ocultar la imagen
const showTaskCompleted = ref(false);
const showTaskUndone = ref(false);

function toggleShowTaskCompleted() {
  if (taskArrayCompleted.value.length !== 0) {
    showTaskCompleted.value = true;
  } else {
    showTaskCompleted.value = false;
  }
}

function toggleShowTaskUndone() {
  if (taskArrayUndone.value.length !== 0) {
    showTaskUndone.value = true;
  } else {
    showTaskUndone.value = false;
  }
}

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
  toggleShowTaskCompleted();
  toggleShowTaskUndone();
}
readFromStore();

// Enviamos los datos de la tarea a la Tienda taskStore
async function sendToStore(title, description) {
  toggleShowTaskUndone();
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
  if (taskArrayCompleted.value.length === 0) {
    toggleShowTaskCompleted();
  }
  readFromStore();
};

//function para completed Task

const completeTaskFather = async (id, status) => {
  toggleShowTaskCompleted();
  await taskStore.completeTask(id, status);
  readFromStore();
};

//function para modify Task

const modifyTaskFather = async (id, title, description) => {
  await taskStore.modifyTask(id, title, description);
  readFromStore();
};
</script>
