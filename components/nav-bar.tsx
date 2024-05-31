import Link from "next/link";
import Logo from "./logo";
import { Separator } from "./ui/separator";
import { NavSheet } from "./nav-sheet";
import NavList from "./nav-list";

export default function Navbar() {
  return (
    <>
      <nav className="flex items-center justify-between p-4">
        <Link href="/">
          <Logo />
        </Link>
        <NavSheet />
        <NavList />
      </nav>
      <Separator />
    </>
  );
}
