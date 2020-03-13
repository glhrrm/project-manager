exports.up = function (knex, Promise) {
    return knex.schema.createTable('projects', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.date('startDate').notNull()
        table.date('endDate').notNull()
    })
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('projects')
}