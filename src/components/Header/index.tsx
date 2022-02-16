import Image from "next/image";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart/react";
import logo from "~/assets/images/kaffedyret_icon_rounded.svg";
import { Kaffedyret } from "../Kaffedyret";
import { MobileNav } from "./MobileNav";
import { Nav } from "./Nav";
import { CartButton } from "./Nav/CartButton";

export function Header() {
  const { cartCount } = useShoppingCart();
  const isCartNotEmpty = cartCount > 0;

  return (
    <header className="sticky top-0 bg-white drop-shadow-lg z-50">
      <div className="relative">
        <nav
          className="container-narrow grid grid-cols-3 md:grid-cols-header gap-4 py-2 px-2"
          role="navigation"
        >
          <div className="md:hidden">
            <MobileNav />
          </div>

          <div className="flex justify-center items-center hover:drop-shadow-lg transition-all will-change-transform  ease-in-out duration-200 hover:scale-105">
            <Link href="/">
              <a className="flex items-center gap-8">
                <Image
                  className="w-12 h-12"
                  src={logo}
                  alt="Kaffedyret logo"
                  title="Kaffedyret"
                  width={48}
                  height={48}
                />

                <Kaffedyret className="hidden md:block text-3xl" />
              </a>
            </Link>
          </div>

          <div className="hidden md:flex justify-center items-center">
            <Nav />
          </div>

          <div className="flex justify-end md:justify-center items-center -my-2">
            <CartButton isNotEmpty={isCartNotEmpty} />
          </div>
        </nav>
      </div>
    </header>
  );
}
