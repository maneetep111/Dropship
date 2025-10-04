'use client';

import { DataTable } from '../../components/DataTable';
import { PageHeader } from '../../components/PageHeader';
import { orders } from '../../lib/sample-data';
import { useSelection } from '../../components/SelectionContext';

export default function OrdersPage() {
  const { selectedOrderId, setSelectedOrderId, setSelectedCustomerId } = useSelection();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        description="Track fulfillment progress and supplier confirmations."
        action={<button className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white">Bulk Update</button>}
      />
      <DataTable
        data={orders}
        rowClassName={(order) => (selectedOrderId === order.id ? 'bg-amber-50' : '')}
        columns={[
          {
            header: 'Order',
            accessor: (order) => (
              <button
                className={`text-left font-medium ${selectedOrderId === order.id ? 'text-brand' : 'text-gray-900'}`}
                onClick={() => setSelectedOrderId(selectedOrderId === order.id ? undefined : order.id)}
              >
                {order.orderNumber}
              </button>
            )
          },
          {
            header: 'Customer',
            accessor: (order) => (
              <button
                className="text-left text-sm text-indigo-600 hover:underline"
                onClick={() => setSelectedCustomerId(order.customerId)}
              >
                {order.customerName}
              </button>
            )
          },
          { header: 'Channel', accessor: (order) => order.channel },
          { header: 'Total', accessor: (order) => `$${order.total.toFixed(2)}` },
          {
            header: 'Fulfillment',
            accessor: (order) => (
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                  order.fulfillment === 'fulfilled'
                    ? 'bg-emerald-100 text-emerald-700'
                    : order.fulfillment === 'in_progress'
                    ? 'bg-amber-100 text-amber-700'
                    : order.fulfillment === 'issue'
                    ? 'bg-rose-100 text-rose-700'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {order.fulfillment}
              </span>
            )
          },
          {
            header: 'Tracking',
            accessor: (order) => order.tracking ?? '—'
          }
        ]}
        emptyState={<span>No orders available.</span>}
      />
      {selectedOrderId && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Order {selectedOrderId} selected. Linked customer and support tickets are highlighted elsewhere.
        </div>
      )}
    </div>
  );
}
