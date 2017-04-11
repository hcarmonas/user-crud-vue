<template>
  <form novalidate $submint.stop.prevent="submit">
    <div class="container-input">
      <div class="form-group">
        <div :class="{'input-invalid': $v.name.$error}">
          <label for="name">Nome</label>
          <input class="form-control"
                 type="text"
                 name="name"
                 v-model="name"
                 @input="$v.name.$touch()"/>
        </div>
        <span v-if="$v.name.$error" class="input-invalid-message">Campo inválido</span>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input class="form-control" type="text" name="email" v-model="email"/>
      </div>
      <div class="button-container">
        <router-link to="/users">
          <button type="button"
                  class="btn btnBack">Voltar</button>
        </router-link>
        <router-link to="/users">
          <button type="submit"
                  class="btn btnNew" v-on:click="submit">Salvar</button>
        </router-link>
      </div>
    </div>
  </form>

</template>

<script>
import {mapActions} from 'vuex'
import {email, minLength, required} from 'vuelidate/lib/validators'
import {mapModels} from '~/utils'

export default {
  async mounted () {
    await this.getUser(this.$route.params.id)
  },
  computed: {
    ...mapModels('users/editUser', [
      'id',
      'name',
      'email'
    ])
  },
  methods: {
    ...mapActions('users', [
      'getUser',
      'submitUser'
    ]),
    async submit () {
      let resp = await this.submitUser()
      console.log(resp)
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(4)
    },
    email: {
      required,
      email
    }
  }
}
</script>

<style scoped>
.input-invalid{
  color: red;
}

.input-invalid input{
  border-color: red;
}

.input-invalid-message{
  color: red;
}

</style>
