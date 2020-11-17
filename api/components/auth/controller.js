const TABLA = 'auth'

module.exports = function( injectedStore ){
  let store = injectedStore
  if (!store){
    store = require('../../../store/dummy')
  }

  function create(data){
    const authData = {
      id: data.id
    }

    if(data.username){
      authData.username = data.username
    }
    if(data.password){
      authData.password = data.password
    }

    return store.create(TABLA, authData)
  }
  
  return {
    create
  }
}