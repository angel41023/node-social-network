const db = {
  'user': [
    {id: 1, name: 'Angel'},
    {id: 2, name: 'Pedro'}
  ],
}

async function list(tabla){
  return db[tabla] || []
}

async function get(tabla, id){
  let col = await list(tabla)
  return col.filter(item => item.id === parseInt(id))[0] || null
}

async function create(tabla, data){
  if(!db[tabla]){
    db[tabla] = []
  }
  db[tabla].push(data)
  return data
}

async function update(tabla, data){
  let col = await list(tabla)
  filtered = await col.findIndex(item => item.id === parseInt(data.id))
  if(filtered < 0){
    return null
  }
  db[tabla][filtered] = data
  return db[tabla][filtered]
}

async function remove(tabla, id){
  const filtered = db[tabla].findIndex(item => item.id === parseInt(id))
  if(filtered < 0){
    return null
  }
  db[tabla].splice(filtered, 1)
  return true
}

async function query(tabla, q){
  let col = await list(tabla)
  let keys = Object.keys(q)
  let key = keys[0]
  return col.filter(item => item[key] === q[key])[0] || null
}

module.exports = {
  list,
  get,
  create,
  update,
  remove,
  query
}