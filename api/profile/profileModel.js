const db = require('../../data/db-config');

const findAll = async () => {
  return await db('profiles');
};

const findBy = (filter) => {
  return db('profiles').where(filter);
};

const findById = async (profile_id) => {
  return db('profiles').where({ profile_id }).first().select('*');
};

const getOperatorInfo = async (profile_id) => {
  return db('operators').where({ profile_id }).first().select('*');
};

const getDinerInfo = async (profile_id) => {
  return db('diners').where({ profile_id }).first().select('*');
};

const create = async (profile) => {
  return db('profiles').insert(profile).returning('*');
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

module.exports = {
  findAll,
  findBy,
  findById,
  getOperatorInfo,
  getDinerInfo,
  create,
  update,
  remove,
  findOrCreateProfile,
};
