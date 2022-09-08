<template>
  <section>
    <div>
      <center>
        <h1>Actividades</h1>
      </center>
    </div>
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
                          <v-btn class="ma-2" :loading="loading4" :disabled="loading4" text color="info"
                            @click="loader = 'loading4'"> Gestionar Enlace
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
                <v-toolbar color="primary" dark>Añadir Docente</v-toolbar>
                <v-card-text>
                  <div class="text-center">
                    <h2> Añadir docente al grupo CIS-UNL</h2>
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
                          <v-btn class="ma-2" :loading="loading4" :disabled="loading4" text color="info"
                            @click="loader = 'loading4'"> Gestionar Enlace
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
          <v-btn text class="ma-2 " color="warning" :to="{ name: 'Grupo' }">
            <v-avatar left>
              <v-icon>mdi-pencil</v-icon>
            </v-avatar>Editar Grupo
          </v-btn>
        </v-col>
      </v-row>
    </center>

    <v-row>
      <v-col v-for="item, i in actividades" :key="i">
        <v-card class="mx-auto" max-width="400">
          <v-img class="white--text align-end" height="200px"
            src="https://www.tekcrispy.com/wp-content/uploads/2022/05/encuesta-sobrediagnostico-melanoma-portada-scaled.jpg">
            <v-chip class="ma-2" label>
              <v-card-title style="color: #000 !important;"> {{ item.nombre }}</v-card-title>
            </v-chip>
          </v-img>
          <v-card-subtitle class="pb-0">
            Descripción
          </v-card-subtitle>
          <v-card-text class="text--primary text-keft">
            <div>{{ item.descripcion }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="orange" text :to="{ name: item.nombre, params: { id: item.id, intento: item.intento } }">
              Ver actividad
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <br>
    <v-card>
      <v-card-title>
        Actividades
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="actividades" :search="search"></v-data-table>
    </v-card>
  </section>
</template>

<script>
import api from "../../Recursos/api";
export default {
  name: "actividad_vista",
  components: {
  },
  data: () => ({
    search: '',
    headers: [
      {
        text: 'Nombre',
        align: 'start',
        sortable: false,
        value: 'nombre',
      },
      { text: 'Descripción', value: 'descripcion' },
      { text: 'Intentos', value: 'intento' },
      { text: 'Estado', value: 'estado' },
      { text: 'Actividad', value: 'actividad' },
    ],
    desserts: [],
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
