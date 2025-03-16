'use client';
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link"; // Corrected import
import { sidebarLinks } from "../constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={38}
            height={38}
            alt="menu"
            className="cursor-pointer sm:hidden "
          />
        </SheetTrigger>

        {/* Sidebar Content */}
        <SheetContent
          side="left"
          className="flex flex-col gap-1 w-[270px] bg-dark-1 text-white"
        >
          {/* Accessibility: Sheet Title */}
          <SheetHeader>
            <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
          </SheetHeader>
          <SheetClose asChild>
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image
                src="/icons/logo.svg"
                alt="logo"
                width={32}
                height={32}
                className="max-sm:size-10"
              />
              <p className="text-[26px] font-extrabold">Yoom</p>
            </div>
          </Link>
          </SheetClose>
          {/* Sidebar Links */}
          <div className="flex h-full flex-col gap-6 pt-10 text-white">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.route;
              return (
                <SheetClose asChild key={link.label}>
                  <Link
                    href={link.route}
                    className={cn(
                      "flex gap-4 rounded items-center p-3 max-w-60 transition-colors duration-200",
                      {
                        "bg-blue-500": isActive,
                      }
                    )}
                  >
                    <Image
                      src={link.imgUrl}
                      alt={link.label}
                      width={20}
                      height={20}
                    />
                    <p className="font-semibold">{link.label}</p>
                  </Link>
                </SheetClose>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
