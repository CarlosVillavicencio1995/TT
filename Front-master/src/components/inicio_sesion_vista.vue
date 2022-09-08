<template>
    <section>
        <v-container class="transparente" style="max-width:500px;">
        <br>
            <v-row>
                <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="correo" type="text" name="input-10-1" label="Correo"
                        :error-messages="error_correo" @input="$v.correo.$touch()" @blur="$v.correo.$touch()">
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                     <v-text-field v-model="clave" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'" name="input-10-1" label="Contraseña"
                        @click:append="show1 = !show1" :error-messages="error_clave" @input="$v.clave.$touch()"
                        @blur="$v.clave.$touch()"></v-text-field>
                </v-col>
                <v-col md="12">
                    <v-btn x-large color="success" dark @click.stop="iniciar_sesion()">
                        Acceder
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";
import api from "../Recursos/api";
import cooki from "../Recursos/cooki";
export default {
    name: "inicio_sesion_vista",
    mixins: [validationMixin],
    validations: {
        correo: { required, email, },
        clave: { required, minLength: minLength(4) },
    },
    data: () => ({
        estado_inicio_sesion:false,
        show1: false,
        clave: "",
        correo: "",

    }),
    computed: {
        error_correo() {
            const errors = [];
            if (!this.$v.correo.$dirty) return errors;
            !this.$v.correo.email && errors.push("El correo no es valido, ingrese uno valido.");
            !this.$v.correo.required && errors.push("El correo es un campo requerido.");
            return errors;
        },
        error_clave() {
            const errors = [];
            if (!this.$v.clave.$dirty) return errors;
            !this.$v.clave.required && errors.push("La clave es un campo requerido.");
            !this.$v.clave.minLength && errors.push("La clave debe tener minimo 4 caracteres.");
            return errors;
        },
    },
    methods: {
        async iniciar_sesion() {
            try {
                var data = {
                    correo: this.correo,
                    clave: this.clave,
                }
                
                this.$v.$touch();

                if (!this.$v.$invalid) {
                    //console.log("estoy aki")
                    var response = await this.axios.post(api.inisio_sesion, data);
                    if (response.data.tipo == "success") {
                        this.estado_inicio_sesion = true;
                        cooki.set_usuario(response.data.data);
                    }
                    this.$toast.open({
                        message: response.data.mensaje,
                        type: response.data.tipo,
                        duration: 5000,
                        position: "top-right",
                        pauseOnHover: true,
                    });
                }
            } catch (error) {
                this.$toast.open({
                    message: error.statusText,
                    type: "error",
                    duration: 5000,
                    position: "top-right",
                    pauseOnHover: true,
                });

            } finally {
                //console.log(this.estado_registro)
                if (this.estado_inicio_sesion) {
                    this.$router.push({name: 'Inicio'}).catch(() => {});
                }
                
            }

        },
    },

};
</script>
