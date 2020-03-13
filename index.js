const express = require('express')
const db = require('./config/db') // recebe a instância do knex retornada pelo arquivo config/db.js

app = express()

app.db = db // a variável app.db será utilizada para as queries

port = 3003

app.listen(port, () => console.log(`Executando na porta ${port}`))