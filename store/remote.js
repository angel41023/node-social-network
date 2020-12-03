const request = require('request')

function createRemoteDB(host, port){
  const URL = `http://${host}:${port}`

  function list(table){
    return req('GET', table)
  }
  function get(table, id){
    return req('GET', `${table}/${id}`)
  }
  function create(table, data){
    return req('POST', table, data)
  }
  function update(table, data){
    return req('PATCH', `${table}/${data.id}`, data)
  }
  function remove(table, id){
    return req('DELETE', `${table}/${id}`)
  }
  function query(table, query, join){
    return req('POST', `${table}/${query}`, {query, join})
  }
  function req(method, table, data){
    let url = URL + '/' + table
    let body = ''
    if(data){
      body = JSON.stringify(data)
    }
    return new Promise((resolve, reject) => {
      request({
        method,
        headers:{
          'content-type': 'application/json'
        },
        url,
        body
      }, (err, req, body) => {
        if(err){
          console.error('Error con la base de datos remota', err)
          return reject(err.message)
        }
        if(!body){
          return reject('Error')
        }

        const resp = JSON.parse(body)
        return resolve(resp.body)
      })
    })
  }

  return {
    list,
    get,
    create,
    update,
    remove, 
    query
  }
}

module.exports = createRemoteDB