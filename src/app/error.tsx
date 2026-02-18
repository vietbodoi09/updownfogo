'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-bold text-red-500 mb-2">Something went wrong!</h2>
        <p className="text-gray-400 mb-4">{error.message}</p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-primary rounded-lg text-white"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
