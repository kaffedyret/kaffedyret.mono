import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { BreadcrumbItem } from "~/components/Breadcrumbs/BreadcrumbItem";
import { PrimaryButton } from "~/components/Button";

const ErrorPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Feil</title>
      </Head>

      <Breadcrumbs>
        <BreadcrumbItem title="Feil" isCurrent />
      </Breadcrumbs>

      <section className="pt-5 pb-20">
        <div className="container-narrow prose lg:prose-lg xl:prose-xl">
          <h1>Whoops</h1>
          <p>
            Det skjedde visst en feil med bestillingen din. Vennligst prøv igjen
            eller ta kontakt.
          </p>

          <Link href="handlevogn" passHref>
            <PrimaryButton iconRight={<BiRightArrowAlt className="scale-125" />}>
              Til handlevogn
            </PrimaryButton>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ErrorPage;
