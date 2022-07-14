import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { Provider as AlertProvider } from "react-alert";
import {
  alertOptions,
  AlertTemplate,
  containerStyle,
} from "~/components/AlertTemplate";
import { Cart } from "~/components/Cart";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { AdminFooter } from "~/features/admin/AdminFooter";
import { AdminHeader } from "~/features/admin/AdminHeader";
import { isInAdminPath } from "~/lib/admin";
import "../styles/styles.css";

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  return (
    <SessionProvider session={pageProps.session}>
      <AlertProvider
        containerStyle={containerStyle}
        template={AlertTemplate}
        {...alertOptions}
      >
        <Cart>
          <Head>
            <title>Kaffedyret</title>
            <meta
              name="viewport"
              content="width=device-width,initial-scale=1"
            />
          </Head>

          <div className="grid grid-rows-app min-h-screen">
            {isInAdminPath(pathname) ? <AdminHeader /> : <Header />}

            <section className="bg-slate-100">
              <Component {...pageProps} />
            </section>

            {isInAdminPath(pathname) ? <AdminFooter /> : <Footer />}
          </div>
        </Cart>
      </AlertProvider>
    </SessionProvider>
  );
}

export default MyApp;
