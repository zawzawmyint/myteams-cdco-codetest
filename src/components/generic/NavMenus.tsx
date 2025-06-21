"use client";

import Link from "next/link";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string }[] = [
  {
    title: "Players",
    href: "/",
  },
  {
    title: "Teams",
    href: "/teams",
  },
];

export function NavMenus() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        {components.map((nav) => (
          <NavigationMenuItem key={nav.title}>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href={nav.href}>{nav.title}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
