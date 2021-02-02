const db = require('../../data/db-config');

const findAll = async () => {
  return await db('operators');
};

const findBy = (filter) => {
  return db('operators').where(filter);
};

const findById = async (operator_id) => {
  return db('operators').where({ operator_id }).first().select('*');
};

module.exports = {
  findAll,
  findBy,
  findById,
};
