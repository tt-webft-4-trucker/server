const db = require('../../data/db-config');

const findAll = async () => {
  return await db('trucks');
};

const findBy = (filter) => {
  return db('trucks').where(filter);
};

const findById = async (truck_id) => {
  return db('trucks').where({ truck_id }).first().select('*');
};

const create = async (profile) => {
  return db('trucks').insert(profile).returning('*');
};

const update = (id, truck) => {
  return db('trucks')
    .where({ truck_id: id })
    .first()
    .update(truck)
    .returning('*');
};

const remove = async (truck_id) => {
  return await db('trucks').where({ truck_id }).del();
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
};
