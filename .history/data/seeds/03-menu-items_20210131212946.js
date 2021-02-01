const faker = require('faker');

const menu1 = [...new Array(10)].map((i) => ({
  id: i,
  truck_id: 1,
  item_name: faker.commerce.productName(),
  item_description: faker.commerce.productDescription(),
  item_price: faker.commerce.price(),
  item_photos: faker.image.food(),
}));

const menu2 = [...new Array(7)].map((i) => ({
  id: i,
  truck_id: 2,
  item_name: faker.commerce.productName(),
  item_description: faker.commerce.productDescription(),
  item_price: faker.commerce.price(),
  item_photos: faker.image.food(),
}));

const menu3 = [...new Array(9)].map((i) => ({
  id: i,
  truck_id: 3,
  item_name: faker.commerce.productName(),
  item_description: faker.commerce.productDescription(),
  item_price: faker.commerce.price(),
  item_photos: faker.image.food(),
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('menu_items')
    .del()
    .then(function () {
      return knex('menu_items').insert(menu1);
    })
    .then(function () {
      return knex('menu_items').insert(menu2);
    })
    .then(function () {
      return knex('menu_items').insert(menu3);
    });
};
