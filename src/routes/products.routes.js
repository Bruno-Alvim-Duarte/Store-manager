const express = require('express');
const { productsController } = require('../controllers');
const validateProduct = require('../middlewares/validateProduct');

const router = express.Router();

router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

router.post('/', validateProduct, productsController.create);

router.put('/:id', validateProduct, productsController.update);

module.exports = router;