'use client';

import { PageHeader } from '../../components/PageHeader';
import { tickets, customers, orders } from '../../lib/sample-data';
import { useSelection } from '../../components/SelectionContext';

export default function SupportPage() {
  const { setSelectedCustomerId, setSelectedOrderId } = useSelection();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Support"
        description="Manage escalations and keep response times within SLA."
        action={<button className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white">New Response</button>}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tickets.map((ticket) => {
          const customer = customers.find((c) => c.id === ticket.customerId);
          const order = ticket.orderNumber ? orders.find((o) => o.orderNumber === ticket.orderNumber) : undefined;
          return (
            <article key={ticket.id} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <header className="flex items-start justify-between">
                <h3 className="text-base font-semibold text-gray-900">{ticket.subject}</h3>
                <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold uppercase text-rose-600">
                  {ticket.priority}
                </span>
              </header>
              <dl className="mt-3 space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <dt>Status</dt>
                  <dd className="capitalize">{ticket.status}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>SLA</dt>
                  <dd>{ticket.slaExpiresIn}</dd>
                </div>
                {customer && (
                  <div className="flex justify-between">
                    <dt>Customer</dt>
                    <dd>
                      <button className="text-indigo-600 underline" onClick={() => setSelectedCustomerId(customer.id)}>
                        {customer.name}
                      </button>
                    </dd>
                  </div>
                )}
                {order && (
                  <div className="flex justify-between">
                    <dt>Order</dt>
                    <dd>
                      <button className="text-indigo-600 underline" onClick={() => setSelectedOrderId(order.id)}>
                        {order.orderNumber}
                      </button>
                    </dd>
                  </div>
                )}
              </dl>
              <footer className="mt-4 text-xs text-gray-500">Linked issues update relevant modules instantly.</footer>
            </article>
          );
        })}
      </div>
    </div>
  );
}
