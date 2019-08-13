const express = require('express');

const ROUTER = express.Router();
const controller = require('../controllers/controller');

// link routes to their handlers
ROUTER.get('/', controller.getList);

ROUTER.post('/:_id/update', controller.updateItem);
ROUTER.delete('/:_id/remove', controller.removeItem);
ROUTER.post('/create', controller.createItem);

module.exports = ROUTER;
