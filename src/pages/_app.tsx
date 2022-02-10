import "../styles/styles.css";
import type { AppProps } from "next/app";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="grid grid-rows-app min-h-screen">
      <Header isCartNotEmpty={true} />

      <section className="bg-slate-100">
        <Component {...pageProps} />
      </section>

      <Footer />
    </div>
  );
}

export default MyApp;
