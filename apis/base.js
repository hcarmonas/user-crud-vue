import httpStatus from 'http-status'

export class Api {
  constructor () {
    this.baseUrl = ''
  }

  async request ({ method, url, body, headers, respType }) {
    respType = typeof respType === 'undefined' ? respType : 'json'
    let resp
    let respBody
    let options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    if (body) {
      options.body = JSON.stringify(body)
    }
    if (headers) {
      options.headers = {
        ...options.headers,
        ...headers
      }
    }

    try {
      resp = await fetch(url, options)
    } catch (e) {
      return {
        error: e,
        ok: false,
        status: resp ? resp.status : httpStatus.SERVICE_UNAVAILABLE
      }
    }

    try {
      switch (respType) {
        case 'json':
          respBody = await resp.json()
          break
        case 'blob':
          respBody = await resp.blob()
          break
        case 'text':
          respBody = await resp.text()
          break
        default:
          respBody = ''
          break
      }
    } catch (e) {
      return {
        error: e,
        ok: false,
        status: httpStatus.UNSUPPORTED_MEDIA_TYPE
      }
    }

    return {
      status: resp.status,
      ok: resp.ok,
      body: respBody
    }
  }

  async get (params) {
    return await this.request({
      ...params,
      method: 'GET'
    })
  }

  async post (params) {
    return await this.request({
      ...params,
      method: 'POST'
    })
  }

  async put (params) {
    return await this.request({
      ...params,
      method: 'PUT'
    })
  }

  async delete (params) {
    return await this.request({
      ...params,
      method: 'DELETE'
    })
  }
}

export class CrudApi extends Api {
  constructor () {
    super()
    this.listField = ''
  }

  decodeList (body) {
    return {
      ...body,
      [this.listField]: body[this.listField].map(this.decodeBody)
    }
  }

  decodeBody (body) {
    return body
  }

  encodeBody (body) {
    return body
  }

  formatUrl ({id} = {}) {
    if (id) {
      return `${this.baseUrl}/${id}`
    }
    return this.baseUrl
  }

  async get (params = {}) {
    let resp = await super.get({
      url: this.formatUrl(params),
      respType: 'json'
    })

    return {
      ...resp,
      body: resp.ok ? this.decodeBody(resp.body) : resp.body
    }
  }

  async getAll (params = {}) {
    let resp = await super.get({
      url: this.formatUrl(params),
      respType: 'json'
    })

    return {
      ...resp,
      body: resp.ok ? this.decodeList(resp.body) : resp.body
    }
  }

  async create (data, params = {}) {
    let resp = await super.post({
      url: this.formatUrl(params),
      body: this.encodeBody(data),
      respType: 'json'
    })

    return {
      ...resp,
      body: resp.ok ? this.decodeBody(resp.body) : resp.body
    }
  }

  async update (data, params = {}) {
    let resp = await super.put({
      url: this.formatUrl(params),
      body: this.encodeBody(data),
      respType: 'json'
    })

    return {
      ...resp,
      body: resp.ok ? this.decodeBody(resp.body) : resp.body
    }
  }

  async delete (params = {}) {
    return await super.delete({
      url: this.formatUrl(params),
      respType: 'json'
    })
  }
}
