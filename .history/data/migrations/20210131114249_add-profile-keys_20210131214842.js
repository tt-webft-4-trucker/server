exports.up = function (knex) {
  return knex.schema.table('profiles', function (table) {
    table.string('diner_id').references('diner_id').inTable('diners');
    table.string('operator_id').references('operator_id').inTable('operators');
  });
};

exports.down = function (knex) {
  return knex.schema.table('profiles', function (table) {
    knex.schema.table('profiles', 'diner_id')
      ? table.dropColumn('diner_id')
      : '';
  });
};
