const faker = require('faker');

const menu1 = [...new Array(10)].map(() => ({
  truck_id: 1,
  item_name: faker.commerce.productName(),
  item_description: faker.commerce.productAdjective(),
  item_price: faker.commerce.price(),
  item_photos: faker.image.food(),
}));

const menu2 = [...new Array(7)].map(() => ({
  truck_id: 2,
  item_name: faker.commerce.productName(),
  item_description: faker.commerce.productAdjective(),
  item_price: faker.commerce.price(),
  item_photos: faker.image.food(),
}));

const menu3 = [...new Array(9)].map(() => ({
  truck_id: 3,
  item_name: faker.commerce.productName(),
  item_description: faker.commerce.productAdjective(),
  item_price: faker.commerce.price(),
  item_photos: faker.image.food(),
}));

exports.seed = function (knex) {
  return knex('menu_items')
    .insert(menu1)
    .then(function () {
      return knex('menu_items').insert(menu2);
    })
    .then(function () {
      return knex('menu_items').insert(menu3);
    });
};
