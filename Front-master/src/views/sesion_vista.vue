<template>
    <v-app>
        <v-main>
            <center>
                <v-container fluid style="max-width: 800px;">
                    <v-card color="onrange">
                        <v-card-title class="text-center justify-center py-6 ">
                            <h1 class="font-weight-bold text-h2 basil--text">
                                Melanoma
                            </h1>
                        </v-card-title>

                        <v-tabs v-model="tab" background-color="transparent" color="info" grow>
                            <v-tab v-for="item in items" :key="item">
                                {{ item }}
                            </v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="tab">
                            <v-tab-item>
                                <v-card flat>
                                    <inicio_sesion_vista ></inicio_sesion_vista>

                                </v-card>
                            </v-tab-item>
                            <v-tab-item>
                                <v-card flat>
                                    <registro_vista :tab.sync="tab"></registro_vista>
                                </v-card>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card>
                </v-container>
            </center>
        </v-main>
    </v-app>
</template>

<script>
import inicio_sesion_vista from "@/components/inicio_sesion_vista";
import registro_vista from "@/components/registro_vista";
export default {
    name: "sesion_vista",
    components: {
    inicio_sesion_vista,
    registro_vista
},
    data: () => ({
        tab: 0,
        items: [
            'Inicio de Sesión', 'Registrarse',
        ],

    }),

};
</script>
<style scoped>
/* Helper classes */
.basil {
    background-color: #FFFBE6 !important;
}

.basil--text {
    color: #356859 !important;
}
</style>
