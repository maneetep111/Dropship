'use client';

import { customers, orders, tickets } from '../../lib/sample-data';
import { PageHeader } from '../../components/PageHeader';
import { useSelection } from '../../components/SelectionContext';

export default function CustomersPage() {
  const { selectedCustomerId, setSelectedCustomerId, setSelectedOrderId } = useSelection();
  const selectedCustomer = customers.find((customer) => customer.id === selectedCustomerId) ?? customers[0];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customers"
        description="Understand customer health, lifetime value, and open support conversations."
        action={<button className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white">Export Segment</button>}
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <aside className="space-y-3 lg:col-span-1">
          {customers.map((customer) => {
            const isActive = selectedCustomerId ? selectedCustomerId === customer.id : customer.id === selectedCustomer.id;
            return (
              <button
                key={customer.id}
                className={`w-full rounded-lg border p-4 text-left text-sm transition ${
                  isActive ? 'border-brand bg-indigo-50 text-brand' : 'border-gray-200 bg-white text-gray-700 hover:border-brand'
                }`}
                onClick={() => setSelectedCustomerId(customer.id)}
              >
                <div className="font-semibold text-gray-900">{customer.name}</div>
                <div className="text-xs text-gray-500">{customer.email}</div>
                <div className="mt-2 text-xs text-gray-500">Lifetime value: ${customer.lifetimeValue.toFixed(2)}</div>
              </button>
            );
          })}
        </aside>
        <section className="space-y-4 rounded-lg bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900">{selectedCustomer.name}</h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase text-gray-500">Preferred Channel</dt>
              <dd className="text-sm text-gray-800">{selectedCustomer.preferredChannel}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-gray-500">Open Tickets</dt>
              <dd className="text-sm text-gray-800">{selectedCustomer.openTickets.length || 'None'}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-gray-500">Recent Orders</dt>
              <dd className="space-x-2 text-sm text-indigo-600">
                {selectedCustomer.recentOrders.map((orderNumber) => {
                  const order = orders.find((o) => o.orderNumber === orderNumber);
                  return (
                    <button key={orderNumber} onClick={() => order && setSelectedOrderId(order.id)} className="underline">
                      {orderNumber}
                    </button>
                  );
                })}
              </dd>
            </div>
          </dl>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Active Support Tickets</h3>
            <ul className="mt-2 space-y-2 text-sm text-gray-700">
              {tickets.filter((ticket) => ticket.customerId === selectedCustomer.id).length === 0 && (
                <li className="rounded border border-dashed border-gray-200 p-4 text-gray-500">No open tickets 🎉</li>
              )}
              {tickets
                .filter((ticket) => ticket.customerId === selectedCustomer.id)
                .map((ticket) => (
                  <li key={ticket.id} className="rounded border border-gray-100 p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{ticket.subject}</span>
                      <span className="text-xs uppercase text-rose-600">{ticket.priority}</span>
                    </div>
                    <p className="text-xs text-gray-500">Ticket {ticket.id}</p>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
