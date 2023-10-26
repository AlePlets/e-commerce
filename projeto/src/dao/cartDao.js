import fs from 'fs';
import path from 'path';
import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';

const PERSISTENCE_METHOD = process.env.PERSISTENCE_METHOD || 'mongodb';


export class CartDAO {
  static async create() {
    const cart = new Cart();
    return cart.save();
  }

  static async addProduct(cartId, productId) {
    const cart = await Cart.findById(cartId);
    const product = await Product.findById(productId);
    if (product.stock > 0) {
      cart.products.push(productId);
      product.stock--;
      await product.save();
      return cart.save();
    } else {
      throw new Error('Product out of stock');
    }
  }

  static async removeProduct(cartId, productId) {
    const cart = await Cart.findById(cartId);
    cart.products.pull(productId);
    await cart.save();
    const product = await Product.findById(productId);
    product.stock++;
    return product.save();
  }

  static async purchase(cartId) {
    const cart = await Cart.findById(cartId).populate('products');
    cart.products.forEach(product => {
      if (product.stock <= 0) {
        throw new Error(`Product ${product.name} is out of stock`);
      }
      product.stock--;
      product.save();
    });
    cart.products = [];
    await cart.save();
    return { message: 'Purchase successful' };
  }

  static async createCart(cartData) {
    if (PERSISTENCE_METHOD === 'mongodb') {
      try {
        const cart = new Cart(cartData);
        await cart.save();
        return cart;
      } catch (error) {
        throw new Error('Error creating cart in MongoDB: ' + error.message);
      }
    } else {
      try {
        const carts = JSON.parse(fs.readFileSync(path.resolve('carts.json')));
        cartData.id = carts.length + 1;
        carts.push(cartData);
        fs.writeFileSync(path.resolve('carts.json'), JSON.stringify(carts));
        return cartData;
      } catch (error) {
        throw new Error('Error creating cart in file system: ' + error.message);
      }
    }
  }
}

