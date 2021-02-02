const express = require('express');
//const authRequired = require('../middleware/authRequired');
const Trucks = require('../trucks/truckModel');
const Operator = require('./operatorModel');
const router = express.Router();

router.get('/:id', function (req, res) {
  const id = String(req.params.id);
  let operatorRes = {};
  Operator.findById(id)
    .then((operator) => {
      operatorRes = operator;
      Trucks.findBy({ operator_id: operator.operator_id })
        .then((trucks) => {
          res
            .status(200)
            .json({ operator_id: operatorRes.operator_id, trucks: trucks });
        })
        .catch((err) => {
          res.status(404).json({ message: err });
        });
    })
    .catch((err) => {
      res.status(404).json({ message: 'Operator Not Found', error: err });
    });
});

module.exports = router;
