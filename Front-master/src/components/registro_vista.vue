<template>
    <section>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12" md="6">
                    <v-text-field v-model="nombre" type="text" name="input-10-1" label="Nombre"
                        :error-messages="error_nombre" @input="$v.nombre.$touch()" @blur="$v.nombre.$touch()">
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <v-text-field v-model="apellido" type="text" name="input-10-1" label="Apellido"
                        :error-messages="error_apellido" @input="$v.apellido.$touch()" @blur="$v.apellido.$touch()">
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <v-text-field v-model="cedula" type="text" name="input-10-1" label="Cédula"
                        :error-messages="error_cedula" @input="$v.cedula.$touch()" @blur="$v.cedula.$touch()">
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <v-text-field v-model="carrera" type="text" name="input-10-1" label="Carrera"
                        :error-messages="error_carrera" @input="$v.carrera.$touch()" @blur="$v.carrera.$touch()">
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <v-text-field v-model="ciclo" type="number" name="input-10-1" label="Ciclo" min="1" max="11"
                        :error-messages="error_ciclo" @input="$v.ciclo.$touch()" @blur="$v.ciclo.$touch()">
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <v-text-field v-model="paralelo" type="text" name="input-10-1" label="Paralelo" @keyup="mayus()"
                        :error-messages="error_paralelo" @input="$v.paralelo.$touch()" @blur="$v.paralelo.$touch()">
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <v-text-field v-model="correo" type="text" name="input-10-1" label="Correo"
                        :error-messages="error_correo" @input="$v.correo.$touch()" @blur="$v.correo.$touch()">
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <v-text-field v-model="clave" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'" name="input-10-1" label="Contraseña"
                        @click:append="show1 = !show1" :error-messages="error_clave" @input="$v.clave.$touch()"
                        @blur="$v.clave.$touch()"></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                    <v-btn x-large color="success" dark @click="registrar_usuario()">
                        Registrar
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, minLength, numeric, alpha, maxLength, } from "vuelidate/lib/validators";
const min_max = (value) => {
    if (value >= 1 && value <= 11) {
        return true;
    } else {
        return false;
    }
};

import api from "../Recursos/api";
export default {
    name: "registro_vista",

    mixins: [validationMixin],
    validations: {
        nombre: { required, },
        apellido: { required, },
        cedula: { required, minLength: minLength(10) },
        carrera: { required, },
        ciclo: { required, min_max, numeric },
        paralelo: { required, alpha, maxLength: maxLength(1), },
        correo: { required, email, },
        clave: { required, minLength: minLength(4) },
    },

    components: {

    },
    data: () => ({
        show1: false,
        estado_registro: false,
        nombre: "",
        apellido: "",
        cedula: "",
        carrera: "",
        ciclo: "",
        paralelo: "",
        correo: "",
        clave: "",

    }),
    computed: {
        error_nombre() {
            const errors = [];
            if (!this.$v.nombre.$dirty) return errors;
            !this.$v.nombre.required && errors.push("El nombre es un campo requerido.");
            return errors;
        },
        error_apellido() {
            const errors = [];
            if (!this.$v.apellido.$dirty) return errors;
            !this.$v.apellido.required && errors.push("El apellido es un campo requerido.");
            return errors;
        },
        error_cedula() {
            const errors = [];
            if (!this.$v.cedula.$dirty) return errors;
            !this.$v.cedula.required && errors.push("La cédula es un campo requerido.");
            !this.$v.cedula.minLength && errors.push("La cédula debe tener minimo 10 caracteres.");
            return errors;
        },
        error_carrera() {
            const errors = [];
            if (!this.$v.carrera.$dirty) return errors;
            !this.$v.carrera.required && errors.push("La carrera es un campo requerido.");
            return errors;
        },
        error_ciclo() {
            const errors = [];
            if (!this.$v.ciclo.$dirty) return errors;
            !this.$v.ciclo.required && errors.push("El ciclo es un campo requerido.");
            !this.$v.ciclo.numeric && errors.push("El ciclo es un campo de tipo numerico.");
            !this.$v.ciclo.min_max && errors.push("El ciclo debe ser un numero mayor o igual a 1 y menor o igual a 11.");
            return errors;
        },
        error_paralelo() {
            const errors = [];
            if (!this.$v.paralelo.$dirty) return errors;
            !this.$v.paralelo.required && errors.push("El paralelo es un campo requerido.");
            !this.$v.paralelo.alpha && errors.push("El paralelo es un campo de una sola de letra(Ejm: A,B,C....).");
            !this.$v.paralelo.maxLength && errors.push("El paralelo es un campo de una sola letra(Ejm: A,B,C....).");
            return errors;
        },
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
    props: {
        tab: [Number],
    },

    methods: {
        async registrar_usuario() {
            try {
                var usuario = {
                    nombre: this.nombre,
                    apellido: this.apellido,
                    cedula: this.cedula,
                    carrera: this.carrera,
                    ciclo: this.ciclo,
                    paralelo: this.paralelo,
                    correo: this.correo,
                    clave: this.clave,
                }

                this.$v.$touch();

                if (!this.$v.$invalid) {
                    //console.log("estoy aki")

                    var response = await this.axios.post(api.registrar_usuario, usuario);
                    if (response.data.tipo == "success") {
                        this.estado_registro = true;
                    }
                    this.$toast.open({
                        message: response.data.mensaje,
                        type: response.data.tipo,
                        duration: 5000,
                        position: "top-right",
                        pauseOnHover: true,
                    });
                    //this.$router.push({name: 'Inicio'}).catch(() => {});
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
                if (this.estado_registro) {
                    this.$emit("update:tab", 0);
                    this.lipiar_datos(); 
                    //console.log("Fin");
                }

            }

        },


        mayus() {
            this.paralelo = this.paralelo.toUpperCase();
        },
        lipiar_datos() {
            this.show1 = false;
            this.estado_registro = false;
            this.nombre = "";
            this.apellido = "";
            this.cedula = "";
            this.carrera = "";
            this.ciclo = "";
            this.paralelo = "";
            this.correo = "";
            this.clave = "";
            this.$v.$reset();
        }

    },

};
</script>
