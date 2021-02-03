exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('trucks')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('trucks').insert([
        {
          operator_id: 1,
          name: 'Burrito Boys',
          img_url:
            'https://elceo.com/wp-content/uploads/2019/10/food_trucks_getty.jpg',
          cuisine_type: 'Burritos',
          customer_rating_avg: 4.2,
          current_location: 'Somewhere',
        },
        {
          operator_id: 1,
          name: 'Ice Co Bar',
          img_url:
            'https://restauracionnews.com/wp-content/uploads/2020/09/Food-Truck-IceCoBar-en-Jerez-de-la-Frontera-696x522.jpg',
          cuisine_type: 'Ice Cream',
          customer_rating_avg: 4.5,
          current_location: 'Somewhere',
        },
        {
          operator_id: 2,
          name: 'Pizza Wagon',
          img_url:
            'https://www.queremoscomer.rest/img/editorial/agosto-2016/PORTADA-FOOD-TRUCKS.jpg',
          cuisine_type: 'Pizza',
          customer_rating_avg: 4.8,
          current_location: 'Somewhere else',
        },
      ]);
    });
};
