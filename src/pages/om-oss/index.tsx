import {
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { BreadcrumbItem } from "~/components/Breadcrumbs/BreadcrumbItem";
import { Employee } from "~/components/Employee";
import { Kaffedyret } from "~/components/Kaffedyret";
import { employeesQuery } from "~/lib/sanity/queries";
import sanityClient from "~/lib/sanity/sanityClient";
import { Employee as IEmployee } from "~/models/schema.sanity";

interface Props {
  employees: IEmployee[];
}

const AboutPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props: Props) => {
  const { employees } = props;

  return (
    <div>
      <Head>
        <title>Om oss</title>
      </Head>

      <Breadcrumbs>
        <BreadcrumbItem title="Om oss" isCurrent />
      </Breadcrumbs>

      <section className="pt-5 pb-20">
        <div className="container-narrow prose lg:prose-lg xl:prose-xl">
          <h1>Om oss</h1>
          <p>
            <Kaffedyret /> ble startet av Christian som en personlig berettigelse for å kjøpe en flottere kaffebrenner enn den han hadde fra før. Litt etter litt vokste kundebasen og det som var et hobbyprosjekt ble til en sidejobb.
          </p>
          <p>Vi ønsker at spesialitetskaffe ikke skal være så skremmende dyrt og streber for å være et vennlig fjes i kaffeverdens møte med alle slags mennesker; både nybegynnere og entusiaster.</p>
        </div>

        <div className="container-narrow grid grid-cols-1 lg:grid-cols-2 gap-16">
          {employees.map((employee) => (
            <Employee employee={employee} key={employee._id} />
          ))}
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps = async (): Promise<
  GetServerSidePropsResult<Props>
> => {
  const employees = await sanityClient.fetch<IEmployee[]>(employeesQuery);

  return {
    props: { employees },
  };
};

export default AboutPage;
