const express = require('express');
const bcrypt = require('bcryptjs');
const Profiles = require('../profile/profileModel');
const jwt = require('jsonwebtoken');
const router = express.Router();

const makeJwt = (profile) => {
  const payload = {
    email: profile.email,
    id: profile.profile_id,
  };
  const config = {
    jwtSecret: process.env.JWT_SECRET || 'foo',
  };
  return jwt.sign(payload, config.jwtSecret);
};

router.post('/', async (req, res) => {
  Profiles.findBy({ email: req.body.email })
    .then((profiles) => {
      const verifies = bcrypt.compareSync(
        req.body.password,
        profiles[0].password
      );
      if (verifies) {
        const token = makeJwt(profiles[0]);
        res.status(200).json({ token: token });
      } else
        res.status(401).json({ message: 'Incorrect username or password' });
    })
    .catch(() => {
      res.status(401).json({ message: 'Email not found' });
    });
});

module.exports = router;
