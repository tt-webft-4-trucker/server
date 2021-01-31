exports.up = (knex) => {
  return knex.scheme.createTable('diners', function (table) {
    table.increments('id');
    table.string('profile_id').notNullable().unique().primary();
    table.string('current_location');
    table.string('favorite_trucks');
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('diners');
};
