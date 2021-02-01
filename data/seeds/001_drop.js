exports.seed = function (knex) {
  // Deletes ALL existing entries before repopulating
  return knex('menu_items')
    .del()
    .then(function () {
      return knex('trucks').del();
    })
    .then(function () {
      return knex('diners').del();
    })
    .then(function () {
      return knex('operators').del();
    })
    .then(function () {
      return knex('profiles').del();
    })
    .then(function () {
      return knex('menu_items').del();
    });
};
