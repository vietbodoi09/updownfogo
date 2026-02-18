import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import "../globals.css";

const ClientProvider = dynamic(
  () => import("../components/ClientProvider").then((mod) => mod.ClientProvider),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClientProvider>
      <Component {...pageProps} />
    </ClientProvider>
  );
}
