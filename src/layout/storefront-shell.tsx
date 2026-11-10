import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { HeaderNav } from "./header-nav";
import type { NavItem } from "./nav-list";

export type StorefrontShellProps = {
  product: string;
  nav: NavItem[];
  children: ReactNode;
};

const utility = [
  { href: "/orders", label: "Orders" },
  { href: "/account", label: "Account" },
  { href: "/login", label: "Sign in" },
];

export function StorefrontShell({
  product,
  nav,
  children,
}: StorefrontShellProps) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-primary-50 text-secondary-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="float-orb absolute -top-24 -left-16 size-72 rounded-full bg-primary-300/45 blur-3xl" />
        <div className="float-orb absolute top-32 -right-20 size-80 rounded-full bg-accent-300/40 blur-3xl [animation-delay:-2.5s]" />
      </div>
      <header className="sticky top-0 z-40 border-b border-primary-100/80 bg-white/75 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-5 py-3.5">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <span
              className="relative grid size-9 place-items-center rounded-full bg-primary text-[12px] font-bold tracking-wide text-white shadow-[0_8px_18px_rgba(109,40,217,0.35)]"
              aria-hidden="true"
            >
              EL
              <span className="pulse-dot absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-accent ring-2 ring-white" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[17px] font-semibold tracking-tight text-secondary-950">
                {product}
              </span>
              <span className="text-[11px] font-medium tracking-[0.08em] text-secondary-500 uppercase">
                Padel
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="order-3 w-full md:order-none md:w-auto">
            <Suspense
              fallback={
                <ul className="m-0 flex list-none gap-1 p-0">
                  {nav.map((item) => (
                    <li key={item.href}>
                      <span className="inline-flex px-3.5 py-2 text-sm font-semibold text-secondary-500">
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              }
            >
              <HeaderNav items={nav} />
            </Suspense>
          </nav>

          <div className="ml-auto flex items-center gap-1">
            {utility.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm font-semibold text-secondary-700 no-underline transition duration-200 hover:bg-primary-100 hover:text-primary-800"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/cart"
              className="ml-1 inline-flex min-h-10 items-center rounded-full bg-accent px-4 text-sm font-semibold text-white no-underline shadow-[0_8px_18px_rgba(249,115,22,0.28)] transition duration-200 hover:-translate-y-0.5 hover:bg-accent-600"
            >
              Cart
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-5 py-8">
        {children}
      </main>

      <footer className="relative z-10 mt-8 bg-primary-950 text-primary-200">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-4 gap-4 px-5 py-6 text-sm max-[800px]:grid-cols-2">
          <FooterNote title="Fast booking" detail="Free and paid events" />
          <FooterNote title="Secure checkout" detail="Tickets and gear together" />
          <FooterNote title="Easy orders" detail="Track every purchase" />
          <FooterNote title="Club support" detail="Message the organizer" />
        </div>
      </footer>
    </div>
  );
}

function FooterNote({ title, detail }: { title: string; detail: string }) {
  return (
    <div>
      <p className="m-0 font-semibold text-white">{title}</p>
      <p className="m-0 mt-1 text-xs text-accent-200">{detail}</p>
    </div>
  );
}
