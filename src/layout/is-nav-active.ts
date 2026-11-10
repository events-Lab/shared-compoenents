export function isNavActive(href: string, activeHref: string | null) {
  if (!activeHref) return false;
  if (href === "/") return activeHref === "/";
  return activeHref === href || activeHref.startsWith(`${href}/`);
}
