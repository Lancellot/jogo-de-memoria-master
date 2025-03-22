<template>
<div class="d-flex justify-center align-center fill-height">
    <div class="bg-white col-10 box-com-sombra d-flex justify-center align-center border-radius-5">
        <v-row>
            <v-col>
                <head-pagina></head-pagina>
                <v-row>
                    <v-col cols="12" class="d-flex justify-center align-center">
                        <!-- Inicia conteúdo da página -->
                        <div class="mt-10">
                            <mensagens :text="mensagem.text" :snackbar="mensagem.visivel"></mensagens>
                            <itens-menu :botoes="botoes" @clicou="salvarDificuldade" titulo="Selecionar Dificuldade"></itens-menu>
                        </div>
                        <!-- Final conteúdo da página -->
                    </v-col>
                </v-row>
                <v-row>
                    <v-col></v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</div>
</template>

<script>
import HeadPagina from "@/components/shared/HeadPagina";
import ItensMenu from "@/components/shared/ItensMenu";
import Mensagens from "@/components/shared/Mensagens";
import MenuService from "@/services/MenuService";

export default {
    name: "SelecionarDificuldade",
    components: {HeadPagina, ItensMenu, Mensagens},
    data() {
        return {
            botoes: [],
            mensagem: {
                text: '',
                visivel: false
            }
        }
    },
    created() {
      this.getItensMenu();
      this.getDificuldade();
    },
    methods: {
        async getItensMenu() {
            await MenuService
                .getItensMenu('/menu_dificuldade')
                .then(response => {
                    if (response) {
                        this.botoes = response.data;
                    }
                }, () => {
                    this.mensagem.text = 'Não foi possível obter os dados do servidor'
                    this.mensagem.visivel = true;
                })
        },
        async salvarDificuldade(dificuldade) {
            await MenuService
                .salvarDificuldade(dificuldade)
                .then(() => {
                    this.mensagem.text = 'Dificuldade selecionada com Sucesso!';
                    this.mensagem.visivel = true;
                    setTimeout(() => {
                        this.mensagem.visivel = false;
                        this.$router.push('/configurar-jogo')
                    }, 2000)
                })
        },
        async getDificuldade() {
            await MenuService
                .getDificuldade()
                .then(response => {
                    this.botoes.forEach(botao => {
                        if (botao.id === response.data.dificuldade) {
                            botao.ativo = true;
                        }
                    })
                })
        }
    }
}
</script>

<style scoped>

</style>
