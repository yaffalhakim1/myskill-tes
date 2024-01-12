import "@/app/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "@/components/ui/sonner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />
      <Toaster richColors closeButton />
    </div>
  );
}
