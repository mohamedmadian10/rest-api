/* eslint-disable no-useless-return */
const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();

const User = require('../models/userModel');
require('../models/deviceModel');

// user registeration

authRouter.post('/signup', (req, res) => {
  // crypting password
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: 'user created!!',
          result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

// user Login

authRouter.post('/login', (req, res) => {
  let currentUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      // console.log(user)
      if (!user) {
        return res.status(401).json({
          message: ' Auth failed',
        });
      }
      currentUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    // eslint-disable-next-line consistent-return
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: ' Auth failed',
        });
      }
      // generate Token
      /* eslint no-underscore-dangle: 0 */
      const token = jwt.sign(
        { email: currentUser.email, userId: currentUser._id },
        'secret_This_should_be_longer',
        { expiresIn: '1h' },
      );
      res.status(200).json(token);
      // eslint-disable-next-line no-useless-return
      // eslint-disable-next-line consistent-return
      return;
    })
    .catch((err) => {
      res.status(401).json({
        message: ' Auth failed',
        err,
      });
      return err;
    });
});

// get devices for every specific user
authRouter.get('/users/:id', (req, res) => {
  User.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(req.params.id) },
    },
    {
      $lookup: {
        from: 'devices',
        localField: '_id',
        foreignField: 'creator',
        as: 'devicesArr',
      }, // lookup
    },
    {
      $project: { email: '$email', devices: '$devicesArr' },
    },
  ])
    .then((data) => res.status(200).json(data))

    .catch((error) => res.status(404).json(error));
});

// get all users with devices
authRouter.get('/users', (req, res) => {
  User.aggregate([
    {
      $lookup: {
        from: 'devices',
        localField: '_id',
        foreignField: 'creator',
        as: 'devicesArr',
      }, // lookup
    },
    {
      $project: { email: '$email', devices: '$devicesArr' },
    },
  ])
    .then((users) => res.status(200).json(users))

    .catch((err) => res.status(404).json(err));
});
module.exports = authRouter;
