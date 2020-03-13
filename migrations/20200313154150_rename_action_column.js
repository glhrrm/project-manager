exports.up = function (knex, Promise) {
    return knex.schema.alterTable('actions', table => {
        table.renameColumn('responsibleId', 'agentId')
    })
}

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('actions', table => {
        table.renameColumn('agentId', 'responsibleId')
    })
}