const express = require('express');
//const authRequired = require('../middleware/authRequired');
const Profiles = require('./profileModel');
const router = express.Router();

router.get('/', function (req, res) {
  Profiles.findAll()
    .then((profiles) => {
      res.status(200).json(profiles);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', function (req, res) {
  const id = String(req.params.id);
  Profiles.findById(id)
    .then((profile) => {
      if (profile) {
        res.status(200).json(profile);
      } else {
        res.status(404).json({ error: 'ProfileNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/:id/operator', function (req, res) {
  const id = String(req.params.id);
  Profiles.findById(id)
    .then((profile) => {
      if (profile) {
        Profiles.getOperatorInfo(id)
          .then((operator) => {
            console.log(operator);
            if (operator) {
              res.status(200).json({ ...profile, operator });
            } else {
              res.status(404).json({ error: 'Operator Not Found' });
            }
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
      } else {
        res.status(404).json({ error: 'Profile Not Found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/:id/diner', function (req, res) {
  const id = String(req.params.id);
  Profiles.findById(id)
    .then((profile) => {
      if (profile) {
        Profiles.getDinerInfo(id)
          .then((diner) => {
            if (diner) {
              res.status(200).json({
                ...profile,
                diner,
              });
            } else {
              res.status(404).json({ error: 'Diner Not Found' });
            }
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
      } else {
        res.status(404).json({ error: 'Profile Not Found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', async (req, res) => {
  const profile = req.body;
  if (profile) {
    const id = profile.profile_id || 0;
    try {
      await Profiles.findById(id).then(async (pf) => {
        if (pf == undefined) {
          //profile not found so lets insert it
          await Profiles.create(profile).then((profile) => {
            console.log(profile);
            res
              .status(200)
              .json({ message: 'profile created', profile: profile });
          });
        } else {
          res.status(400).json({ message: 'profile already exists' });
        }
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  } else {
    res.status(404).json({ message: 'Profile missing' });
  }
});

router.put('/', (req, res) => {
  const profile = req.body;
  if (profile) {
    const id = profile.profile_id || 0;
    Profiles.findById(id)
      .then(
        Profiles.update(id, profile)
          .then((updated) => {
            res
              .status(200)
              .json({ message: 'profile created', profile: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update profile '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find profile '${id}'`,
          error: err.message,
        });
      });
  }
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  try {
    Profiles.findById(id).then((profile) => {
      Profiles.remove(profile.id).then(() => {
        res
          .status(200)
          .json({ message: `Profile '${id}' was deleted.`, profile: profile });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete profile with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
