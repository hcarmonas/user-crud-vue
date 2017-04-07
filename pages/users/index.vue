<template>
  <div>
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
            <button type="button"
                    class="btn btnEdit">Editar</button>
            <button type="button"
                    class="btn btnDelete">Deletar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div></div>
</template>

<script>
export default {
  mounted () {
    this.$store.dispatch('users/loadUsers')
  },
  computed: {
    users () { return this.$store.state.users.users }
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

.btn {
  display: inline-block;
  font-weight: 400;
  line-height: 1.25;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: .5rem 1rem;
  font-size: 1rem;
  border-radius: .25rem;
  margin: 0px 5px 0px 5px;
}

.btnNew {
  color: #fff;
  background-color: #0275d8;
  border-color: #0275d8;
}

.btnNew:hover {
  color: #fff;
  background-color: #025aa5;
  border-color: #01549b;
}

.btnEdit {
  color: #fff;
  background-color: #5cb85c;
  border-color: #5cb85c;
}

.btnEdit:hover {
  color: #fff;
  background-color: #449d44;
  border-color: #419641;
}

.btnDelete {
  color: #fff;
  background-color: #d9534f;
  border-color: #d9534f;
}

.btnDelete:hover {
  color: #fff;
  background-color: #c9302c;
  border-color: #c12e2a;
}
</style>



