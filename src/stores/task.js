import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
    state: () => ({
        tasks: null,
    }),
    actions: {
        async fetchTasks() {
            const { data: tasks } = await supabase
                .from("tasks")
                .select("*")
                .order("is_complete", { ascending: true })
                .order("id", { ascending: false });
            this.tasks = tasks;
            return this.tasks;
        },
        async fetchTasksTrue(isComplete) {
            const { data: tasks } = await supabase
                .from("tasks")
                .select("*")
                .match({ is_complete: isComplete })
                .order("id", { ascending: false });
            this.tasks = tasks;
            return this.tasks;
        },
        async addTask(title, description) {
            const { data, error } = await supabase.from("tasks").insert([{
                user_id: useUserStore().user.id,
                title: title,
                is_complete: false,
                description: description,
            }, ]);
        },
        async modifyTask(id, newTitle, newDescription) {
            const { data, error } = await supabase
                .from("tasks")
                .update({ title: newTitle, description: newDescription })
                .match({ id: id });
        },
        async completeTask(id, status) {
            const { data, error } = await supabase
                .from("tasks")
                .update({ is_complete: !status })
                .match({ id: id });
            console.log(status);
        },

        // falta de programar
        async deleteAllTasks() {
            const { data, error } = await supabase
                .from("tasks")
                .delete()
                .match({ is_complete: false });
        },

        // función para borrar task de la data de supabase
        async deleteOneTask(taskId) {
            const { data, error } = await supabase
                .from("tasks")
                .delete()
                .match({ id: taskId });
        },
    },
});