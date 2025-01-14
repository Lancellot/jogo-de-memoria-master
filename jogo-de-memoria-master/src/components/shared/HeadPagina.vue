<template>
    <div>
        <v-row>
            <v-col>
                <v-btn @click="voltar()">
                    <span><v-icon class="mr-2">mdi-backburger</v-icon>Voltar</span>
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        name: "head-pagina",
        props: {
            inicio: {
                default: false
            }
        },
        methods: {
            voltar() {
                if (this.inicio) {
                    this.$router.push('/');
                    return;
                }
                this.$router.go(-1);
            }
        },
    }
</script>

<style scoped>

</style>
