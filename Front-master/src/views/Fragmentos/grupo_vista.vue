<template>
  <section>
    <div>
    <h1>Grupos</h1>
    </div>
    <v-card>
      <v-card-title>
        Grupos Existentes
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
