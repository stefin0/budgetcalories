"use client";

import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Home", href: "/" },
  { name: "Calculator", href: "/calculator" },
  { name: "About", href: "/about" },
];

export default function NavList() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <menu className="hidden items-center gap-4 md:flex">
      {links.map((link) => {
        return (
          <li key={link.name}>
            <Link
              href={link.href}
              className={clsx(
                "hover:underline",
                {
                  "text-foreground": pathname === link.href,
                },
                { "text-muted-foreground": pathname !== link.href },
              )}
            >
              {link.name}
            </Link>
          </li>
        );
      })}
      <li>
        <ModeToggle />
      </li>
      <li>
        <Button>Sign up</Button>
      </li>
      <li>
        <Button variant="secondary">Log in</Button>
      </li>
    </menu>
  );
}
