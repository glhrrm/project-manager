exports.up = function (knex, Promise) {
	return knex.schema.createTable('actions', table => {
		table.increments('id').primary()
		table.string('name').notNull()
		table.string('description', 1000)
		table.integer('parentId').references('id').inTable('actions')
		table.integer('projectId').references('id').inTable('projects').notNull()
		table.integer('creatorId').references('id').inTable('users').notNull()
		table.integer('responsibleId').references('id').inTable('users').notNull()
	})
}

exports.down = function (knex, Promise) {
	return knex.schema.dropTable('actions')
}