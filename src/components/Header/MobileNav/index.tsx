import classNames from "classnames";
import { useState } from "react";
import { Nav } from "../Nav";
import { Hamburger } from "./Hamburger";

export function MobileNav() {
  const [isOpen, setOpen] = useState(false);
  const handleHamburgerToggle = () => {
    setOpen((v) => !v);
  };

  const handleNavClick = (title: string, href: string) => {
    setOpen(false);
  };

  return (
    <>
      <Hamburger isOpen={isOpen} onClick={handleHamburgerToggle} />
      <div
        className={classNames(
          "absolute top-full left-0 -translate-x-full bg-neutral-200 w-screen h-screen transition-all",
          {
            "translate-x-0": isOpen,
          }
        )}
      >
        <Nav onNavClick={handleNavClick} />
      </div>
    </>
  );
}
