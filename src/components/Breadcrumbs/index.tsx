import { BreadcrumbItem } from "./BreadcrumbItem";

interface Props {
  children: React.ReactNode;
}

export function Breadcrumbs(props: Props) {
  return (
    <div className="container-narrow py-5">
      <ul className="flex flex-wrap">
        <BreadcrumbItem href="/" title="Hjem" />
        {props.children}
      </ul>
    </div>
  );
}
