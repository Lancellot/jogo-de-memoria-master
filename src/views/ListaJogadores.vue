<template>
    <div class="d-flex justify-center align-center fill-height">
        <div class="bg-white col-10 box-com-sombra d-flex justify-center align-center border-radius-5">
            <v-row>
                <v-col>
                    <v-row>
                        <v-col>
                            <v-btn @click="voltar()">
                                <span><v-icon class="mr-2">mdi-backburger</v-icon>Voltar para o início</span>
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" class="d-flex justify-center align-center">
                            <!-- Inicia conteúdo da página -->
                            <div class="mt-10">
                                <v-simple-table>
                                    <template v-slot:default>
                                        <thead>
                                        <tr>
                                            <th class="text-left">Nome</th>
                                            <th class="text-left">Pontuação</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="item in jogadores" :key="item.nome">
                                            <td>{{ item.nome }}</td>
                                            <td>{{ item.pontuacao }}</td>
                                        </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
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
    import UsuarioService from "@/services/UsuarioService";

    export default {
        name: "ListaJogadores",
        data() {
            return {
                jogadores: []
            }
        },
        created() {
           this.getJogadores();
        },
        methods: {
            getJogadores() {
                UsuarioService
                    .getUsuarios()
                    .then(response => {
                        this.jogadores = response.data;
                    })
            },
            voltar() {
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>

</style>
