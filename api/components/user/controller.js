const { nanoid } = require('nanoid')
const auth = require('../auth')
const TABLA = 'user'

module.exports = function( injectedStore, injectedCache ){
  let store = injectedStore
  let cache = injectedCache
  if (!store){
    store = require('../../../store/dummy')
  }
  if(!cache){
    cache = require('../../../store/dummy')
  }

  async function list(){
    let users = await cache.list(TABLA)
    if(!users){
      console.log('No estaba en caché, buscando en BD!')
      users = await store.list(TABLA)
      cache.create(TABLA, users)
    }else{
      console.log('servido desde cache')
    }

    return users
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

  function follow(from, to){
    return store.create(`${TABLA}_follow`, {
      user_from: from,
      user_to: to
    })
  }

  async function following(user){
    const join = {}
    join[TABLA] = 'user_to'
    const query = { user_from: user}
    
    return await store.query(`${TABLA}_follow`, query, join)
  }

  return {
    list,
    get,
    create,
    update,
    remove,
    follow,
    following
  }
}
