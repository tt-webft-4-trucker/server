exports.up = (knex) => {
  return knex.schema.createTable('menu_items', function (table) {
    table.increments('id').notNullable().unique().primary();
    table.string('truck_id');
    table.string('itemName');
    table.string('itemDescription');
    table.decimal('itemPrice');
    table.string('itemPhotos');
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('menu_items');
};