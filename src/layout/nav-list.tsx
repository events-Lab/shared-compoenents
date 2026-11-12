import Link from "next/link";
import { isNavActive } from "./is-nav-active";

export type NavItem = {
  href: string;
  label: string;
};

const linkClass =
  "block rounded-[10px] px-3 py-2.5 text-sm font-semibold text-inherit no-underline transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export function NavList({
  items,
  activeHref,
}: {
  items: NavItem[];
  activeHref: string | null;
}) {
  return (
    <ul className="m-0 flex list-none flex-col gap-1 p-0">
      {items.map((item) => {
        const active = isNavActive(item.href, activeHref);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={
                active
                  ? `${linkClass} bg-primary text-white shadow-[0_8px_16px_rgba(22,119,255,0.35)]`
                  : `${linkClass} hover:bg-white/10 hover:text-white`
              }
              aria-current={active ? "page" : undefined}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
