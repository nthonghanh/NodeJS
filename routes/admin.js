import express from 'express';
import { getAddProduct, postAddProduct, getProducts, getEditProduct, postEditProduct, postDeleteProduct } from '../controllers/admin';

const router = express.Router();

/* GET method */
router.get('/add-product', getAddProduct);
router.get('/products', getProducts);
router.get('/edit-product/:productId', getEditProduct);

/* POST method */
router.post('/add-product', postAddProduct);
router.post('/edit-product', postEditProduct);
router.post('/delete-product', postDeleteProduct);

module.exports.routes = router;