import Link from "next/link";

interface Props {
  href?: string;
  isCurrent?: boolean;
  title: string;
}

export function BreadcrumbItem(props: Props) {
  return (
    <li className="breadcrumb-item">
      {!props.isCurrent && props.href ? (
        <Link href={props.href}>
          <a className="hover:underline">{props.title}</a>
        </Link>
      ) : (
        <span className="text-neutral-400">{props.title}</span>
      )}
    </li>
  );
}
