import { Breadcrumbs } from "~/components/Breadcrumbs";
import { BreadcrumbItem } from "~/components/Breadcrumbs/BreadcrumbItem";
import { Kaffedyret } from "~/components/Kaffedyret";

export default function Index() {
  return (
    <div>
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
      </section>
    </div>
  );
}
