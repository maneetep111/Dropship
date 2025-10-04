import { Metric } from '../lib/sample-data';

export function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <dt className="text-sm font-medium text-gray-500">{metric.name}</dt>
      <dd className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-semibold text-gray-900">{metric.value}</span>
        {metric.delta && (
          <span className={`text-sm font-medium ${metric.positive ? 'text-emerald-600' : 'text-rose-500'}`}>
            {metric.delta}
          </span>
        )}
      </dd>
    </div>
  );
}
