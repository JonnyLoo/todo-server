const express = require('express');

const ROUTER = express.Router();
const controller = require('../controllers/controller');

ROUTER.get('/getItem', controller.getItem);
ROUTER.post('/updateItem', controller.updateItem);
ROUTER.delete('/removeItem', controller.removeItem);
ROUTER.post('/createItem', controller.createItem);

ROUTER.get('/getList', controller.getList);

module.exports = ROUTER;
