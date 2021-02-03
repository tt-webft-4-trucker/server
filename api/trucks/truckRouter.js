const express = require('express');
const Auth = require('../auth/authModel');
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

router.post('/', Auth.requireToken, async (req, res) => {
  const truck = req.body;
  const user = res.locals.user;
  const verify = user.operator_id === truck.operator_id;

  if (truck && user && verify) {
    await Trucks.create(truck)
      .then((truck) =>
        res.status(200).json({ message: 'truck created', truck: truck[0] })
      )
      .catch((err) =>
        res
          .status(500)
          .json({ message: 'Unable to complete this request', error: err })
      );
  } else {
    res
      .status(401)
      .json({ message: 'Unable to authorize you for this request' });
  }
});

router.put('/', Auth.requireToken, async (req, res) => {
  const truck = req.body;
  const user = res.locals.user;

  if (truck && user) {
    Trucks.findById(truck.truck_id)
      .then((truck) => {
        const verify = truck.operator_id === user.operator_id;
        if (verify) {
          Trucks.update(truck.truck_id, truck)
            .then((updated) => {
              res
                .status(200)
                .json({ message: 'Truck updated', truck: updated[0] });
            })
            .catch((err) => {
              res.status(500).json({
                message: `Could not update truck '${truck.truck_id}'`,
                error: err.message,
              });
            });
        } else {
          res
            .status(401)
            .json({ message: 'Unable to authorize you for this request' });
        }
      })
      .catch((err) => {
        res.status(404).json({
          message: `Could not find truck '${truck.truck_id}'`,
          error: err.message,
        });
      });
  }
});

router.delete('/:id', Auth.requireToken, async (req, res) => {
  const id = req.params.id;
  const user = res.locals.user;
  if (user) {
    Trucks.findById(id)
      .then((truck) => {
        const verify = truck.operator_id === user.operator_id;

        if (verify) {
          Trucks.remove(truck.truck_id).then(() => {
            res.status(200).json({
              message: `Truck '${truck.truck_id}' was deleted.`,
              truck: truck,
            });
          });
        } else {
          res
            .status(401)
            .json({ message: 'Unable to authorize your for this request' });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: `Could not find truck with ID: ${id}`,
          error: err.message,
        });
      });
  } else {
    res
      .status(401)
      .json({ message: 'Unable to authorize you for this request' });
  }
});

module.exports = router;
