const express = require('express');
//const authRequired = require('../middleware/authRequired');
const Trucks = require('./truckModel');
const router = express.Router();

router.get('/', function (req, res) {
  Trucks.findAll()
    .then((Trucks) => {
      res.status(200).json(Trucks);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', function (req, res) {
  const id = String(req.params.id);
  Trucks.findById(id)
    .then((truck) => {
      if (truck) {
        Trucks.getMenu(id)
          .then((menu) => {
            if (menu) {
              console.log('menu is there');
              res.status(200).json({ ...truck, menu: menu });
            } else {
              res.status(404).json({ error: 'Menu Not Found' });
            }
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
      } else {
        res.status(404).json({ error: 'Truck Not Found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', async (req, res) => {
  const truck = req.body;
  if (truck) {
    const id = truck.id || 0;
    try {
      await Trucks.findById(id).then(async (pf) => {
        if (pf == undefined) {
          //truck not found so lets insert it
          await Trucks.create(truck).then((truck) =>
            res.status(200).json({ message: 'truck created', truck: truck[0] })
          );
        } else {
          res.status(400).json({ message: 'Truck already exists' });
        }
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  } else {
    res.status(404).json({ message: 'Truck missing' });
  }
});

router.put('/', (req, res) => {
  const truck = req.body;
  if (truck) {
    const id = truck.id || 0;
    Trucks.findById(id)
      .then(
        Trucks.update(id, truck)
          .then((updated) => {
            res
              .status(200)
              .json({ message: 'profile created', truck: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update truck '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find truck '${id}'`,
          error: err.message,
        });
      });
  }
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  try {
    Trucks.findById(id).then((truck) => {
      Trucks.remove(truck.id).then(() => {
        res
          .status(200)
          .json({ message: `Truck '${id}' was deleted.`, truck: truck });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete truck with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
