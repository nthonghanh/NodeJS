import express from 'express';
import { getAddProduct, postAddProduct, getProducts } from '../controllers/admin';

const router = express.Router();

/* GET method */
router.get('/add-product', getAddProduct);
router.get('/products', getProducts);

/* POST method */
router.post('/add-product', postAddProduct);

module.exports.routes = router;