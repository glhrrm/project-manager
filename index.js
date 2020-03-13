const express = require('express')
const consign = require('consign')
const db = require('./config/db') // recebe a instância do knex retornada pelo arquivo config/db.js

app = express()

app.db = db // a variável app.db será utilizada para as queries

consign()
    .include('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

port = 3003

app.listen(port, () => console.log(`Executando na porta ${port}`))