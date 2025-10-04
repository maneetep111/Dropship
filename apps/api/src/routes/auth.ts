import { Router } from 'express';
import { authenticateUser, generateToken, registerUser } from '../services/authService';
import { prisma } from '../lib/prisma';

const router = Router();

router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await registerUser(email, password);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await authenticateUser(email, password);
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

router.post('/token', async (req, res, next) => {
  try {
    const { userId } = req.body;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const token = generateToken(user.id, user.role);
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

export default router;
