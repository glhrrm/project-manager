module.exports = app => {
	const save = (req, res) => {
		const action = { ...req.body }
		if (req.params.id) action.id = req.params.id

		try {
			if (!action.name || !action.projectId || !action.creatorId || !action.agentId)
				throw 'Campo não informado'
		} catch (msg) {
			return res.status(400).send(msg)
		}

		if (action.id) { // atualiza
			app.db.transaction(async t => {
				return app.db('actions')
					.update({ name: action.name, description: action.description, projectId: action.projectId, creatorId: action.creatorId })
					.where({ id: action.id })
					.transacting(t)
					.then(() => {
						return app.db('agents_actions')
							.where({ actionId: action.id })
							.del()
							.transacting(t)
							.then(async () => {
								await Promise.all(action.agentId.map(agentId => {
									return app.db('agents_actions')
										.insert({ agentId: agentId, actionId: action.id })
										.transacting(t)
								}))
							})
					})
					.then(t.commit)
					.catch(t.rollback)
			})
				.then(() => res.status(204).send())
				.catch(err => res.status(500).send(err))
		} else { // insere
			app.db.transaction(t => {
				app.db('actions')
					.insert({ name: action.name, description: action.description, projectId: action.projectId, creatorId: action.creatorId }, 'id')
					.transacting(t)
					.then(async actionIds => {
						await Promise.all(action.agentId.map(agentId => {
							return app.db('agents_actions')
								.insert({ agentId: agentId, actionId: actionIds[0] })
								.transacting(t)
						}))
					})
					.then(t.commit)
					.catch(t.rollback)
			})
				.then(() => res.status(204).send())
				.catch(err => res.status(500).send(err))
		}
	}

	const find = (req, res) => {
		app.db('actions')
			.then(actions => res.json(actions))
			.catch(err => res.status(500).send(err))
	}

	const findById = (req, res) => {
		app.db('actions')
			.where({ id: req.params.id })
			.first()
			.then(action => action ? res.json(action) : res.status(404).send())
			.catch(err => res.status(500).send(err))
	}

	const remove = (req, res) => {
		try {
			app.db.transaction(t => {
				app.db('agents_actions')
					.where({ actionId: req.params.id })
					.del()
					.transacting(t)
					.then(() => {
						return app.db('actions')
							.where({ id: req.params.id })
							.del()
							.transacting(t)
					})
					.then(t.commit)
					.catch(t.rollback)
			})
				.then(action => action ? res.status(204).send() : res.status(404).send())
				.catch(err => console.log(err))
		} catch (msg) {
			return res.status(400).send(msg)
		}
	}

	const findByProject = (req, res) => {
		app.db({ a: 'actions', p: 'projects', c: 'users', aa: 'agents_actions', ag: 'users' })
			.select('a.name', 'a.description', { project: 'p.name' }, { creator: 'c.name' }, { agents: app.db.raw('array_agg(ag.name)') })
			.where({ projectId: req.params.id })
			.whereRaw('?? = ??', ['a.projectId', 'p.id'])
			.whereRaw('?? = ??', ['a.creatorId', 'c.id'])
			.whereRaw('?? = ??', ['aa.actionId', 'a.id'])
			.whereRaw('?? = ??', ['aa.agentId', 'ag.id'])
			.groupBy('a.name', 'a.description', 'p.name', 'c.name')
			.then(actions => actions.length ? res.json(actions) : res.status(404).send())
			.catch(err => res.status(500).send(err))
	}

	return { save, remove, find, findById, findByProject }
}