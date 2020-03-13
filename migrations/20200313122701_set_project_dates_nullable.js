exports.up = function (knex, Promise) {
    return knex.schema.alterTable('projects', table => {
        table.date('startDate').nullable().alter()
        table.date('endDate').nullable().alter()
    })
}

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('projects', table => {
        table.date('startDate').notNullable().alter()
        table.date('endDate').notNullable().alter()
    })
}