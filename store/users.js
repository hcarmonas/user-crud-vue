import api from '~/apis/users'

const state = {
  users: []
}

const actions = {
  async loadUsers ({commit}) {
    console.log('loadUsers')
    let users = await api.getAll()

    commit('clearUsers')
    users.forEach((user) => {
      commit('addUser', {
        id: user.id,
        name: user.name,
        email: user.email
      })
    })
  }
}

const mutations = {
  clearUsers (state) {
    state.users = []
  },
  addUser (state, user) {
    state.users.push(user)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
