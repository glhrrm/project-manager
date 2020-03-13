const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const save = async (req, res) => {
        const user = { ...req.body }
        if (req.params.id) user.id = req.params.id

        try {
            if (!user.name || !user.email || !user.password || !user.confirmPassword)
                throw 'Campo não informado'

            if (user.password !== user.confirmPassword)
                throw 'Senhas não conferem'

            const userFromDB = await app.db('users').where({ email: user.email }).first()

            if (!user.id && userFromDB)
                throw 'Usuário já cadastrado'
        } catch (msg) {
            return res.status(400).send(msg)
        }

        user.password = bcrypt.hashSync(user.password)
        delete user.confirmPassword

        if (user.id) { // atualiza
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else { // insere
            app.db('users')
                .insert(user)
                .then(user => res.status(204).send(user))
                .catch(err => res.status(500).send(err))
        }
    }

    const find = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const findById = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .where({ id: req.params.id })
            .first()
            .then(user => user ? res.json(user) : res.status(404).send())
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        // não exclui usuário com ações associados
        try {
            const actions = await app.db('actions')
                .where({ creatorId: req.params.id })
                .orWhere({ responsibleId: req.params.id })

            if (actions.length) throw 'Usuário possui ações associadas'

            app.db('users')
                .where({ id: req.params.id })
                .del()
                .then(user => user ? res.status(204).send() : res.status(404).send())
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    return { save, find, findById, remove }
}