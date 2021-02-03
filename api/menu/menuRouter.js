const express = require('express');
//const authRequired = require('../middleware/authRequired');
const Menu = require('./menuModel');
const router = express.Router();

router.post('/', async (req, res) => {
  const truck = req.body.truck_id;
  const menuReq = req.body.menu;
  if (truck) {
    const menu = menuReq.map((item) => ({ ...item, truck_id: truck }));
    try {
      await Menu.create(menu).then((menu) => res.status(200).json(menu));
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.detail });
    }
  } else {
    res.status(400).json({ message: 'No request body' });
  }
});

router.put('/', (req, res) => {
  const menu_item = req.body;
  if (menu_item) {
    Menu.findById(menu_item.id).then((menu_item) => {
      if (menu_item) {
        Menu.update(menu_item)
          .then((updated) => {
            res
              .status(200)
              .json({ message: 'menu item updated', menu_item: updated });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update menu '${menu_item.id}'`,
              error: err.message,
            });
          });
      } else {
        res.status(404).json({ message: 'Menu item not found' });
      }
    });
  } else {
    res.status(400).json({ message: "Couldn't read your put request" });
  }
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  try {
    Menu.findById(id).then((menu) => {
      Menu.remove(menu.id).then(() => {
        res.status(200).json({ message: `Menu item '${id}' was deleted.` });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete menu item with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
