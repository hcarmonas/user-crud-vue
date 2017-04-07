<template lang="pug">
md-layout(md-align="center" md-flex-small="100" md-flex-medium="50")
  md-card.card-container.card-color
    md-card-header
      .md-title Adicionar novo usuário
    md-card-content
      form(novalidate @submit.stop.prevent="submit")
        md-input-container(:class="{'md-input-invalid': $v.username.$error || duplicatedUser}")
          label Login
          md-input(
            v-model="username"
            name="username"
            @input="$v.username.$touch()"
          )
          span.md-error(
            v-if="!$v.username.username && $v.username.length"
          ) Use somente letras, números, pontos e traços
          span.md-error(
            v-if="!$v.username.length"
          ) O login deve ter entre {{ $v.username.$params.length.min }} e {{ $v.username.$params.length.max }} caracteres
          span.md-error(
            v-if="duplicatedUser"
          ) Este usuário já existe
        md-input-container(:class="{'md-input-invalid': $v.fullname.$error}")
          label Nome
          md-input(
            v-model="fullname"
            name="fullname"
            @input="$v.fullname.$touch()"
          )
          span.md-error(
            v-if="!$v.fullname.minLength"
          ) O nome deve ter no mínimo {{ $v.fullname.$params.minLength.min }} caracteres
        md-input-container(:class="{'md-input-invalid': $v.email.$error || duplicatedEmail}")
          label E-mail
          md-input(
            v-model="email"
            name="email"
            @input="$v.email.$touch()"
          )
          span.md-error(
            v-if="!$v.email.email"
          ) Favor inserir um email válido
          span.md-error(
            v-if="duplicatedEmail"
          ) Este email já está cadastrado favor escolher outro
        md-input-container(
          :class="{'md-input-invalid': this.$v.password.$error && !this.passwordValid}"
          md-has-password
        )
          label Senha
          md-input(
            v-model="password"
            type="password"
            name="password"
            @input="$v.password.$touch()"
          )
          span.md-error(
            v-if="this.$v.password.$error && !this.passwordValid"
          ) Favor inserir uma senha válida
    md-card-actions
      router-link.md-button(:to="{name: 'admin-users'}") Cancelar
      md-button(
        :disabled="!validForm"
        type="submit"
        @click.native="submit"
      ) Salvar
</template>

<script>
import {mapActions, mapState} from 'vuex'
import {email, minLength, required} from 'vuelidate/lib/validators'
import {mapModels} from '~utils'
import {username, length} from '~validators'

export default {
  name: 'id',
  async mounted () {
    let resp = await this.editUser({
      id: this.$route.params.id
    })
    if (resp && !resp.ok) {
      this.$router.push({name: 'admin-users'})
    }
  },
  methods: {
    ...mapActions('core/users', [
      'editUser',
      'submitUser'
    ]),
    async submit () {
      if (!this.validForm) return

      let resp = await this.submitUser()
      if (resp.ok) {
        this.$router.push({name: 'admin-users'})
      }
    }
  },
  computed: {
    ...mapModels('core/users/editUser', [
      'username',
      'fullname',
      'password',
      'email'
    ]),
    ...mapState({
      duplicatedEmail: (state) => state.users.editUser.duplicatedEmail,
      duplicatedUser: (state) => state.users.editUser.duplicatedUser
    }),
    validForm () {
      let formOk = (
        !this.$v.username.$invalid &&
        !this.$v.fullname.$invalid &&
        !this.$v.email.$invalid &&
        !this.duplicatedUser &&
        !this.duplicatedEmail &&
        this.passwordValid
      )
      return formOk
    },
    passwordValid () {
      if (this.$route.params.id === 'new') {
        return !this.$v.password.$invalid
      } else {
        return !this.$v.password.$invalid || !this.password
      }
    }
  },
  validations: {
    username: {
      required,
      username,
      length: length(3, 30)
    },
    email: {
      required,
      email
    },
    fullname: {
      required,
      minLength: minLength(3)
    },
    password: {
      required,
      minLength: minLength(5)
    }
  }
}
</script>

<style lang="postcss">
.card-container {
  @media screen and (min-width: 1600px) {
    width: 1000px;
  }

  @media screen and (min-width: 1280px) and (max-width: 1600px) {
    width: 1000px;
  }

  @media screen and (max-width: 1280px) {
    width: 800px;
    box-shadow: none;
  }
}

.card-container.card-color {
  background-color: #fff;
}
</style>
