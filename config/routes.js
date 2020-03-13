// sem o consign precisaríamos importar cada método aqui
// por exemplo, const { save } = require('../api/user.js')

module.exports = app => {
    app.route('/users')
        .get(app.api.user.find) // consign em ação - entre parênteses a estrutura de pastas
        .post(app.api.user.save)
    
    app.route('/users/:id')
        .get(app.api.user.findById)
        .put(app.api.user.save)
        .delete(app.api.user.remove)
}