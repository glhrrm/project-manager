const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = app => { // app = instância do express em index.js
    app.use(bodyParser.json())
    app.use(cors())
}