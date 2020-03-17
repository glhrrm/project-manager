exports.up = function (knex, Promise) {
    return knex.schema.alterTable('actions', table => {
        table.dropColumn('agentId')
    })
}

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('actions', table => {
        table.integer('agentId').references('id').inTable('users').notNull().defaultTo(1)
    }) 
}