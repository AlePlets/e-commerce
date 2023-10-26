import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    },
  ],
  totalPrice: Number,
  status: { type: String, default: 'active' },
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;