<template>
    <v-app>
        <v-navigation-drawer app v-model="drawer">
            <v-layout align-center>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="text-h6" style="font-size:2vh!important">
                            {{ usuario.usuario }}
                        </v-list-item-title>
                        <v-list-item-subtitle style="font-size:2vh!important">{{ usuario.correo }}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-layout>
            <v-divider></v-divider>
            <v-list dense nav>
                <v-list-item-group v-model="group" color="primary">
                    <v-list-item v-for="item in menu" :key="item.title" link :to="item.to">
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title v-text="item.title" style="text-align: left !important">
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                </v-list-item-group>
            </v-list>

            <template v-slot:append>
                <div class="pa-2"  color="primary">
                    <v-btn block @click="cerrar_sesion()">
                        Cerrar Sesion
                    </v-btn>
                </div>
            </template>



        </v-navigation-drawer>

        <v-app-bar app dark elevation="0" color="primary">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <h1>CIS-UNL Laboratorio</h1>
            <v-spacer></v-spacer>
        </v-app-bar>
        <v-main>
            <v-container fluid>

                <router-view></router-view>
            </v-container>
        </v-main>

        <v-footer app>
            <!-- -->
        </v-footer>
    </v-app>
</template>

<script>
import cooki from "../Recursos/cooki";
export default {
    name: "principal_vista",
    components: {

    },
    data: () => ({
        group: 0,
        drawer: true,
        loading: true,
        usuario: "",
        menu: [
            { title: "Inicio", icon: "mdi-view-dashboard", to: { name: "Inicio" } },

            { title: "Laboratorios", icon: "mdi-format-list-bulleted-square", to: { name: "Laboratorio" } },
            { title: "Actividades", icon: "mdi-clipboard-text", to: { name: "Actividad" } },
            { title: "Grupos", icon: "mdi-account-box", to: { name: "Grupo" } },
            { title: "Resultados", icon: "mdi-gavel", to: { name: "Resultado" } },


        ],
    }),
    mounted() {
        this.usuario_iniciado();
    },
    methods: {
        usuario_iniciado() {
            this.usuario = cooki.get_usuario_iniciado();
        },
        cerrar_sesion() {
            //esta funcion tambien sino, no va a  funcar el cerrar gg
            cooki.borrar_usuario();

            this.$router.push({ name: 'Login' }) 

        }
    },
    watch: {
        loading(val) {
            if (!val) return;

            setTimeout(() => (this.loading = false), 3000);
        },
    },
};
</script>

