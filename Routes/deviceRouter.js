const express = require('express');

const deviceRouter = express.Router();

const DeviceSchema = require('../models/deviceModel');
const checkAuth = require('../config/jwt-config');

// get all devices
deviceRouter.get('/devices', (req, res) => {
  DeviceSchema
    .find({})
    .then((devices) => {
      res.status(200).json({
        message: 'all devices',
        devices,
      });
    })
    .catch((err) => {
      res.status(404).json({
        error: err,
      });
    });
});

// get specific device
deviceRouter.get('/devices/:id', (req, res) => {
  DeviceSchema
    .findOne({ _id: req.params.id })
    .populate('creator')
    .then((device) => {
      if (device) {
        res.status(200).json(device);
      } else {
        res.status(404).json({ message: 'device not found!' });
      }
    });
});

// create device
deviceRouter.post('/devices', checkAuth, (req, res) => {
  const device = new DeviceSchema({
    name: req.body.name,
    creator: req.userData.userId,
  });
  device
    .save()
    .then((data) => {
      res.status(201).json({
        message: 'A device created!',
        data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        err,
      });
    });
});

// update device
deviceRouter.put('/devices', checkAuth, (req, res) => {
  DeviceSchema
    .updateOne(
      { _id: req.body.id, creator: req.userData.userId },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          year: req.body.year,
        },
      },
      { multi: true },
    )
    .then((result) => {
      console.log(result);
      if (result.nModified > 0) {
        res.status(200).json({ message: 'Device updated successfully!' });
      } else {
        res.status(401).json({ message: 'Not Authorized!' });
      }
    });
});

// delete device
deviceRouter.delete('/devices/:id', checkAuth, (req, res) => {
  DeviceSchema
    .deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then((result) => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: 'Device deleted!' });
      } else {
        res.status(401).json({ message: 'Not Authorized!' });
      }
    });
});

module.exports = deviceRouter;
