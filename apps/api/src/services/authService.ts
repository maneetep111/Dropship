import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { env } from '../config/env';
import { UserRole } from '@prisma/client';

export async function registerUser(email: string, password: string, role: UserRole = UserRole.AGENT) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error('User already exists');
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, passwordHash, role } });
  return user;
}

export async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.passwordHash) {
    throw new Error('Invalid credentials');
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    throw new Error('Invalid credentials');
  }
  return generateToken(user.id, user.role);
}

export function generateToken(userId: string, role: UserRole) {
  return jwt.sign({ sub: userId, role }, env.jwtSecret, { expiresIn: '8h' });
}
