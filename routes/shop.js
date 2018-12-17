import express from 'express';
import { getProducts, getIndex, getCart, getCheckout, getOrders, getProduct } from '../controllers/shop';

const router = express.Router();

/* GET method */
router.get('/', getIndex);
router.get('/products/:productId', getProduct);
router.get('/products', getProducts);
router.get('/cart', getCart);
router.get('/orders', getOrders);
router.get('/checkout', getCheckout);

module.exports = router;