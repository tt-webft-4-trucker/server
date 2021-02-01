const faker = require('faker');

const profiles = [...new Array(5)].map((i, idx) => ({
  profile_id:
    idx === 0 ? '00ulthapbErVUwVJy4x6' : faker.random.alphaNumeric(20),
  avatarUrl: faker.image.avatar(),
  email: idx === 0 ? 'llama001@maildrop.cc"' : faker.internet.email(),
  name:
    idx === 0
      ? 'Test001 User'
      : `${faker.name.firstName()} ${faker.name.lastName()}`,
}));

const diners = profiles.map((profile, i) => ({
  diner_id: i,
  profile_id: profile.profile_id,
  favorite_trucks: [],
  current_location: '',
}));

const operators = profiles.map((profile, i) => ({
  operator_id: i,
  profile_id: profile.profile_id,
  trucks: [],
  current_location: '',
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries before repopulating
  return knex('diners')
    .del()
    .then(function () {
      return knex('operators').del();
    })
    .then(function () {
      return knex('profiles').del();
    })
    .then(function () {
      return knex('profiles').insert(profiles);
    })
    .then(function () {
      return knex('diners').insert(diners);
    })
    .then(function () {
      return knex('operators').insert(operators);
    });
};
