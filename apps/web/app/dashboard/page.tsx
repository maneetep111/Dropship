import { metrics, recentImports, tickets } from '../../lib/sample-data';
import { MetricCard } from '../../components/MetricCard';
import { PageHeader } from '../../components/PageHeader';
import { SectionCard } from '../../components/SectionCard';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Dashboard" description="Real-time view of operations across marketplaces." />
      <dl className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.name} metric={metric} />
        ))}
      </dl>
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Recent Supplier Imports">
          <ul className="space-y-3">
            {recentImports.map((importJob) => (
              <li key={importJob.id} className="flex items-center justify-between rounded-md border border-gray-100 p-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{importJob.supplier}</p>
                  <p className="text-xs text-gray-500">
                    {importJob.marketplace} • {new Date(importJob.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                    importJob.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-700'
                      : importJob.status === 'processing'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {importJob.status}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard title="Escalated Support Tickets">
          <ul className="space-y-3">
            {tickets
              .filter((ticket) => ticket.priority === 'high')
              .map((ticket) => (
                <li key={ticket.id} className="rounded-md border border-gray-100 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{ticket.subject}</p>
                    <span className="text-xs font-medium uppercase text-rose-600">{ticket.priority}</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Ticket {ticket.id} • SLA {ticket.slaExpiresIn}
                    {ticket.orderNumber ? ` • Order ${ticket.orderNumber}` : ''}
                  </p>
                </li>
              ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
