const auth = require('../auth')
const TABLA = 'user'

module.exports = function( injectedStore ){
  let store = injectedStore
  if (!store){
    store = require('../../../store/dummy')
  }

  function list(){
    return store.list(TABLA)
  }

  function get(id){
    return store.get(TABLA, id)
  }

  async function create(user){
    const userData = {
      id: user.id,
      name: user.name,
      username: user.username
    }

    if(user.password || user.username){
      await auth.create({
        id: user.id, 
        username: user.username, 
        password: user.password
      })
    }
    return store.create(TABLA, userData)
  }
  
  function update(id, name){
    const userData = {
      id: parseInt(id),
      name
    }
    return store.update(TABLA, userData)
  }

  function remove(id){
    return store.remove(TABLA, id)
  }
  return {
    list,
    get,
    create,
    update,
    remove
  }
}