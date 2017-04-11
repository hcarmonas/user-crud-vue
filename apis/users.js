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
    let lastId = this.users[this.users.length - 1].id
    user.id = lastId + 1
    this.users.push(user)
  }

  async update (editUser, {id}) {
    for (let user of this.users) {
      if (user.id === Number(id)) {
        user.name = editUser.name
        user.email = editUser.email
      }
    }
  }

  async getAll () {
    return this.users
  }

  async get ({id}) {
    let user = this.users.filter((u) => u.id === id)
    if (user) {
      return {
        body: user[0],
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
