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
                            <itens-menu :botoes="botoes" titulo="Selecionar Skin"></itens-menu>
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
    name: "SelecionarSkins",
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
    },
    methods: {
        async getItensMenu() {
            await MenuService
                .getItensMenu('/usuario_skins')
                .then(response => {
                    if (response) {
                        this.botoes = response.data;
                    }
                }, () => {
                    this.mensagem.text = 'Não foi possível obter os dados do servidor'
                    this.mensagem.visivel = true;
                })
        }
    }
}
</script>

<style scoped>

</style>
