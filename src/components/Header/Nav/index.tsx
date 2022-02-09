import { NavItem } from "./NavItem";

interface Props {
  onNavClick?: (title: string, href: string) => void;
}

export function Nav(props: Props) {
  return (
    <ul className="grid py-6 md:py-0 md:grid-cols-3 md:h-full">
      <NavItem href="/" onClick={props.onNavClick} title="Hjem" />
      <NavItem href="/kaffe" onClick={props.onNavClick} title="Våre kaffer" />
      <NavItem href="/om-oss" onClick={props.onNavClick} title="Om oss" />
    </ul>
  );
}
