const express = require('express');
//const authRequired = require('../middleware/authRequired');
const Trucks = require('../trucks/truckModel');
const Operator = require('./operatorModel');
const Auth = require('../auth/authModel');
const router = express.Router();

router.get('/:id', Auth.requireToken, async function (req, res) {
  const id = Number(req.params.id);
  const user = res.locals.user;
  const validate = user.operator_id === id;
  let operatorRes = {};

  if (validate) {
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
  } else {
    res.status(401).json({
      message: "You're not authorized to see this page",
    });
  }
});

module.exports = router;
