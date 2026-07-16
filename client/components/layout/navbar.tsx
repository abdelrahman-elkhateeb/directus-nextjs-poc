"use client";

import Link from "next/link";
import { Menu, ShoppingBag, Utensils } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Offers", href: "/offers" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Utensils className="size-5" />
          </span>

          <span className="text-xl font-bold">Foodie</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={buttonVariants({ variant: "ghost" })}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/menu"
          className={cn(
            buttonVariants({ variant: "default" }),
            "hidden md:inline-flex",
          )}
        >
          <ShoppingBag data-icon="inline-start" className="size-4" />
          Order now
        </Link>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Open navigation menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Utensils className="size-5 text-primary" />
                  Foodie
                </SheetTitle>

                <SheetDescription>
                  Explore our menu and special offers.
                </SheetDescription>
              </SheetHeader>

              <Separator className="my-5" />

              <div className="flex flex-col gap-2">
                {navigationLinks.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={
                      <Link
                        href={link.href}
                        className={cn(
                          buttonVariants({ variant: "ghost" }),
                          "w-full justify-start",
                        )}
                      />
                    }
                  >
                    {link.label}
                  </SheetClose>
                ))}
              </div>

              <Separator className="my-5" />

              <SheetClose
                render={
                  <Link
                    href="/menu"
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "w-full",
                    )}
                  />
                }
              >
                <ShoppingBag data-icon="inline-start" className="size-4" />
                Order now
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}