exports.success = function (req, res, message, status){
  let statusCode = status || 200
  let statusMessage = message || ''
  res.status(statusCode).send({
    error: false,
    status: statusCode,
    body: message
  })
}
exports.error = function (req, res, message, status){
  let statusCode = status || 500
  let statusMessage = message || 'Internal server error'

  res.status(statusCode).send({
    error: statusMessage,
    status: statusCode,
    body: false
  })
}
