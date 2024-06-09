"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "@/lib/helpers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CircleUserRound, LogOut } from "lucide-react";

export default function AuthButton() {
  const session = useSession();

  return session?.data?.user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-12 w-full justify-start gap-2 pl-0 md:h-[40px] md:rounded-full md:p-0"
        >
          <Avatar>
            <AvatarImage
              src={session?.data?.user?.image as string}
              alt="Avatar image"
            />
            <AvatarFallback>
              <CircleUserRound />
            </AvatarFallback>
          </Avatar>
          <span className="md:hidden">{session?.data?.user?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <button
            onClick={async () => {
              await signOut();
              window.location.reload();
            }}
            className="flex items-center"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button onClick={async () => await signIn()} className="w-full">Sign In</Button>
  );
}
