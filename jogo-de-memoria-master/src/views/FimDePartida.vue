<template>
<div class="d-flex justify-center align-center fill-height">
    <div class="bg-white col-10 box-com-sombra d-flex justify-center align-center border-radius-5">
        <v-row>
            <v-col>
                <v-row>
                    <div class="ml-auto mr-auto">
                        <h2>Fim de Jogo</h2>
                    </div>
                    <v-col cols="12" class="d-flex justify-center align-center">
                        <!-- Inicia conteúdo da página -->
                        <div class="mt-10" style="width: 50%">
                            <v-text-field label="Insira o nome do jogador" full-width :rules="rules" v-model="jogador.nome" hide-details="auto"></v-text-field>
                        <div class="mt-5">
                            <v-btn @click="salvar" :disabled="jogador.nome.length < 3">Enviar</v-btn>
                        </div>
                        </div>
                        <!-- Final conteúdo da página -->
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</div>
</template>

<script>
    import UsuarioService from "@/services/UsuarioService";
    export default {
        name: "FimDePartida",
        data () {
            return {
                rules: [
                    value => !!value || 'Campo obrigatório',
                    value => (value && value.length >= 3) || 'Min 3 caracteres',
                ],
                jogador: {
                    nome: '',
                    pontuacao: 0
                },
            }
        },
        methods: {
            salvar() {
                let usuario = UsuarioService.getStorage();
                if (usuario && usuario.pontuacao) {
                    this.jogador.pontuacao = usuario.pontuacao;
                }
                UsuarioService.salvarPontuacaoTotal();
                UsuarioService
                    .salvarJogador(this.jogador)
                    .then(() => {
                        this.$router.push('lista-jogadores');
                    })
            }
        }
    }
</script>

<style scoped>

</style>
