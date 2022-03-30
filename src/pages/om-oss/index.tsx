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
            Her kommer litt tekst om vi som driver <Kaffedyret />.
          </p>
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
