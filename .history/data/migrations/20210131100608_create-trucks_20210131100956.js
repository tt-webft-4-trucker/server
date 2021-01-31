exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('trucks', function (table) {
      table.string('id').notNullable().unique().primary();
      table.string('operator_id');
      table.string('name');
      table.string('avatarUrl');
      table.timestamps(true, true);
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('trucks');
};
