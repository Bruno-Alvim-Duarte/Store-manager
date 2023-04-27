const express = require('express');
const { salesController } = require('../controllers');
const validateSales = require('../middlewares/validateSales');

const router = express.Router();

router.post('/', validateSales, salesController.create);

router.get('/', salesController.getAll);

router.get('/:id', salesController.getSaleWithProductsByID);

router.delete('/:id', salesController.deleteSaleByID);

router.put('/:id', validateSales, salesController.updateSaleByID);

module.exports = router;