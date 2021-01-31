exports.up = (knex) => {
  return knex.schema.createTable('operators', function (table) {
    table.increments('id');
    table.string('profile_id').notNullable().unique().primary();
    table.string('trucks');
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('profiles');
};
