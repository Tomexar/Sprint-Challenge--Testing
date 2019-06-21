
exports.up = function (knex, Promise) {
    return knex.schema.createTable('games', tbl => {
        tbl.increments();
        tbl.string('name', 200).notNullable();
        tbl.string('genre', 100).notNullable();
        tbl.integer('release_year').notNullable();
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('games')
};
