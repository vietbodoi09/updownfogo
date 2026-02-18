import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import '../globals.css';

// Lazy load Fogo Provider to avoid SSR issues
const FogoProvider = dynamic(
  () => import('@/components/FogoProvider').then(mod => mod.FogoProvider),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FogoProvider>
      <Component {...pageProps} />
    </FogoProvider>
  );
}
