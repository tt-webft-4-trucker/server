exports.up = function (knex) {
  return knex.schema.table('profiles', function (table) {
    table.integer('diner_id').references('diner_id').inTable('diners');
    table.integer('operator_id').references('operator_id').inTable('operators');
  });
};

exports.down = function (knex) {
  return knex.schema.table('profiles', function (table) {
    table.dropColumn('diner_id');
    table.dropColumn('operator_id');
  });
};
