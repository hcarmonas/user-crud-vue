import api from '~/apis/users'

const state = {
  users: [],
  editUser: {
    id: '',
    name: '',
    email: ''
  }
}

const actions = {
  async loadUsers ({commit}) {
    let users = await api.getAll()

    commit('clearUsers')
    users.forEach((user) => {
      commit('addUser', {
        id: user.id,
        name: user.name,
        email: user.email
      })
    })
  },
  async getUser ({commit}, id) {
    let user
    let resp = {
      ok: true
    }
    if (id !== 'new' && id) {
      id = Number(id)
      resp = await api.get({
        id: id
      })
    }

    if (id !== 'new' && resp.ok) {
      user = {
        id: resp.body.id,
        name: resp.body.name,
        email: resp.body.email
      }
    } else {
      user = {
        id: '',
        name: '',
        email: ''
      }
    }
    commit('setGetUser', user)
    return resp
  },
  async submitUser ({state, commit}) {
    if (!state.editUser.email) return {ok: false}

    let user = {
      id: state.editUser.id,
      name: state.editUser.name,
      email: state.editUser.email
    }

    let resp
    if (state.editUser.id && state.editUser.id !== '') {
      resp = await api.update(user, {id: state.editUser.id})
    } else {
      resp = await api.create(user)
    }
  }
}

const mutations = {
  clearUsers (state) {
    state.users = []
  },
  addUser (state, user) {
    state.users.push(user)
  },
  setGetUser (state, user) {
    state.editUser = {
      ...user
    }
  },
  'editUser/id': (state, value) => {
    state.editUser.id = value
  },
  'editUser/name': (state, value) => {
    state.editUser.name = value
  },
  'editUser/email': (state, value) => {
    state.editUser.email = value
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
