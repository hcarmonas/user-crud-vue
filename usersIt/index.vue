<template lang="pug">
div
  .content
    md-layout(md-column md-hide-medium-and-up)
      md-card.card-align.card.card-color(
        :key="user.id"
        v-for="user in users"
      )
        md-card-header
          .md-title {{user.username}}
          .md-subhead {{user.fullName}}
          .md-subhead {{user.email}}
        .user-card-actions-container
          md-card-actions.card-actions
            md-button(@click.native="deleteUserConfirm(user)") Apagar
            md-button(@click.native="editUser(user)") Editar
      md-speed-dial.speed-dial(md-open="hover")
        router-link.md-button.md-fab.md-primary(
            md-fab-trigger
            :to="{name: 'admin-users-id', params: {id: 'new'}}",
          )
          md-icon add

    md-layout(md-align="center" md-flex="50" md-hide-small)
      md-table-card.card-align.table-card.card.card-color
        md-toolbar.card.card-color
          router-link.md-button.md-raised(
            md-fab-trigger
            :to="{name: 'admin-users-id', params: {id: 'new'}}"
          ) Adicionar
        md-table
          md-table-header
            md-table-row
              md-table-head(md-sort-by="username") username
              md-table-head(md-sort-by="email") E-mail
              md-table-head(md-sort-by="user") Nome
          md-table-body
            md-table-row(
              :key="user.id"
              v-for="user in users"
            )
              md-table-cell {{user.username}}
              md-table-cell {{user.email}}
              md-table-cell {{user.fullname}}
              md-table-cell.table-buttons-container
                router-link.md-button.md-icon-button(:to="{name: 'admin-users-id', params: {id: user.id}}")
                  md-icon edit
                md-button.md-icon-button(@click.native="deleteUserConfirm(user)")
                  md-icon delete

  md-dialog(ref="dialog")
    md-dialog-title Remover o usuário {{ preDeleteUser.username }} ?
    md-dialog-actions
      md-button.md-primary(@click.native="deleteCancel") Cancelar
      md-button.md-primary(@click.native="deleteUser") Remover
</template>

<script>
export default {
  mounted () {
    this.$store.dispatch('core/users/loadUsers')
  },
  computed: {
    users () { return this.$store.state.core.users.users },
    preDeleteUser () { return this.$store.state.core.users.preDeleteUser }
  },
  methods: {
    deleteUserConfirm (user) {
      this.$store.dispatch('core/users/setPreDeleteUser', user)
      this.$refs['dialog'].open()
    },
    deleteUser () {
      this.$store.dispatch('core/users/deleteUser')
      this.$refs['dialog'].close()
    },
    deleteCancel () {
      this.$refs['dialog'].close()
    }
  }
}
</script>

<style lang="postcss">
.card-align {
  margin: 15px;
}

.user-card-actions-container {
  display: flex;
  flex-direction: row;
}

.card-actions {
  flex: 0 1 auto;
}

.table-card {
  @media screen and (min-width: 1600px) {
    width: 1500px;
  }

  @media screen and (min-width: 1280px) and (max-width: 1600px) {
    width: 1000px;
  }

  @media screen and (max-width: 1280px) {
    width: 800px;
  }
}

.buttons-container {
  display: flex;
  flex-direction: row;
}

.table-buttons-container {
  display: flex;
  flex-direction: row-reverse;
}

.button {
  flex: 0 1 auto;
}

.content {
  padding-bottom: 80px;
}

.speed-dial button {
  position: fixed;
  bottom: 15px;
  right: 15px;
}
</style>
