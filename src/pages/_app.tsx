import type { AppProps } from "next/app";
import Head from "next/head";
import { Cart } from "~/components/Cart";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import "../styles/styles.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Cart>
      <Head>
        <title>Kaffedyret</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>

      <div className="grid grid-rows-app min-h-screen">
        <Header />

        <section className="bg-slate-100">
          <Component {...pageProps} />
        </section>

        <Footer />
      </div>
    </Cart>
  );
}

export default MyApp;
