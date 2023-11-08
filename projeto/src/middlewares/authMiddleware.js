import jwt from 'jsonwebtoken';

export function authenticateUser(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  try {
    const decoded = jwt.verify(token, 'chave-secreta');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token Inválido' });
  }
}