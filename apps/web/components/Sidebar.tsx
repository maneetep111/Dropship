'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '../lib/navigation';
import { resolveIcon, IconName } from './icons';
import classNames from 'classnames';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-gray-200 bg-white">
      <div className="px-6 py-5 text-lg font-semibold tracking-tight text-brand">Dropship Ops</div>
      <nav className="flex-1 space-y-1 px-3">
        {navigation.map((item) => {
          const Icon = resolveIcon(item.icon as IconName);
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={classNames(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-brand text-white shadow'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-gray-100 p-4 text-xs text-gray-500">
        Connected marketplaces synced hourly.
      </div>
    </aside>
  );
}
