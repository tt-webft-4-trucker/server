const express = require('express');
const bcrypt = require('bcryptjs');
const Profiles = require('../profile/profileModel');
const Auth = require('./authModel');
const router = express.Router();

router.post('/', async (req, res) => {
  Profiles.findBy({ email: req.body.email })
    .then((profiles) => {
      const verifies = bcrypt.compareSync(
        req.body.password,
        profiles[0].password
      );
      if (verifies) {
        //eslint-disable-next-line
        const { password, ...profResp } = profiles[0];
        const token = Auth.makeToken(profiles[0]);
        res.status(200).json({ profile: profResp, token: token });
      } else
        res.status(401).json({ message: 'Incorrect username or password' });
    })
    .catch(() => {
      res.status(401).json({ message: 'Email not found' });
    });
});

module.exports = router;
