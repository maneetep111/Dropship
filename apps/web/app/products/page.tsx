'use client';

import { DataTable } from '../../components/DataTable';
import { PageHeader } from '../../components/PageHeader';
import { products } from '../../lib/sample-data';
import { useSelection } from '../../components/SelectionContext';

export default function ProductsPage() {
  const { selectedProductId, setSelectedProductId } = useSelection();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Monitor catalog performance and marketplace sync status."
        action={<button className="rounded-md border border-brand px-4 py-2 text-sm font-medium text-brand">Sync to Channels</button>}
      />
      <DataTable
        data={products}
        rowClassName={(product) => (selectedProductId === product.id ? 'bg-indigo-50/70' : '')}
        columns={[
          {
            header: 'Product',
            accessor: (product) => (
              <button
                className={`text-left font-medium ${selectedProductId === product.id ? 'text-brand' : 'text-gray-900'}`}
                onClick={() => setSelectedProductId(selectedProductId === product.id ? undefined : product.id)}
              >
                {product.title}
              </button>
            )
          },
          { header: 'SKU', accessor: (product) => product.sku },
          { header: 'Stock', accessor: (product) => product.stock },
          {
            header: 'Price',
            accessor: (product) => `$${product.price.toFixed(2)}`
          },
          {
            header: 'Channels',
            accessor: (product) => (
              <div className="flex flex-wrap gap-1">
                {product.channels.map((channel) => (
                  <span key={channel} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                    {channel}
                  </span>
                ))}
              </div>
            )
          },
          {
            header: 'Sync State',
            accessor: (product) => (
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  product.syncState === 'synced'
                    ? 'bg-emerald-100 text-emerald-700'
                    : product.syncState === 'pending'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-rose-100 text-rose-700'
                }`}
              >
                {product.syncState}
              </span>
            )
          }
        ]}
        emptyState={<span>No products available.</span>}
      />
      {selectedProductId && (
        <div className="rounded-lg border border-brand bg-white p-4 text-sm text-gray-700 shadow-sm">
          Product {selectedProductId} selected. Draft and support modules now highlight related information.
        </div>
      )}
    </div>
  );
}
