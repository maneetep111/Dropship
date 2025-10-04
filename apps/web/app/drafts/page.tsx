'use client';

import { draftProducts } from '../../lib/sample-data';
import { PageHeader } from '../../components/PageHeader';
import { useSelection } from '../../components/SelectionContext';

export default function DraftsPage() {
  const { selectedDraftId, setSelectedDraftId } = useSelection();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Drafts"
        description="Review imported products before publishing to marketplaces."
        action={<button className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white">Publish Selected</button>}
      />
      <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {draftProducts.map((draft) => {
          const isActive = selectedDraftId === draft.id;
          return (
            <li
              key={draft.id}
              className={`cursor-pointer rounded-lg border p-4 shadow-sm transition ${
                isActive ? 'border-brand bg-indigo-50' : 'border-gray-200 bg-white hover:border-brand'
              }`}
              onClick={() => setSelectedDraftId(isActive ? undefined : draft.id)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{draft.name}</h3>
                  <p className="text-xs text-gray-500">{draft.category}</p>
                </div>
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">{draft.source}</span>
              </div>
              <dl className="mt-4 space-y-1 text-sm text-gray-600">
                <div className="flex justify-between">
                  <dt>Profitability</dt>
                  <dd>{draft.profitability}%</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Manager</dt>
                  <dd>{draft.manager}</dd>
                </div>
              </dl>
            </li>
          );
        })}
      </ul>
      {selectedDraftId && (
        <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-4 text-sm text-indigo-900">
          Draft {selectedDraftId} selected. Related product and ticket information is highlighted in other views.
        </div>
      )}
    </div>
  );
}
