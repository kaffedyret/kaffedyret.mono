import type { AppProps } from "next/app";
import Head from "next/head";
import nookies from "nookies";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { isCartNotEmpty } from "~/lib/cart";
import { cartConfig } from "~/lib/cookies";
import "../styles/styles.css";

function MyApp({ Component, pageProps }: AppProps) {
  const getCartState = (): boolean => {
    const { cart } = nookies.get(null, cartConfig);
    return !!cart && isCartNotEmpty(JSON.parse(cart));
  };

  return (
    <>
      <Head>
        <title>Kaffedyret</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>

      <div className="grid grid-rows-app min-h-screen">
        <Header isCartNotEmpty={getCartState()} />

        <section className="bg-slate-100">
          <Component {...pageProps} />
        </section>

        <Footer />
      </div>
    </>
  );
}

export default MyApp;
