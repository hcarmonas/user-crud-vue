import httpStatus from 'http-status'
import api from '~apis/core/users'

const state = {
  users: [],
  editUser: {
    id: '',
    username: '',
    fullname: '',
    email: '',
    password: '',
    duplicatedEmail: false,
    duplicatedUser: false
  },
  preDeleteUser: {
    id: '',
    username: '',
    fullname: ''
  }
}

const actions = {
  setPreDeleteUser ({commit}, user) {
    commit('setPreDeleteUser', {
      id: user.id,
      username: user.username,
      fullname: user.fullname
    })
  },
  async editUser ({commit}, {id}) {
    let user
    let resp = {ok: true}
    if (id !== 'new' && id) {
      resp = await api.get({id: id})
    }

    if (id !== 'new' && resp.ok) {
      user = {
        id: resp.body.id,
        username: resp.body.username,
        fullname: resp.body.fullname,
        password: '',
        email: resp.body.email
      }
    } else {
      user = {
        id: '',
        username: '',
        fullname: '',
        password: '',
        email: ''
      }
    }
    commit('setEditUser', user)
    return resp
  },
  async loadUsers ({commit}) {
    let resp = await api.getAll()
    if (!resp.ok) return resp

    commit('clearUsers')
    resp.body.users.forEach((user) => {
      commit('addUser', {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        email: user.email
      })
    })
    return resp
  },
  async deleteUser ({state, commit}) {
    if (!state.preDeleteUser.id) return

    let resp = await api.delete({id: state.preDeleteUser.id})
    if (!resp.ok) return

    commit('deleteUser', state.preDeleteUser.id)
  },
  async submitUser ({state, commit}) {
    if (!state.editUser.username) return {ok: false}

    let user = {
      username: state.editUser.username,
      fullname: state.editUser.fullname,
      password: state.editUser.password,
      email: state.editUser.email
    }
    let resp
    if (state.editUser.id) {
      if (!user.password) delete user.password
      resp = await api.update(user, {id: state.editUser.id})
    } else {
      resp = await api.create(user)
    }
    if (!resp.ok) {
      if (resp.status === httpStatus.CONFLICT) {
        if (resp.body.fields.includes('username')) {
          commit('toggleDuplicateUser')
        }
        if (resp.body.fields.includes('email')) {
          commit('toggleDuplicateEmail')
        }
      }
      return resp
    }

    commit('addUser', {
      id: resp.body.id,
      username: resp.body.username,
      fullname: resp.body.fullname,
      email: resp.body.email
    })
    commit('updateEditPassword')
    return resp
  }
}

const mutations = {
  setPreDeleteUser (state, user) {
    state.preDeleteUser = user
  },
  setEditUser (state, user) {
    state.editUser = {
      ...user,
      duplicatedEmail: false,
      duplicatedUser: false
    }
  },
  clearUsers (state) {
    state.users = []
  },
  addUser (state, user) {
    state.users.push(user)
  },
  deleteUser (state, id) {
    state.users = state.users.filter((u) => u.id !== id)
  },
  toggleDuplicateEmail (state) {
    state.editUser.duplicatedEmail = true
  },
  toggleDuplicateUser (state) {
    state.editUser.duplicatedUser = true
  },
  'editUser/username': (state, value) => {
    state.editUser.username = value
    state.editUser.duplicatedUser = false
  },
  'editUser/fullname': (state, value) => {
    state.editUser.fullname = value
  },
  'editUser/password': (state, value) => {
    state.editUser.password = value
  },
  'editUser/email': (state, value) => {
    state.editUser.email = value
    state.editUser.duplicatedEmail = false
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
