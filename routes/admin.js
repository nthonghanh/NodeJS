const express = require('express');
const addProductController = require('../controllers/product');

const router = express.Router();

router.get('/add-product', addProductController.getAddProduct);

router.post('/add-product', addProductController.postAddProduct);

module.exports.routes = router;