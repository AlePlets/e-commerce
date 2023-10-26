import express from 'express';
import { getCart, createCart, addProductToCart, removeProductFromCart } from '../controllers/cartControllers.js';
const router = express.Router();

router.post('/api/carts', createCart);
router.get('/api/carts/:cartId', getCart);
router.post('/api/carts/:cartId/products/:productId', addProductToCart);
router.delete('/api/carts/:cartId/products/:productId', removeProductFromCart);

export default router;