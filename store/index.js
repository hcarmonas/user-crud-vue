import {Store} from 'vuex'
import users from './users'

export default new Store({
  strict: true,
  modules: {
    users
  }
})
