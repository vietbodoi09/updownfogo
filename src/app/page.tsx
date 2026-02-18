'use client';

import dynamic from 'next/dynamic';

// Dynamic import with SSR disabled
const ClientPage = dynamic(
  () => import('@/components/ClientPage').then(mod => mod.ClientPage),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading FogoUpDown...</p>
        </div>
      </div>
    )
  }
);

export default function Home() {
  return <ClientPage />;
}
