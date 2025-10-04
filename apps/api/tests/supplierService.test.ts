import { ingestCatalog } from '../src/services/supplierService';
import { prisma } from '../src/lib/prisma';

jest.mock('../src/lib/prisma', () => ({
  prisma: {
    supplierImport: {
      create: jest.fn().mockResolvedValue({ id: 'import-1' })
    }
  }
}));

const publishMock = jest.fn();

jest.mock('../src/config/redis', () => ({
  ensureRedis: jest.fn().mockResolvedValue({ publish: publishMock })
}));

describe('supplierService', () => {
  it('publishes import job to Redis', async () => {
    await ingestCatalog('supplier-1', { products: [] });
    expect(prisma.supplierImport.create).toHaveBeenCalled();
    expect(publishMock).toHaveBeenCalledWith('supplier:imports', expect.any(String));
  });
});
