import fs from 'fs';
import path from 'path';
import Product from '../models/productModel.js';
import mongoose from 'mongoose';

const PERSISTENCE_METHOD = process.env.PERSISTENCE_METHOD || 'mongodb';


export class ProductDAO {
  static async create(productData) {
    if (PERSISTENCE_METHOD === 'mongodb') {
      try {
        const product = new Product(productData);
        await product.save();
        return product;
      } catch (error) {
        throw new Error('Error creating product in MongoDB: ' + error.message);
      }
    } else {
      try {
        const products = JSON.parse(fs.readFileSync(path.resolve('products.json')));
        productData.id = products.length + 1;
        products.push(productData);
        fs.writeFileSync(path.resolve('products.json'), JSON.stringify(products));
        return productData;
      } catch (error) {
        throw new Error('Error creating product in file system: ' + error.message);
      }
    }
  }

  static async update(productId, productData) {
    const product = await Product.findById(productId);
    Object.assign(product, productData);
    return product.save();
  }

  static async delete(productId) {
    return Product.findByIdAndDelete(productId);
  }

  static async find() {
    if (PERSISTENCE_METHOD === 'mongodb') {
      try {
        return await Product.find();
      } catch (error) {
        throw new Error('Error fetching products from MongoDB: ' + error.message);
      }
    } else {
      try {
        return JSON.parse(fs.readFileSync(path.resolve('products.json')));
      } catch (error) {
        throw new Error('Error fetching products from file system: ' + error.message);
      }
    }
  }
}

export async function createProduct(req, res, next) {
  try {
    const result = await ProductDAO.createProduct(req.body);
    res.json(result);
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
}

