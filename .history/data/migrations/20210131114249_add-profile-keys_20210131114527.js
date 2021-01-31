exports.up = function (knex) {
  knex.schema.table('profiles', function (table) {
    table.string('diner_id').references('diner_id').inTable('diners');
    table.string('operator_id').references('operator_id').inTable('operators');
  });
};

exports.down = function (knex) {
  knex.shcema.table('profiles', function (table) {
    table.dropColumn('diner_id');
    table.dropColumn('operator_id');
  });
};
