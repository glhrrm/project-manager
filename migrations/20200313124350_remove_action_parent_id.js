exports.up = function (knex, Promise) {
    return knex.schema.alterTable('actions', table => {
        table.dropColumn('parentId')
    })
}

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('actions', table => {
        table.integer('parentId').references('id').inTable('actions')
    }) 
}
