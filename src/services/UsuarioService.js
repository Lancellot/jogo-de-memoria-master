import Axios from "axios";

const base_url = 'http://localhost:3000';
const configAxios = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
        "Content-Type": "application/json;charset=UTF-8"
    },
    baseURL: base_url
}

const axiosInstancia = Axios.create(configAxios);

export default {
    getUsuarios(path = 'jogadores') {
        return axiosInstancia.get(path);
    },
    salvarJogador(jogador, path = 'jogadores') {
        return axiosInstancia.post(path, jogador);
    },
    salvarStorage(jogador) {
        let player = localStorage.getItem('jogador');
        if (player) {
            player = JSON.parse(player);
            jogador.pontuacao = jogador.pontuacao + player.pontuacao;
        }
        localStorage.setItem('jogador', JSON.stringify(jogador));
        let totalPontos = localStorage.getItem('pontuacaototal');
        if (totalPontos) {
            totalPontos = totalPontos + jogador.pontuacao;
        } else {
            totalPontos = jogador.pontuacao;
        }
        localStorage.setItem('pontuacaototal', totalPontos);
        return player;
    },
    getStorage() {
      let player = localStorage.getItem('jogador');
      if (player) {
          player = JSON.parse(player);
      }
      return player;
    },
    salvarPontuacaoTotal() {
        let totalPontos = localStorage.getItem('pontuacaototal');
        if (totalPontos) {
            return axiosInstancia.put('pontuacao_total', { pontuacao: totalPontos });
        } else {
            return axiosInstancia.put('pontuacao_total', { pontuacao: 0 });
        }
    }
}
