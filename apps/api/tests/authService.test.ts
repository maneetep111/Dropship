import jwt from 'jsonwebtoken';
import { generateToken } from '../src/services/authService';
import { UserRole } from '@prisma/client';
import { env } from '../src/config/env';

describe('authService', () => {
  it('generates a JWT with expected payload', () => {
    const token = generateToken('user-1', UserRole.ADMIN);
    const decoded = jwt.verify(token, env.jwtSecret) as { sub: string; role: string };
    expect(decoded.sub).toBe('user-1');
    expect(decoded.role).toBe(UserRole.ADMIN);
  });
});
