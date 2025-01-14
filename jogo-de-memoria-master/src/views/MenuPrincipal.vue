<template>
  <div class="d-flex justify-center align-center fill-height">
    <div class="bg-white col-4 box-com-sombra d-flex justify-center align-center border-radius-5">
      <mensagens :text="mensagem.text" :snackbar="mensagem.visivel"></mensagens>
      <itens-menu :botoes="botoes" titulo="Card Reward"></itens-menu>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import ItensMenu from "@/components/shared/ItensMenu";
import MenuService from "@/services/MenuService";
import Mensagens from "@/components/shared/Mensagens";

export default {
  name: "MenuPrincipal",
  components: {Mensagens, ItensMenu},
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
              .getItensMenu('/menu_principal')
              .then(response => {
                if (response) {
                  let botoes = response.data;
                  if (!localStorage.getItem('admin')) {
                    botoes.splice(2);
                  }
                  this.botoes = botoes;
                }
              }, () => {
                this.mensagem.text = 'Não foi possível obter os dados do servidor'
                this.mensagem.visivel = true;
              });
    },
    salvarDificuldade() {

    }
  }
}
</script>
