const { nanoid } = require('nanoid')
const TABLA = 'post'

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

  async function create(post){
    const postData = {
      text: post.text,
      user: post.user
    }
    if(post.id){
      postData.id = post.id
    }else{
      postData.id = nanoid()
    }

    return store.create(TABLA, postData)
  }
  
  function update(id, text){
    const postData = {
      id: id,
      text
    }
    return store.update(TABLA, postData)
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