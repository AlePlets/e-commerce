import bcrypt from 'bcrypt';
import { UserDAO } from '../dao/userDAO.js';
import jwt from 'jsonwebtoken';

export async function createUser(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserDAO.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

   // const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserDAO.createUser({
      name,
      email,
      password, //hashedPassword,
    });

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    next(error);
  }
}

export async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await UserDAO.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ userId: user._id }, 'secret-key', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
}
