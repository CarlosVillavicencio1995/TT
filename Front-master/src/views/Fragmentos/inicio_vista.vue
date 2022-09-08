<template>
    <v-carousel>
        <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src" reverse-transition="fade-transition"
            transition="fade-transition"></v-carousel-item>
        <div class="font-weight-light grey--text text-h6 mb-2">
            For the perfect meal
        </div>
        <h3 class="text-h4 font-weight-light orange--text mb-2">
            QW cooking utensils
        </h3>
        <div class="font-weight-light text-h6 mb-2">
            Our Vintage kitchen utensils delight any chef.<br>
            Made of bamboo by hand
        </div>
    </v-carousel>
</template>
<script>
export default {
    data() {
        return {
            items: [

                {
                    src: 'https://programacion.net/files/article/article_02106_.jpg',
                },
                {
                    src: 'https://img.freepik.com/vector-gratis/fondo-ilustrado-laboratorio-quimica_52683-68249.jpg?w=2000',
                },

            ],
        }
    },
}
</script>