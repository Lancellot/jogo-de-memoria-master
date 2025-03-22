<template>
  <v-app class="bg-gray">
    <v-app-bar
      app
      color="primary"
      dark
    >
      <h3>Jogo de Memória</h3>
      <div class="ml-10">
        <small>Desenvolvido por Assis Neto,  Luiza Lamarque,  Renan Schmitt,  Willian Bello</small>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>

<style>
  html, body {
    height: 100%;
  }

  .v-content__wrap {
    background-color: #eaeaea;
  }

  .bg-white {
    background-color: white;
  }

  .border-radius-5 {
    border-radius: 5px;
  }

  .box-com-sombra {
    box-shadow: 0 2px 4px #999898;
  }

  .fade-enter-active {
    transition-duration: 0.2s;
    transition-delay: 0.1s;
    transition-property: opacity;
    transition-timing-function: linear;
  }
  .fade-leave-active {
    transition-duration: 0.1s;
    transition-property: opacity;
    transition-timing-function: linear;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }

  .mesa {
    background-color: #2B3736;
    padding: 20px;
    min-height: 100%;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .cartas .carta {
    position: relative;
    display: inline-block;
    width: 180px;
    height: 230px;
    margin: 5px;
    transition: opacity 0.3s;
  }

  .cartas .carta .frente, .cartas .carta .costas {
    border-radius: 10px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transform: translateZ(0);
    transition: transform 0.5s;
    transform-style: preserve-3d;
  }

  .cartas .carta .costas {
    background-color: #bdbdbd;
    background-image: url('/src/assets/logo.png');
    background-size: 75%;
    background-position: center;
    background-repeat: no-repeat;
  }

  .cartas .carta .frente {
    transform: rotateY(-180deg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .cartas .carta.virada .costas, .cartas .carta.correta .costas {
    transform: rotateY(180deg);
  }

  .cartas .carta.virada .frente, .cartas .carta.correta .frente {
    transform: rotateY(0deg);
  }

  .cartas .carta.correta {
    opacity: 0.3;
  }


</style>
