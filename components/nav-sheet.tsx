import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./mode-toggle";
import { Separator } from "./ui/separator";
import Link from "next/link";
import AuthButton from "./auth-button.server";

export default function NavSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-8 w-8" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-52">
        <menu className="flex h-full flex-col gap-4 pt-4">
          <li>
            <SheetClose asChild>
              <Link href="/">Home</Link>
            </SheetClose>
          </li>
          <li>
            <SheetClose asChild>
              <Link href="/calculator">Calculator</Link>
            </SheetClose>
          </li>
          <li>
            <SheetClose asChild>
              <Link href="/about">About</Link>
            </SheetClose>
          </li>
          <Separator />
          <li className="flex items-center justify-between">
            <span>Theme</span> <ModeToggle />
          </li>
          <li className="mt-auto">
            <AuthButton />
          </li>
        </menu>
      </SheetContent>
    </Sheet>
  );
}
