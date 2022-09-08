<template>
    <section class="container">
        <v-card>
            <br>
            <h1>Verifica el melanoma</h1>
            <h2>Intentos : {{this.$route.params.intento}}</h2>
            <v-card-text class="text-center">
                <center>
                    <v-img :src="imagePreviewURL" max-height="380" max-width="380" class="file-upload-image"></v-img>
                </center>
                <br>
                <v-file-input v-model="imagen" accept="image/png, image/jpeg, image/jpg"
                    placeholder="Carge una imagen......" persistent-placeholder solo required flat prepend-icon=""
                    outlined :clearable="true" height="5" @change="cargar_imagen()">

                </v-file-input>
                <v-btn color="info" class="mr-2" width="47%" @click="verificar_imagen()">
                    Verificar Resultado
                </v-btn>
                <br>

                <v-card v-if="resultado_mostrar">
                    <br>
                    <v-chip class="ma-2" label color="primary">
                        {{ melanoma_text }}
                    </v-chip>
                    <br>
                    <label>Melanoma</label>
                    <v-progress-linear v-model="es_melanoma" color="success" height="25">
                        <template v-slot:default="{ value }">
                            <strong>{{ Math.ceil(value) }}%</strong>
                        </template>
                    </v-progress-linear>
                    <br>
                    <label>No Melanoma</label>
                    <v-progress-linear v-model="no_melanoma" color="error" height="25">
                        <template v-slot:default="{ value }">
                            <strong>{{ Math.ceil(value) }}%</strong>
                        </template>
                    </v-progress-linear>
                    <br>
                    <v-btn color="error" class="mr-2" width="47%" @click="guardar_resultado()">
                        Guardar Resultado
                    </v-btn>
                    <br> <br> <br>
                </v-card>





            </v-card-text>


        </v-card>
    </section>
</template>

<script>
import api from "../../Recursos/api";
import cooki from "../../Recursos/cooki";
export default {
    name: "actividad_diagnostico_melanoma_vista",
    components: {
    },
    data: () => ({
        foco: null,
        btn_verificar: false,
        resultado_mostrar: false,

        imagen: "",
        imagePreviewURL: 'https://cdn-icons-png.flaticon.com/512/13/13752.png',
        es_melanoma: '',
        no_melanoma: '',
        melanoma_text: '',
        cont_resultado: 0,
    }),
    methods: {
        imagen_opcion(numero) {
            this.foco = numero;
            this.btn_verificar = true;
        },
        async verificar_imagen() {
            try {
                console.log(this.imagen)
                let InstFormData = new FormData();
                InstFormData.append("imagen", this.imagen);
                var http = this.axios.create({
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                var response = await http.post(api.predecir_imagen, InstFormData);
                console.log(response);
                if (response.data.tipo == "success") {
                    this.cont_resultado++;
                    this.$toast.open({
                        message: response.data.mensaje,
                        type: 'info',
                        duration: 1000,
                        position: "top-right",
                        pauseOnHover: true,
                    });

                    this.es_melanoma = response.data.data.valores[0] * 100;
                    this.no_melanoma = response.data.data.valores[1] * 100;
                    this.melanoma_text = response.data.data.resultado;
                    this.resultado_mostrar = true;
                    //this.guardar_resultado('no_melanoma');
                    this.foco = null;
                    this.btn_verificar = false;
                    if (this.cont_resultado == this.intento) {
                        //this.resultado_mostrar = true;
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
        async guardar_resultado() {

            try {
                var data = await {
                    actividadId: this.$route.params.id * 1,
                    estudianteId: cooki.get_usuario_iniciado().estudiante_id,
                    observacion: this.melanoma_text
                }
                console.log(data);
                var response = await this.axios.post(api.crea_resultado, data);
                if (response.data.tipo == "success") {
                    this.imagen = "";
                    this.imagePreviewURL = 'https://cdn-icons-png.flaticon.com/512/13/13752.png';
                    this.resultado_mostrar = false;
                    this.cont_resultado++;
                }
                this.$toast.open({
                    message: response.data.mensaje,
                    type: response.data.tipo,
                    duration: 1000,
                    position: "top-right",
                    pauseOnHover: true,
                });


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

        cargar_imagen() {
            let reader = new FileReader();
            reader.onload = () => {
                //console.log(reader.result);
                this.imagePreviewURL = reader.result;
            };
            reader.readAsDataURL(this.imagen);
        },

    }
};
</script>
<style scoped>
</style>
