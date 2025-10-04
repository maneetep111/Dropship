import { ReactNode } from 'react';

export function SectionCard({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="rounded-lg bg-white p-6 shadow-sm">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {action}
      </header>
      <div className="space-y-4 text-sm text-gray-600">{children}</div>
    </section>
  );
}
