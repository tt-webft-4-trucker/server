exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('trucks', function (table) {
      table.increments('id');
      table.string('operator_id');
      table.string('name');
      table.string('img_url');
      table.string('cuisine_type');
      table.int('customer_rating_avg');
      table.string('menu_id');
      table.timestamps(true, true);
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('trucks');
};
