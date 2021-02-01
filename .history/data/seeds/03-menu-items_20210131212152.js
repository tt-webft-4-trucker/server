const faker = require('faker');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('menu_items').del()
    .then(function () {
      // Inserts seed entries
      return knex('menu_items').insert([
        {
          id: 1,
          truck_id: 1,
          item_name: 'Franks Dogs',
          item_description: faker.image.avatar(),
          item_price: 'Hot Dogs',
          item_photos: 4.2,
        },
      ]);
    });
};
