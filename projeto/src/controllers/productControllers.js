import { ProductDAO } from '../dao/productDAO.js?';

export const addProduct = async (req, res) => {
  const product = await ProductDAO.create(req.body);
  res.status(201).json(product);
};

export const getProducts = async (req, res) => {
  const product = await ProductDAO.find();
  res.json(product);
}

export const updateProduct = async (req, res) => {
  const product = await ProductDAO.update(req.params.productId, req.body);
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  await ProductDAO.delete(req.params.productId);
  res.status(204).end();
};
