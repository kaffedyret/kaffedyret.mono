import Link from "next/link";
import logo from "../../assets/images/kaffedyret_icon_rounded.svg";
import { MobileNav } from "./MobileNav";
import { Nav } from "./Nav";
import { CartButton } from "./Nav/CartButton";

interface Props {
  isCartNotEmpty?: boolean;
}

export function Header(props: Props) {
  return (
    <header className="sticky top-0 bg-white drop-shadow-lg z-50">
      <div className="relative">
        <nav
          className="container-narrow grid grid-cols-3 md:grid-cols-header gap-4 md:gap-12 py-2 px-2"
          role="navigation"
        >
          <div className="md:hidden">
            <MobileNav />
          </div>

          <div className="flex justify-center items-center hover:drop-shadow-lg transition-all will-change-transform  ease-in-out duration-200 hover:scale-105">
            <Link href="/">
              <a>
                <img
                  className="w-12 h-12"
                  src={logo}
                  alt="Kaffedyret logo"
                  title="Kaffedyret"
                />
              </a>
            </Link>
          </div>

          <div className="hidden md:flex justify-center items-center">
            <Nav />
          </div>

          <div className="flex justify-end md:justify-center items-center -my-2">
            <CartButton isNotEmpty={props.isCartNotEmpty} />
          </div>
        </nav>
      </div>
    </header>
  );
}
