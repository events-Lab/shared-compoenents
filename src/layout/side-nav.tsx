"use client";

import { usePathname } from "next/navigation";
import { NavList, type NavItem } from "./nav-list";

export function SideNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  return <NavList items={items} activeHref={pathname} />;
}
