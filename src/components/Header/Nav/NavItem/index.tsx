import classnames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  href: string;
  onClick?: (title: string, href: string) => void;
  title: string;
}

export function NavItem(props: Props): JSX.Element {
  const { pathname } = useRouter();
  const isActive =
    (props.href === "/" && pathname === "/") ||
    (props.href !== "/" && pathname.includes(props.href));

  const handleClick = () => {
    props.onClick && props.onClick(props.title, props.href);
  };

  return (
    <li className="md:-mt-2 md:-mb-2">
      <Link href={props.href}>
        <a
          className={classnames(
            "flex items-center justify-center h-full px-4 py-6 md:py-0 text-center border-b-2 border-transparent text-xl md:hover:border-blue-500",
            {
              "font-bold": isActive,
            }
          )}
          onClick={handleClick}
        >
          {props.title}
        </a>
      </Link>
    </li>
  );
}
