<template>
    <div>
        <div class="row">
            <div class="col-md-3">Tempo: {{ tempo }} segundos</div>
            <div class="col-md-3">Pontos: {{ pontos }}</div>
            <div class="col-md-3" v-if="combo > 1">Combo: {{ combo }}X</div>
        </div>
    </div>
</template>

<script>
    import MenuService from "@/services/MenuService";

    export default {
        name: "UI",
        props: ['pontosControle', 'combo'],
        data() {
            return {
                tempo: 0,
                pontos: 0,
                contador: null
            }
        },
        created() {
            this.getDificuldade();
            this.contador = setInterval(()=> {
                this.tempo -= 1;
                if (this.tempo <= 0) {
                    clearInterval(this.contador);
                    this.$emit('tempoesgotado', this.tempo);
                }
            }, 1000)
        },
        watch: {
            pontosControle: function (novoValor, antigoValor) {
                console.log(antigoValor);
                this.pontos = novoValor;
            }
        },
        methods: {
            getDificuldade() {
                MenuService
                    .getDificuldade()
                    .then(response => {
                        switch (response.data.dificuldade) {
                            case 1: {
                                this.tempo = 60;
                                break;
                            }
                            case 2: {
                                this.tempo = 240;
                                break;
                            }
                            case 3: {
                                this.tempo = 180;
                                break;
                            }

                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>
