'use strict'

function notFound(request, response) {
  response.send(404).json({error: '404 route not found'})
}

module.exports = notFound;