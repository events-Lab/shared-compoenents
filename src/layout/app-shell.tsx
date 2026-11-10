import { Suspense, type ReactNode } from "react";
import { NavList, type NavItem } from "./nav-list";
import { SideNav } from "./side-nav";

export type { NavItem };

export type AppShellProps = {
  product: string;
  area: string;
  nav: NavItem[];
  children: ReactNode;
};

export function AppShell({ product, area, nav, children }: AppShellProps) {
  return (
    <div className="relative flex min-h-screen overflow-x-hidden bg-primary-50 font-[inherit] text-secondary-900 max-[800px]:flex-col">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="float-orb absolute -top-24 left-56 size-72 rounded-full bg-primary-300/40 blur-3xl" />
        <div className="float-orb absolute top-1/3 -right-16 size-80 rounded-full bg-accent-300/35 blur-3xl [animation-delay:-2.5s]" />
      </div>
      <aside className="relative z-10 flex w-[248px] shrink-0 flex-col bg-primary-950 px-4 py-6 text-primary-200 max-[800px]:w-auto">
        <div className="flex items-center gap-3 px-2 pb-6">
          <span
            className="relative grid size-9 place-items-center rounded-[10px] bg-primary text-[13px] font-bold tracking-[0.04em] text-white shadow-[0_8px_18px_rgba(249,115,22,0.28)]"
            aria-hidden="true"
          >
            EL
            <span className="pulse-dot absolute -top-1 -right-1 size-2.5 rounded-full bg-accent ring-2 ring-primary-950" />
          </span>
          <span className="flex min-w-0 flex-col gap-0.5">
            <span className="text-sm font-semibold tracking-tight">{product}</span>
            <span className="text-xs text-secondary-400">{area}</span>
          </span>
        </div>
        <nav aria-label="Primary">
          <Suspense fallback={<NavList items={nav} activeHref={null} />}>
            <SideNav items={nav} />
          </Suspense>
        </nav>
        <p className="mt-auto px-2 pt-6 text-[11px] tracking-wide text-accent-200 max-[800px]:hidden">
          @events-lab/shared-components
        </p>
      </aside>
      <div className="relative z-10 min-w-0 flex-1 p-8 max-[800px]:p-5">{children}</div>
    </div>
  );
}
