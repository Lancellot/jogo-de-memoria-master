<template>
    <v-snackbar top="top" :value="snackbar">
        {{ atualizaTexto }}
        <v-btn
            color="pink"
            text
            @click="fecha"
        >
            Fechar
        </v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        name: "Mensagens",
        props: {
            text: {
                default: '',
            },
            snackbar: {
                default: false
            }
        },
        methods: {
            fecha() {
                this.$router.push('/configurar-jogo');
                return this.snackbar;
            }
        },
        computed: {
            atualizaTexto() {
                return this.text;
            },
        }
    }
</script>

<style scoped>

</style>
