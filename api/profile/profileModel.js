const db = require('../../data/db-config');
const bcrypt = require('bcryptjs');

const findAll = async () => {
  return await db('profiles');
};

const findBy = (filter) => {
  return db('profiles').where(filter);
};

const findById = async (profile_id) => {
  return db('profiles').where({ profile_id }).first().select('*');
};

const create = async (profile) => {
  const hash = bcrypt.hashSync(profile.password);
  return await db('profiles')
    .insert({ ...profile, password: hash })
    .returning('*')
    .then(async (profile) => {
      return await db('diners')
        .insert({ profile_id: profile[0].profile_id })
        .returning('*');
    })
    .then(async (diner) => {
      return await db('profiles')
        .where({ profile_id: diner[0].profile_id })
        .update({ diner_id: diner[0].diner_id })
        .returning('*');
    });
};

const createWithOperator = async (profile) => {
  const hash = bcrypt.hashSync(profile.password);
  return await db('profiles')
    .insert({ ...profile, password: hash })
    .returning('*')
    .then(async (profile) => {
      return await db('diners')
        .insert({ profile_id: profile[0].profile_id })
        .returning('*');
    })
    .then(async (diner) => {
      return await db('profiles')
        .where({ profile_id: diner[0].profile_id })
        .update({ diner_id: diner[0].diner_id })
        .returning('*');
    })
    .then(async (profile) => {
      return await db('operators')
        .insert({ profile_id: profile[0].profile_id })
        .returning('*');
    })
    .then(async (operator) => {
      return await db('profiles')
        .where({ profile_id: operator[0].profile_id })
        .update({ operator_id: operator[0].operator_id })
        .returning('*');
    });
};

const update = (profile_id, profile) => {
  return db('profiles')
    .where({ profile_id: profile_id })
    .first()
    .update(profile)
    .returning('*');
};
const remove = async (profile_id) => {
  return await db('profiles').where({ profile_id }).del();
};

const findOrCreateProfile = async (profileObj) => {
  const foundProfile = await findById(profileObj.profile_id).then(
    (profile) => profile
  );
  if (foundProfile) {
    return foundProfile;
  } else {
    return await create(profileObj).then((newProfile) => {
      return newProfile ? newProfile[0] : newProfile;
    });
  }
};
// Operator methods
const getOperatorInfo = async (profile_id) => {
  return db('operators').where({ profile_id }).first().select('trucks');
};

// Diner methods
const createDiner = async (profile) => {
  return db('diners')
    .insert([{ profile_id: profile.profile_id }])
    .returning('*');
};

const getDinerInfo = async (profile_id) => {
  return db('diners')
    .where({ profile_id })
    .first()
    .select('current_location', 'favorite_trucks');
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
  findOrCreateProfile,
  createWithOperator,
  getOperatorInfo,
  createDiner,
  getDinerInfo,
};
