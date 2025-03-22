<template>
    <div class="d-flex justify-center align-center fill-height">
        <div class="bg-white col-10 box-com-sombra d-flex justify-center align-center border-radius-5">
            <v-row>
                <v-col>
                    <head-pagina></head-pagina>
                    <v-row>
                        <v-col cols="12" class="d-flex justify-center align-center">
                            <!-- Inicia conteúdo da página -->
                            <div class="col-12">
                                <mensagens :text="mensagem.text" :snackbar="mensagem.visivel"></mensagens>
                                <v-data-table
                                        :headers="headers"
                                        :items="desserts"
                                        sort-by="id"
                                        class="elevation-1"
                                        hide-default-footer
                                        :loading="carregando" loading-text="Carregando cartas... aguarde"
                                >
                                    <template v-slot:item.imagem="{ item }">
                                        <v-img :src="item.imagem" class="mt-2 mb-2" max-height="80px" max-width="80px"></v-img>
                                    </template>
                                    <template v-slot:top>
                                        <v-toolbar flat color="white">
                                            <v-toolbar-title>Configurar Cartas</v-toolbar-title>
                                            <v-divider
                                                    class="mx-4"
                                                    inset
                                                    vertical
                                            ></v-divider>
                                            <v-spacer></v-spacer>
                                            <v-dialog v-model="dialog" max-width="70%">
                                                <template v-slot:activator="{ on }">
                                                    <v-btn class="ml-5 mb-2" @click="initialize()">Atualiza Lista <v-icon>mdi-refresh</v-icon></v-btn>
                                                    <v-btn color="primary" dark class="mb-2" v-on="on">Nova Carta</v-btn>
                                                </template>
                                                <v-card>
                                                    <v-form ref="form" v-model="validFormEdit">
                                                        <v-card-title>
                                                            <span class="headline">{{ formTitle }}</span>
                                                        </v-card-title>

                                                        <v-card-text>
                                                            <v-container>
                                                                <v-row>
                                                                    <v-col cols="3">
                                                                        <v-card flat tile class="d-flex">
                                                                            <v-img
                                                                                    :src="editedItem.imagem && editedItem.imagem !== 'http://' ? editedItem.imagem : ''"
                                                                                    :lazy-src="`https://picsum.photos/1/5?`"
                                                                                    aspect-ratio="1"
                                                                                    @error="imageNaoCarregou"
                                                                                    @load="imageCarregou"
                                                                                    class="grey lighten-2"
                                                                            >
                                                                                <template v-slot:placeholder>
                                                                                    <v-row
                                                                                            class="fill-height ma-0"
                                                                                            align="center"
                                                                                            justify="center"
                                                                                    >
                                                                                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                                                                    </v-row>
                                                                                </template>
                                                                            </v-img>
                                                                        </v-card>
                                                                    </v-col>
                                                                    <v-col cols="9">
                                                                        <v-row>
                                                                            <v-col cols="12" sm="6" md="6">
                                                                                <v-text-field v-model="editedItem.name" :rules="rulesName" label="Nome da Carta"></v-text-field>
                                                                            </v-col>
                                                                            <v-col cols="12" sm="6" md="6">
                                                                                <v-text-field v-model="editedItem.sigla" :rules="rulesSigla" label="Sigla"></v-text-field>
                                                                            </v-col>
                                                                            <v-col cols="12" sm="6" md="12">
                                                                                <v-text-field v-model="editedItem.imagem" :rules="rulesImage" label="Imagem"></v-text-field>
                                                                            </v-col>
                                                                        </v-row>
                                                                    </v-col>
                                                                </v-row>
                                                            </v-container>
                                                        </v-card-text>

                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                                            <v-btn color="blue darken-1" text :disabled="!validFormEdit" @click="save">Save</v-btn>
                                                        </v-card-actions>
                                                    </v-form>
                                                </v-card>
                                            </v-dialog>
                                        </v-toolbar>
                                    </template>
                                    <template v-slot:item.actions="{ item }">
                                        <v-icon
                                                small
                                                class="mr-2"
                                                @click="editItem(item)"
                                        >
                                            mdi-pencil
                                        </v-icon>
                                        <v-icon
                                                small
                                                @click="deleteItem(item)"
                                        >
                                            mdi-delete
                                        </v-icon>
                                    </template>
                                    <template v-slot:no-data>
                                        <v-btn color="primary" @click="initialize">Reset</v-btn>
                                    </template>
                                </v-data-table>
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
    import Mensagens from "@/components/shared/Mensagens";
    import CartasService from "@/services/CartasService";
    // import MenuService from "@/services/MenuService";
    export default {
        name: "ConfigurarCartas",
        components: {HeadPagina, Mensagens},
        data() {
            return {
                botoes: [],
                botaoSheet: {
                    descricao: 'tem certeza que deseja excluir esta carta?',
                    cor: 'darnger'
                },
                carregando: true,
                cartas: [],
                mensagem: {
                    text: '',
                    visivel: false
                },
                dialog: false,
                headers: [
                    {
                        "text": "ID",
                        "align": "start",
                        "value": "id"
                    },
                    {
                        "text": "Nome da carta",
                        "value": "name"
                    },
                    {
                        "text": "Sigla",
                        "value": "sigla"
                    },
                    {
                        "text": "imagem",
                        "value": "imagem"
                    },
                    {text: 'Actions', value: 'actions', sortable: false},
                ],
                desserts: [],
                editedIndex: -1,
                editedItem: {
                    name: '',
                    sigla: '',
                    imagem: '',
                },
                defaultItem: {
                    name: '',
                    sigla: '',
                    imagem: '',
                },
                errorImage: false,
                rulesName: [
                    v => !!v || 'É obrigatório inserir um nome',
                    v => (v && v.length >= 3) || 'O nome precisa ter no mínimo 3 caracteres',
                ],
                rulesSigla: [
                    v => !!v || 'É obrigatório inserir uma sigla',
                ],
                validFormEdit: false
            }
        },
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nova Carta' : 'Editar Carta'
            },
            rulesImage () {
                const rules = [];
                if (this.errorImage || !this.editedItem.imagem) {
                    rules.push('É obrigatório inserir uma imagem')
                }

                return rules;
            }
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },

        created () {
            this.initialize()
        },

        methods: {

            imageNaoCarregou() {
                this.errorImage = true;
            },
            imageCarregou() {
                this.errorImage = false;
            },
            initialize () {
                this.carregando = true;
                this.desserts = [];
                CartasService
                    .getCartasCadastradas()
                    .then(response => {
                        if (response) {
                            this.desserts = response.data;
                            this.carregando = false;
                        }
                    }, () => {
                        this.mensagem.text = 'Não foi possível obter os dados do servidor'
                        this.mensagem.visivel = true;
                        this.carregando = false;
                    });
            },

            editItem (item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem (item) {
                const index = this.desserts.indexOf(item)
                confirm('Tem certeza que quer deletar a carta?') && this.desserts.splice(index, 1)
                CartasService.delete(item.id);
            },

            close () {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save () {
                if (this.editedIndex > -1) {
                    CartasService
                        .atualiza(this.editedItem.id, this.editedItem)
                        .then(() => {
                            Object.assign(this.desserts[this.editedIndex], this.editedItem)
                        });
                } else {
                    CartasService
                        .inserir(this.editedItem)
                        .then(response => {
                            this.desserts.push(response.data);
                        })
                }
                this.close()
            },
        }
    }
</script>

<style scoped>

</style>
