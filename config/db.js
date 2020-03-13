const config = require('../knexfile')
const knex = require('knex')(config)

module.exports = knex // exporta a instância do knex com as configurações passadas pelo arquivo knexfile.js