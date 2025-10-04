import { updateInventory } from '../src/services/productService';
import { prisma } from '../src/lib/prisma';

jest.mock('../src/lib/prisma', () => ({
  prisma: {
    product: {
      update: jest.fn().mockResolvedValue({ id: 'prod-1', stock: 10, price: 20 })
    }
  }
}));

describe('productService', () => {
  it('updates inventory values', async () => {
    await updateInventory('prod-1', 10, 20);
    expect(prisma.product.update).toHaveBeenCalledWith({
      where: { id: 'prod-1' },
      data: { stock: 10, price: 20 }
    });
  });
});
