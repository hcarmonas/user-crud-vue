class UsersApi {
  constructor () {
    this.users = [
      {
        id: 1,
        name: 'Pedro Silva',
        email: 'pedro@mail.com'
      },
      {
        id: 2,
        name: 'João Silva',
        email: 'joao@mail.com'
      },
      {
        id: 3,
        name: 'Carlos Silva',
        email: 'carlos@mail.com'
      },
      {
        id: 4,
        name: 'Antônio Silva',
        email: 'antonio@mail.com'
      }
    ]
  }

  async create (user) {
    this.users.push(user)
  }

  async getAll () {
    return this.users
  }

  async get ({id}) {
    let users = this.users.filter((u) => u.id === id)
    if (users) {
      return {
        body: users[0],
        status: 200,
        ok: true
      }
    }
    return {
      status: 404,
      ok: false
    }
  }
}

export default new UsersApi()


// import {CrudApi} from '~apis/base'
// class UsersApi extends CrudApi {
//   constructor () {
//     super()
//     this.baseUrl = '/api/v1/users'
//     this.listField = 'users'
//   }
// }
// export default new UsersApi()
