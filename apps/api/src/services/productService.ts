import { Marketplace, ProductStatus, ListingStatus } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { syncProduct } from './integrationService';

export async function publishProductFromDraft(draftId: string, marketplaces: Marketplace[]) {
  const draft = await prisma.draftProduct.findUnique({ where: { id: draftId }, include: { import: true } });
  if (!draft) {
    throw new Error('Draft not found');
  }

  const product = await prisma.product.create({
    data: {
      sku: `SKU-${draft.id.slice(-6)}`,
      title: draft.title,
      price: draft.price,
      status: ProductStatus.ACTIVE,
      draft: { connect: { id: draft.id } },
      supplier: draft.import.supplierId ? { connect: { id: draft.import.supplierId } } : undefined,
      marketplaceListings: {
        create: marketplaces.map((marketplace) => ({
          marketplace,
          marketplaceSku: `MKT-${marketplace}-${draft.id.slice(-4)}`,
          status: ListingStatus.PENDING
        }))
      }
    },
    include: { marketplaceListings: true }
  });

  await Promise.all(
    product.marketplaceListings.map((listing) =>
      syncProduct(listing.marketplace, {
        sku: listing.marketplaceSku,
        title: product.title,
        price: product.price,
        stock: product.stock,
        description: product.description
      }).catch(async () => {
        await prisma.marketplaceListing.update({
          where: { id: listing.id },
          data: { status: ListingStatus.ERROR }
        });
      })
    )
  );

  return product;
}

export async function updateInventory(productId: string, stock: number, price?: number) {
  const product = await prisma.product.update({
    where: { id: productId },
    data: {
      stock,
      price: price ?? undefined
    }
  });
  return product;
}
