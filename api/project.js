module.exports = app => {
    const save = (req, res) => {
        const project = { ...req.body }
        if (req.params.id) project.id = req.params.id

        try {
            if (!project.name)
                throw 'Campo não informado'
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (project.id) { // atualiza
            app.db('projects')
                .update(project)
                .where({ id: project.id })
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else { // insere
            app.db('projects')
                .insert(project)
                .then(project => res.status(204).send(project))
                .catch(err => res.status(500).send(err))
        }
    }

    const find = (req, res) => {
        app.db('projects') // não é necessário o método select() para buscar todos os campos
            .then(projects => res.json(projects))
            .catch(err => res.status(500).send(err))
    }

    const findById = (req, res) => {
        app.db('projects')
            .where({ id: req.params.id })
            .first()
            .then(project => project ? res.json(project) : res.status(404).send())
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const actions = await app.db('actions')
                .where({ projectId: req.params.id })

            if (actions.length) throw 'Projeto possui ações'

            app.db('projects')
                .where({ id: req.params.id })
                .del()
                .then(project => project ? res.status(204).send() : res.status(404).send())
                .catch(err => res.status(500).send(err))
        } catch(msg) {
            return res.status(400).send(msg)
        }
    }

    return { save, remove, find, findById }
}