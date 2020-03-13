exports.up = function (knex, Promise) {
    return knex.schema.createTable('agents_actions', table => {
        table.integer('agentId').references('id').inTable('users').notNull()
        table.integer('actionId').references('id').inTable('actions').notNull()
    })
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('agents_actions')
}