function fks(diner, operator) {
  return {
    diner_id: diner,
    operator_id: operator,
  };
}

exports.seed = async function (knex) {
  let profile_ids = [];
  return knex('profiles')
    .pluck('profile_id')
    .then(function (ids) {
      profile_ids = ids;
    })
    .then(function () {
      console.log(profile_ids);
      return knex('profiles')
        .where('profile_id', profile_ids[0])
        .update(fks(1, null));
    })
    .then(function () {
      return knex('profiles')
        .where('profile_id', profile_ids[1])
        .update(fks(2, 1));
    })
    .then(function () {
      return knex('profiles')
        .where('profile_id', profile_ids[2])
        .update(fks(3, 1));
    })
    .then(function () {
      return knex('profiles')
        .where('profile_id', profile_ids[3])
        .update(fks(4, null));
    })
    .then(function () {
      return knex('profiles')
        .where('profile_id', profile_ids[4])
        .update(fks(5, 2));
    });
};

// exports.seed = function (knex) {
//   return knex('profiles')
//     .where('profile_id', '00ulthapbErVUwVJy4x6')
//     .update({
//       diner_id: Math.floor(Math.random() * 5),
//       operator_id: Math.floor(Math.random() * 5),
//     });
// };
