const admin = require('./admin')

// sem o consign precisaríamos importar cada método aqui
// por exemplo, const { save } = require('../api/user.js')

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signIn)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .get(app.api.user.find)
        .post(admin(app.api.user.save))

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.user.findById)
        .put(admin(app.api.user.save))
        .delete(admin(app.api.user.remove))

    app.route('/projects')
        .all(app.config.passport.authenticate())
        .get(app.api.project.find)
        .post(admin(app.api.project.save))

    app.route('/projects/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.project.findById)
        .put(admin(app.api.project.save))
        .delete(admin(app.api.project.remove))

    app.route('/actions')
        .all(app.config.passport.authenticate())
        .get(app.api.action.find)
        .post(admin(app.api.action.save))

    app.route('/actions/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.action.findById)
        .put(admin(app.api.action.save))
        .delete(admin(app.api.action.remove))

    app.route('/projects/:id/actions')
        .all(app.config.passport.authenticate())
        .get(app.api.action.findByProject)
}