<template>
    <section class="container">
        <v-card>
            <v-row aling="center" no-gutters>
                <v-col align-self="center">
                    <br>
                    <h1>Encuentra el melanoma</h1>
                     <h2>Intentos : {{this.$route.params.intento}}</h2>
                </v-col>
                <v-col align-self="center">
                    <v-btn v-if="btn_verificar" elevation="2" color="primary" @click="verificar_imagen()">Verficar
                    </v-btn>
                </v-col>
            </v-row>
            <v-row v-if="!resultado_mostrar">
                <v-col v-for="item, i in imagenes" :key="i" class="d-flex child-flex" cols="4">
                    <v-hover v-slot="{ hover }" open-delay="200">
                        <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" class="mx-auto"
                            @click="imagen_opcion(i, item.path)">
                            <v-img :src="item.imagen" :lazy-src="item.imagen" aspect-ratio="1" class="grey lighten-2"
                                style="max-width:400px; max-height:400px">
                                <v-expand-transition>
                                    <div v-if="foco == i"
                                        class="d-flex transition-fast-in-fast-out primary darken-2 v-card--reveal"
                                        style="height: 100%;">
                                        <h1>
                                            Seleccionado
                                        </h1>
                                    </div>
                                </v-expand-transition>
                                <template v-slot:placeholder>
                                    <v-row class="fill-height ma-0" align="center" justify="center">
                                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                    </v-row>
                                </template>
                            </v-img>
                        </v-card>
                    </v-hover>

                </v-col>
            </v-row>
            <v-card v-if="resultado_mostrar">
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Actividad completada</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title>Intento N° 1</v-list-item-title>
                        <v-list-item-subtitle>Respuesta erronea</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title>Intento N° 2</v-list-item-title>
                        <v-list-item-subtitle>Respuesta correcta</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-card>
        </v-card>
    </section>
</template>

<script>
import api from "../../Recursos/api";
import cooki from "../../Recursos/cooki";
export default {
    name: "actividad_melanoma_vista",
    components: {
    },
    data: () => ({
        foco: null,
        btn_verificar: false,
        resultado_mostrar: false,

        imagenes: [],
        resultado: null,
        cont_resultado: 0,
    }),
    mounted() {
        this.listar_imagen();
    },
    methods: {
        imagen_opcion(numero, melanoma) {
            this.resultado = melanoma;
            this.foco = numero;
            this.btn_verificar = true;
        },
        async verificar_imagen() {
            try {

                var response = await this.axios.post(api.predecir_ruta, {ruta :this.resultado});
                if (response.data.tipo == "success") {
                    console.log(response.data);
                    this.cont_resultado++;
                    this.$toast.open({
                        message: response.data.data.resultado,
                        type: 'info',
                        duration: 1000,
                        position: "top-right",
                        pauseOnHover: true,
                    });
                    this.listar_imagen();
                    //this.guardar_resultado('no_melanoma');
                    this.foco = null;
                    this.btn_verificar = false;
                    if (this.cont_resultado == this.intento) {
                        this.resultado_mostrar = true;
                    }

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
        async guardar_resultado(resultado) {

            try {
                var data = await {
                    actividadId: this.$route.params.id,
                    estudianteId: cooki.get_usuario_iniciado().id,
                    observacion: resultado
                }

                this.$v.$touch();

                if (!this.$v.$invalid) {
                    //console.log("estoy aki")
                    var response = await this.axios.post(api.crea_resultado, data);
                    if (response.data.tipo == "error") {
                        this.$toast.open({
                            message: response.data.mensaje,
                            type: response.data.tipo,
                            duration: 1000,
                            position: "top-right",
                            pauseOnHover: true,
                        });

                    }

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
        async listar_imagen() {
            try {
                var response = await this.axios.post(api.listar_imagen, {});

                if (response.data.tipo == "success") {
                    this.imagenes = response.data.data.imagenes;
                    //console.log(this.imagenes)
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
        }


    }
};
</script>
<style scoped>
.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .8;
    position: absolute;
    width: 100%;
}
</style>
