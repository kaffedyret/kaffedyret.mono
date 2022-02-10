import "../styles/styles.css";
import type { AppProps } from "next/app";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Kaffedyret</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>

      <div className="grid grid-rows-app min-h-screen">
        <Header isCartNotEmpty={true} />

        <section className="bg-slate-100">
          <Component {...pageProps} />
        </section>

        <Footer />
      </div>
    </>
  );
}

export default MyApp;
