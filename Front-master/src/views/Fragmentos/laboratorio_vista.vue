<template>
    <section>
        <center>
            <div color="white">
                <h1>Laboratorios</h1>
            </div>
            <v-btn text class="ma-2 " color="white" :to="{ name: 'Grupo' }">
                <v-avatar left>
                    <v-icon>mdi-format-list-bulleted-square</v-icon>
                </v-avatar>Añadir Nuevo Grupo
            </v-btn>
            <v-btn text class="ma-2 " color="white" :to="{ name: 'Grupo' }">
                <v-avatar left>
                    <v-icon>mdi-clipboard-text</v-icon>
                </v-avatar> Ver Todos los Grupos
            </v-btn>
        </center>

        <center>
            <v-row justify="space-around">
                <v-col cols="auto">
                    <v-dialog transition="dialog-bottom-transition" max-width="600">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn text class="ma-2 " color="success" v-bind="attrs" v-on="on">
                                <v-avatar left>
                                    <v-icon>mdi-plus</v-icon>
                                </v-avatar>Añadir Estudiante
                            </v-btn>
                        </template>
                        <template v-slot:default="dialog">
                            <v-card>
                                <v-toolbar color="primary" dark>Añadir Estudiante</v-toolbar>
                                <v-card-text>
                                    <div class="text-center">
                                        <h2> Añadir estudiantes a el grupo CIS-UNL</h2>
                                        Añadir estudiantes a un grupo permite a los estudiantes acceder a los
                                        laboratorios del grupo.
                                    </div>
                                    <div> </div>
                                    <div>
                                        <v-card class="mx-auto" color="#26c6da" dark max-width="400">
                                            <v-card-title>
                                                <span class="text-h6 font-weight-light">Copiar un Enlace</span>
                                            </v-card-title>

                                            <v-card-text class="text font-weight-bold">
                                                "Comparte un enlace privado con tus estudiantes,
                                                cualquiera con el enlace puede añadirse al grupo."
                                                <div class="text-center">
                                                    <v-btn class="ma-2" :loading="loading4" :disabled="loading4" text
                                                        color="info" @click="loader = 'loading4'"> Gestionar Enlace
                                                        <template v-slot:loader>
                                                            <span class="custom-loader">
                                                                <v-icon light>mdi-cached</v-icon>
                                                            </span>
                                                        </template>
                                                    </v-btn>
                                                </div>
                                            </v-card-text>
                                        </v-card>
                                    </div>
                                </v-card-text>
                                <v-card-actions class="justify-end">
                                    <v-btn text color="red" @click="dialog.value = false">Close</v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-dialog>
                    <v-dialog v-model="dialog" persistent max-width="600px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn text class="ma-2 " color="success" v-bind="attrs" v-on="on">
                                <v-avatar left>
                                    <v-icon>mdi-plus</v-icon>
                                </v-avatar>Añadir Docentes
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">Ivitar un Docente</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field label="Correo*" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-autocomplete
                                                :items="['Administrador', 'Docente']"
                                                label="ROL" multiple></v-autocomplete>
                                        </v-col>
                                    </v-row>
                                </v-container>
                                <small>*indicates required field</small>
                            </v-card-text>
                            <v-card-actions class="justify-end">
                                <v-spacer></v-spacer>
                                <v-btn text color="success" @click="dialog.value = false">Añadir</v-btn>
                                <v-btn text color="red" @click="dialog.value = false">Cancelar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-btn text class="ma-2 " color="warning" :to="{ name: 'Grupo' }">
                        <v-avatar left>
                            <v-icon>mdi-pencil</v-icon>
                        </v-avatar>Editar Grupo
                    </v-btn>
                </v-col>
            </v-row>
        </center>

        <br>


        <v-container class="pa-4 text-center">
            <v-row class="fill-height" align="center" justify="center">
                <template v-for="(item, i) in items">
                    <v-col :key="i" cols="12" md="4">
                        <v-hover v-slot="{ hover }">
                            <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
                                <v-img :src="item.img" height="225px">
                                    <v-card-title class="text-h6 black--text">
                                        <v-row class="fill-height flex-column" justify="space-between">
                                            <p class="mt-4 subheading text-left">
                                                {{ item.nombre }}
                                            </p>

                                            <div>
                                                <p class="ma-0 text-body-1 font-weight-bold font-italic text-left">
                                                    {{ item.text }}
                                                </p>
                                                <p class="text-caption font-weight-medium font-italic text-left">
                                                    {{ item.subtext }}
                                                </p>
                                            </div>

                                            <div class="align-self-center">
                                                <v-btn color="dark" text :to="{ name: 'Actividad' }">
                                                    Ir al Laboratorio
                                                </v-btn>
                                            </div>
                                        </v-row>
                                    </v-card-title>
                                </v-img>
                            </v-card>
                        </v-hover>
                    </v-col>
                </template>
            </v-row>
        </v-container>

    </section>
</template>

<script>
import api from "../../Recursos/api";
export default {
    name: "laboratorio_vista",
    components: {
    },
    data: () => ({
        items: [
            {
                nombre: 'Prediagnostico Melanoma',
                text: `Descripción`,
                subtext: 'En este laboratorio hace uso de la IA para dar un prediagnostico del cancer de piel de tipo Melanoma. ',
                img: "https://www.tekcrispy.com/wp-content/uploads/2022/05/encuesta-sobrediagnostico-melanoma-portada-scaled.jpg",
            },

        ],
        search: '',
        actividades: [],
    }),
    mounted() {
        this.listar_actividad();
    },
    methods: {
        async listar_actividad() {
            try {
                var response = await this.axios.post(api.listar_actividad, {});
                if (response.data.tipo == "success") {
                    this.actividades = response.data.data.actividades;
                    //console.log(this.actividades);
                }
            } catch (error) {
                this.$toast.open({
                    message: error.statusText,
                    type: "error",
                    duration: 5000,
                    position: "top-right",
                    pauseOnHover: true,
                });
            }

        },
    }
};
</script>
