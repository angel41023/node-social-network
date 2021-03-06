const bcrypt = require('bcrypt')
const auth = require('../../../auth')
const error = require('../../../utils/error')
const TABLA = 'auth'

module.exports = function( injectedStore ){
  let store = injectedStore
  if (!store){
    store = require('../../../store/dummy')
  }
  async function login(username, password){
    const data = await store.query(TABLA, {username: username})
    return bcrypt.compare(password, data.password)
      .then(iquals => {
        if(iquals){
          return auth.sign({...data})
        }else{
          throw error('Invalid data', 401)
        }
      })
    
  }

  async function create(data){
    const authData = {
      id: data.id
    }

    if(data.username){
      authData.username = data.username
    }
    if(data.password){
      authData.password = await bcrypt.hash(data.password, 5)
    }

    return store.create(TABLA, authData)
  }
  
  return {
    login,
    create
  }
}