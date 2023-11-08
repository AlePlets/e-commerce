import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

const app = express();

dotenv.config({path: '../.env'});

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 3000;


mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());
app.use(productRoutes);
app.use(cartRoutes);
app.use(userRoutes)

app.listen(PORT, () => {
  console.log(`Server está rodando em: http://localhost:${PORT}`);
});