<template>
    <v-list rounded>
        <v-subheader v-if="titulo" class="mt-5 mb-5">
            <h2>{{ titulo }}</h2>
        </v-subheader>
        <v-list-item
                v-for="(botao, index) in botoes"
                :key="index"
                @click="ativar(botao)"
                :class="botao.ativo ? 'botao' : ''"
        >
            <v-list-item-icon>
                <v-icon v-if="botao.icon" :color="botao.cor_icon">{{ botao.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title v-text="botao.nome"></v-list-item-title>
            </v-list-item-content>

        </v-list-item>
    </v-list>
</template>

<script>
    export default {
        name: "itens-menu",
        props: {
            botoes: {
                default: Array(),
                required: true,
                funcao: Function
            },
            titulo: {
                default: '',
            }
        },
        methods: {
            ativar(botaoClicado) {
                this.$emit('clicou', botaoClicado.id);
                this.botoes.forEach(botao => {
                    botaoClicado.id === botao.id ? botao.ativo = true : botao.ativo = false;
                });
                if (botaoClicado.funcao) {
                    botaoClicado.funcao();
                }
                if (botaoClicado.rota) {
                    this.$router.push(botaoClicado.rota);
                }
            }
        },
    }
</script>

<style scoped>
    .botao {
        background-color: #2196F3;
    }
    .botao * {
        color: white;
    }
</style>
