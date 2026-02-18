import dynamic from "next/dynamic";

const ClientPage = dynamic(
  () => import("../components/ClientPage").then((mod) => mod.ClientPage),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-xl mx-auto mb-4">
            🪙
          </div>
          <p className="text-gray-400">Loading FogoUpDown...</p>
        </div>
      </div>
    ),
  }
);

export default function Home() {
  return <ClientPage />;
}
