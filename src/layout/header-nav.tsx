"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "./nav-list";
import { isNavActive } from "./is-nav-active";

export function HeaderNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <ul className="m-0 flex list-none flex-wrap items-center gap-1 p-0">
      {items.map((item) => {
        const active = isNavActive(item.href, pathname);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={
                active
                ? "inline-flex rounded-full bg-primary px-3.5 py-2 text-sm font-semibold text-white no-underline shadow-[0_6px_16px_rgba(22,119,255,0.35)] transition duration-200"
                : "inline-flex rounded-full px-3.5 py-2 text-sm font-semibold text-primary-100 no-underline transition duration-200 hover:bg-white/10 hover:text-white"
              }
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
