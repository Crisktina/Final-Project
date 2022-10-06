import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase";
//exportar el uso de la función en cualquier parte del proyecto
export const useUserStore = defineStore("user", {
    //donde ponemos nuestros datos que conocemos como ref
    state: () => ({
        user: null,
    }),
    // aquí es donde vamos a plasmar nuestras funciones/metodos
    actions: {
        async fetchUser() {
            const user = await supabase.auth.user();
            this.user = user;
        },
        //Lógica del signIn
        async signIn(email, password) {
            const { user, error } = await supabase.auth.signIn({
                email: email,
                password: password,
            });
            if (error) throw error;
            if (user) {
                this.user = user;
                console.log(this.user);
            }
        },
        //Lógica del signUp
        async signUp(email, password) {
            const { user, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            });
            if (error) throw error;
            if (user) {
                this.user = user;
                console.log(this.user);
            }
        },
        //Lógica del signOut
        //referencia de supabase const {error} = await supabase.auth.signOut()
        // async nombreFuncion() {}
        async signOut() {
            const { error } = await supabase.auth.signOut();
            console.log(error);
            if (error) throw error;
        },

        //objeto que nos habilita guardar los datos del usuario y sus interacciones
        persist: {
            enabled: true,
            strategies: [{
                key: "user",
                storage: localStorage,
            }, ],
        },
    },
});