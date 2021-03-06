exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('profiles', function (table) {
      table.string('profile_id').notNullable().unique().primary();
      table.string('email', 128).notNullable();
      table.string('password', 128).notNullable();
      table.string('name');
      table.string('avatarUrl');
      table.timestamps(true, true);
    })
    .createTable('operators', function (table) {
      table.increments('operator_id').primary();
      table
        .string('profile_id')
        .references('profile_id')
        .inTable('profiles')
        .notNullable();
      table.string('trucks');
      table.timestamps(true, true);
    })
    .createTable('trucks', function (table) {
      table.increments('truck_id').primary();
      table
        .integer('operator_id')
        .references('operator_id')
        .inTable('operators')
        .notNullable();
      table.string('name').notNullable();
      table.string('img_url');
      table.string('cuisine_type').notNullable();
      table.decimal('customer_rating_avg');
      table.string('current_location');
      table.timestamps(true, true);
    })
    .createTable('diners', function (table) {
      table.increments('diner_id').primary();
      table.string('profile_id').references('profile_id').inTable('profiles');
      table.string('favorite_trucks');
      table.string('current_location');
      table.timestamps(true, true);
    })
    .createTable('menu_items', function (table) {
      table.increments('id').primary();
      table
        .integer('truck_id')
        .references('truck_id')
        .inTable('trucks')
        .notNullable();
      table.string('item_name').notNullable();
      table.string('item_description').notNullable();
      table.decimal('item_price').notNullable();
      table.string('item_photos');
      table.timestamps(true, true);
    });
};

exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('menu_items')
    .dropTableIfExists('trucks')
    .dropTableIfExists('diners')
    .dropTableIfExists('operators')
    .dropTableIfExists('profiles');
};
