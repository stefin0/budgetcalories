import Link from "next/link";
import Logo from "./logo";
import NavSheet from "./nav-sheet";
import NavList from "./nav-list";
import AuthButton from "./auth-button.server";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
  );
}
