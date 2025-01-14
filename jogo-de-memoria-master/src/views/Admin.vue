<template>
  <div class="d-flex justify-center align-center fill-height">
    <div class="bg-white col-4 box-com-sombra border-radius-5">
        <div class="mt-5">
            <v-text-field label="Senha de Admin" full-width :rules="rules" v-model="admin" hide-details="auto"></v-text-field>
        </div>
        <div class="mt-5">
            <v-btn @click="logarAdmin" :disabled="admin.length < 3">logar como ADMIN</v-btn>
        </div>
        <div class="mt-5">
            <v-btn @click="goTogame">Eu NÃO SOU ADMIN</v-btn>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "Admin",
        data () {
            return {
                rules: [
                    value => !!value || 'Campo obrigatório',
                    value => (value && value.length >= 3) || 'Min 3 caracteres',
                ],
                admin: '',
                vezes: 0
            }
        },
        methods: {
            goTogame() {
                let admin = localStorage.getItem('admin');
                if (admin) {
                    localStorage.removeItem('admin')
                }
                this.$router.push('menu-principal');
            },
            logarAdmin() {
                if (this.admin !== 'ADMIN' && this.admin !== 'admin' && this.vezes === 0) {
                    this.vezes ++;
                    let regra = value => value === 'admin' || value === 'ADMIN' || 'Senha errada';
                    this.rules.push(regra);
                    return;
                } else if (this.admin !== 'ADMIN' && this.admin !== 'admin') return;
                localStorage.setItem('admin', true);
                this.$router.push('menu-principal');
            }
        }
}
</script>
        