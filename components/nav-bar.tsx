import Link from "next/link";
import Logo from "./logo";
import { Separator } from "./ui/separator";
import NavSheet from "./nav-sheet";
import NavList from "./nav-list";
import AuthButton from "./auth-button.server";

export default function Navbar() {
  return (
    <>
      <nav className="flex items-center justify-between p-4">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex flex-row-reverse items-center gap-4 md:flex-row">
          <NavSheet />
          <NavList />
          <div className="hidden md:block">
            <AuthButton />
          </div>
        </div>
      </nav>
      <Separator />
    </>
  );
}
