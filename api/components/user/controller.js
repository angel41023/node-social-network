const { nanoid } = require('nanoid')
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
      name: user.name,
      username: user.username
    }
    if(user.id){
      userData.id = user.id
    }else{
      userData.id = nanoid()
    }

    if(user.password || user.username){
      await auth.create({
        id: userData.id,
        username: userData.username, 
        password: user.password
      })
    }
    return store.create(TABLA, userData)
  }
  
  function update(id, name){
    const userData = {
      id: id,
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