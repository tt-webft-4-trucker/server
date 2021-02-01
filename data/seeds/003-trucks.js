const faker = require('faker');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('trucks')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('trucks').insert([
        {
          truck_id: 1,
          operator_id: 1,
          name: 'Franks Dogs',
          img_url: faker.image.avatar(),
          cuisine_type: 'Hot Dogs',
          customer_rating_avg: 4.2,
          current_location: 'Somewhere',
        },
        {
          truck_id: 2,
          operator_id: 1,
          name: 'Frans French Fries',
          img_url: faker.image.avatar(),
          cuisine_type: 'Fries and Sides',
          customer_rating_avg: 4.5,
          current_location: 'Somewhere',
        },
        {
          truck_id: 3,
          operator_id: 2,
          name: 'Little Thai',
          img_url: faker.image.avatar(),
          cuisine_type: 'Thai',
          customer_rating_avg: 4.8,
          current_location: 'Somewhere else',
        },
      ]);
    });
};
