import express from 'express';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../controllers/productControllers.js';
import { purchase } from '../controllers/cartControllers.js';
const router = express.Router();

router.get('/api/products', getProducts)
router.post('/api/products', addProduct);
router.put('/api/products/:productId', updateProduct);
router.delete('/api/products/:productId', deleteProduct);
router.post('/api/carts/:cartId/purchase', purchase);

export default router;