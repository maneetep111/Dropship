import './globals.css';
import type { Metadata } from 'next';
import { Sidebar } from '../components/Sidebar';
import { SelectionProvider } from '../components/SelectionContext';

export const metadata: Metadata = {
  title: 'Dropship Operations Platform',
  description: 'Operate supplier imports, product lifecycle, orders, and support in one workspace.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SelectionProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-8">
              <div className="mx-auto max-w-7xl space-y-8">{children}</div>
            </main>
          </div>
        </SelectionProvider>
      </body>
    </html>
  );
}
