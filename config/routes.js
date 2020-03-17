// sem o consign precisaríamos importar cada método aqui
// por exemplo, const { save } = require('../api/user.js')

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signIn)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .get(app.api.user.find) // consign em ação - entre parênteses a estrutura de pastas
        .post(app.api.user.save)

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.user.findById)
        .put(app.api.user.save)
        .delete(app.api.user.remove)

    app.route('/projects')
        .all(app.config.passport.authenticate())
        .get(app.api.project.find)
        .post(app.api.project.save)

    app.route('/projects/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.project.findById)
        .put(app.api.project.save)
        .delete(app.api.project.remove)

    app.route('/actions')
        .all(app.config.passport.authenticate())
        .get(app.api.action.find)
        .post(app.api.action.save)

    app.route('/actions/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.action.findById)
        .put(app.api.action.save)
        .delete(app.api.action.remove)

    app.route('/projects/:id/actions')
        .all(app.config.passport.authenticate())
        .get(app.api.action.findByProject)
}