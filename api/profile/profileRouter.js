const { v4: uuidv4 } = require('uuid');
const express = require('express');
const Auth = require('../auth/authModel');
const Profiles = require('./profileModel');
const router = express.Router();

router.get('/:id', Auth.requireToken, function (req, res) {
  const user = res.locals.user;
  const validate = user.profile_id === req.params.id;
  if (validate) {
    Profiles.findById(req.params.id)
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
  } else {
    res
      .status(401)
      .json({ message: 'Unable to authorize you for this request' });
  }
});

router.get('/:id/diner', Auth.requireToken, function (req, res) {
  const id = String(req.params.id);
  const user = res.locals.user;
  const validate = user.profile_id === id;

  if (validate) {
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
  } else {
    res
      .status(401)
      .json({ message: 'Unable to authorize you for this request' });
  }
});

router.post('/', async (req, res) => {
  const profileReq = req.body;
  const { role, ...profile } = profileReq;
  if (profile) {
    try {
      await Profiles.findBy({ email: profile.email }).then(async (pf) => {
        if (pf.length < 1) {
          //profile not found so lets insert it
          const uuid = uuidv4();
          if (role === 'operator') {
            await Profiles.createWithOperator({
              ...profile,
              profile_id: uuid,
            }).then((profile) => {
              const token = Auth.makeToken(profile[0]);
              //eslint-disable-next-line
              const { password, avatarUrl, ...profResponse } = profile[0];
              res.status(200).json({
                message: 'profile created',
                profile: profResponse,
                token: token,
              });
            });
          } else {
            await Profiles.create({ ...profile, profile_id: uuid }).then(
              (profile) => {
                const token = Auth.makeToken(profile[0]);
                //eslint-disable-next-line
                const { password, avatarUrl, ...profResponse } = profile[0];
                res.status(200).json({
                  message: 'profile created',
                  profile: profResponse,
                  token: token,
                });
              }
            );
          }
        } else {
          res
            .status(400)
            .json({ message: 'Profile already exists with this email' });
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

router.delete('/:id', Auth.requireToken, (req, res) => {
  const id = String(req.params.id);
  const user = res.locals.user;
  const validate = user.profile_id === id;

  if (validate) {
    Profiles.findById(id).then((profile) => {
      Profiles.remove(profile.profile_id)
        .then(() => {
          res.status(200).json({
            message: `Profile '${id}' was deleted.`,
            profile: profile,
          });
        })
        .catch(() => {
          res.status(500).json({ message: `Unable to delete profile ${id}` });
        })
        .catch((err) => {
          res.status(500).json({
            message: `Could not delete profile with ID: ${id}`,
            error: err.message,
          });
        });
    });
  } else {
    res
      .status(401)
      .json({ message: 'Unable to authorize you for this request' });
  }
});

module.exports = router;
