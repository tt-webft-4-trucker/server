exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('profiles', function (table) {
      table.string('id').notNullable().unique().primary();
      table.string('email');
      table.string('name');
      table.string('avatarUrl');
      table.string('diner_id').refererences('diner_id').inTable('diners');
      table
        .string('operator_id')
        .references('operator_id')
        .inTable('operators');
      table.timestamps(true, true);
    })
    .createTable('operators', function (table) {
      table.increments('operator_id');
      table.string('profile_id').references('id').inTable('profiles');
      table.string('trucks');
      table.timestamps(true, true);
    })
    .createTable('trucks', function (table) {
      table.increments('id');
      table
        .number('operator_id')
        .references('operator_id')
        .inTable('operators');
      table.string('name');
      table.string('img_url');
      table.string('cuisine_type');
      table.decimal('customer_rating_avg');
      table.string('current_location');
      table.timestamps(true, true);
    })
    .createTable('diners', function (table) {
      table.increments('diner_id');
      table.number('profile_id').references('id').inTable('profiles');
      table.string('favorite_trucks');
      table.string('current_location');
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('profiles').dropTableIfExists('trucks');
};
