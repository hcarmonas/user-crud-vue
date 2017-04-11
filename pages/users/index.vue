<template>
  <div class="container-input">
    <div>
      <router-link :to="{name: 'users-id', params: {id: 'new'}}">
        <button type="button"
              class="btn btnNew">Novo</button>
      </router-link>
    </div>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>E-mail</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users">
          <td>{{user.id}}</td>
          <td>{{user.name}}</td>
          <td>{{user.email}}</td>
          <td>
            <router-link :to="{name: 'users-id', params: {id: user.id}}">
              <button type="button"
                    class="btn btnEdit">Editar</button>
            </router-link>
            <button type="button"
                    class="btn btnDelete" @click="showModal = true">Deletar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <delete-modal v-if="showModal" @cancel="showModal = false" @confirm="showModal = false"></delete-modal>
  </div>

</template>

<script>
import {mapActions, mapState} from 'vuex'
import deleteModal from '~components/deleteModal.vue'

export default {
  data () {
    return {
      showModal: false
    }
  },
  async mounted () {
    await this.loadUsers()

    // o mapActions no users elimina a linha abaixo
    // this.$store.dispatch('users/loadUsers')
  },
  computed: {
    ...mapState('users', [
      'users'
    ])
    // o mapState no ususario elimina a linha abaixo.
    // users () { return this.$store.state.users.users }
  },
  methods: {
    ...mapActions('users', [
      'loadUsers'
    ])
  },
  components: {
    'deleteModal': deleteModal
  }
}

</script>


<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

tr:hover {
  background-color: #f5f5f5
}
</style>



