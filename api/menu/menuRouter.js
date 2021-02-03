const express = require('express');
const Auth = require('../auth/authModel');
const Trucks = require('../trucks/truckModel');
const Menu = require('./menuModel');
const router = express.Router();

router.post('/', Auth.requireToken, async (req, res) => {
  const user = res.locals.user;
  const truck_id = req.body.truck_id;
  const menuReq = req.body.menu;
  const truck = await Trucks.findById(truck_id);
  let validate;
  try {
    validate = user.operator_id === truck.operator_id;
  } catch {
    res.status(404).json({ message: 'No truck with that id' });
  }
  if (validate) {
    const menu = menuReq.map((item) => ({ ...item, truck_id: truck_id }));
    try {
      await Menu.create(menu).then((menu) => res.status(200).json(menu));
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.detail });
    }
  } else {
    res.status(400).json({ message: 'Unable to authorize this request' });
  }
});

router.post('/item', Auth.requireToken, async (req, res) => {
  const user = res.locals.user;
  const menu_item = req.body;
  const truck = await Trucks.findById(menu_item.truck_id);
  let validate;
  try {
    validate = user.operator_id === truck.operator_id;
  } catch {
    res.status(404).json({ message: 'No truck with that id' });
  }
  if (validate) {
    try {
      await Menu.create(menu_item).then((menu) => res.status(200).json(menu));
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.detail });
    }
  } else {
    res.status(400).json({ message: 'No request body' });
  }
});

router.put('/item', Auth.requireToken, async (req, res) => {
  const user = res.locals.user;
  const menu_item = req.body;
  const truck = await Trucks.findById(menu_item.truck_id);
  let validate;
  try {
    validate = user.operator_id === truck.operator_id;
  } catch {
    res.status(404).json({ message: 'No truck with that id' });
  }
  if (validate) {
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
  } else {
    res.status(400).json({ message: 'Unable to authorize this request' });
  }
});

router.delete('/item/:id', Auth.requireToken, async (req, res) => {
  let menu_item, truck, validate;
  const id = req.params.id;
  const user = res.locals.user;

  menu_item = await Menu.findById(id);
  try {
    truck = await Trucks.findById(menu_item.truck_id);
  } catch {
    res.status(404).json({ message: 'No menu item with that id' });
  }
  try {
    validate = user.operator_id === truck.operator_id;
  } catch {
    res.status(404).json({ message: 'No truck item with that id' });
  }

  if (validate) {
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
  } else {
    res.status(400).json({ message: 'Unable to authorize this request' });
  }
});

module.exports = router;
