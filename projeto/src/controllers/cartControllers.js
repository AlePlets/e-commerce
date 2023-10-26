import { CartDAO } from '../dao/cartDao.js';

export const createCart = async (req, res) => {
  const cart = await CartDAO.create();
  res.status(201).json(cart);
};

export const getCart = async (req, res) => {
  const cart = await CartDAO.find(req.params.cartId);
  res.json(cart);
};

export const addProductToCart = async (req, res) => {
  const cart = await CartDAO.addProduct(req.params.cartId, req.params.productId);
  res.json(cart);
};

export const removeProductFromCart = async (req, res) => {
  await CartDAO.removeProduct(req.params.cartId, req.params.productId);
  res.status(204).end();
};

export const purchase = async (req, res) => {
    const result = await CartDAO.purchase(req.params.cartId);
    res.json(result);
  };


export async function newCart(req, res, next) {
  try {
    const result = await CartDAO.newCart(req.body);
    res.json(result);
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
}