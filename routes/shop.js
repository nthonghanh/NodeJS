import express from 'express';
import { getProducts, getIndex, getCart, getCheckout, getOrders, getProduct,
    postCart, postCartDeleteItem } from '../controllers/shop';

const router = express.Router();

/* GET method */
router.get('/', getIndex);
router.get('/products/:productId', getProduct);
router.get('/products', getProducts);
router.get('/cart', getCart);
router.post('/cart', postCart);
router.get('/orders', getOrders);
router.get('/checkout', getCheckout);
router.post('/cart-delete-item', postCartDeleteItem);

module.exports = router;