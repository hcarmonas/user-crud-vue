import _ from 'lodash'

function mapModel (namespace, model) {
  if (namespace) namespace = namespace + '/'
  let key = namespace + model
  let keys = key.split('/')
  return {
    get () {
      return _.get(this.$store.state, keys)
    },
    set (value) {
      return this.$store.commit(key, value)
    }
  }
}

function mapModelAction (namespace, model) {
  if (namespace) namespace = namespace + '/'
  let key = namespace + model
  let keys = key.split('/')
  return {
    get () {
      return _.get(this.$store.state, keys)
    },
    set (value) {
      return this.$store.dispatch(key, value)
    }
  }
}

export function mapModels (namespace, models) {
  let res = {}
  if (_.isArray(models)) {
    models.forEach((model) => {
      res[model] = mapModel(namespace, model)
    })
  } else {
    _.forOwn(models, (model, key) => {
      res[key] = mapModel(namespace, model)
    })
  }
  return res
}

export function mapModelActions (namespace, models) {
  let res = {}
  if (_.isArray(models)) {
    models.forEach((model) => {
      res[model] = mapModelAction(namespace, model)
    })
  } else {
    _.forOwn(models, (model, key) => {
      res[key] = mapModelAction(namespace, model)
    })
  }
  return res
}
