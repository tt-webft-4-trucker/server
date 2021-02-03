const db = require('../../data/db-config');

const findAll = async () => {
  return await db('menu_items');
};

const findBy = (filter) => {
  return db('menu_items').where(filter);
};

const findById = async (id) => {
  return db('menu_items').where({ id }).first().select('*');
};

const getMenuByTruck = async (truck_id) => {
  return db('menu_items')
    .where({ truck_id })
    .select('item_name', 'item_description', 'item_price', 'item_photos');
};

const create = async (menu) => {
  return db('menu_items').insert(menu).returning('*');
};

const update = (menu_item) => {
  return db('menu_items')
    .where({ id: menu_item.id })
    .first()
    .update(menu_item)
    .returning('*');
};

const remove = async (id) => {
  return await db('menu_items').where({ id }).del();
};

module.exports = {
  findAll,
  findBy,
  findById,
  getMenuByTruck,
  create,
  update,
  remove,
};
