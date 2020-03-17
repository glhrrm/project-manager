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

    app.route('/projects')
        .get(app.api.project.find)
        .post(app.api.project.save)

    app.route('/projects/:id')
        .get(app.api.project.findById)
        .put(app.api.project.save)
        .delete(app.api.project.remove)

    app.route('/actions')
        .get(app.api.action.find)
        .post(app.api.action.save)

    app.route('/actions/:id')
        .get(app.api.action.findById)
        .put(app.api.action.save)
        .delete(app.api.action.remove)

    app.route('/projects/:id/actions')
        .get(app.api.action.findByProject)
}