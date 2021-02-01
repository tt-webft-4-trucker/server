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

const diners = (profiles) => {
  profiles.map((profile, i) => ({
    diner_id: i,
    profile_id: profile.profile_id,
    favorite_trucks: [],
    current_location: '',
  }));
};

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('profiles')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('profiles').insert(profiles);
    });
};
