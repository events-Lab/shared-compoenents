export function parseMoney(label: string | undefined | null): number {
  if (!label) return 0;
  const amount = Number(label.replace(/,/g, "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(amount) ? amount : 0;
}

export function formatEgp(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  const negative = rounded < 0;
  const abs = Math.abs(rounded);
  const body = Number.isInteger(abs)
    ? abs.toLocaleString("en-US")
    : abs.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
  return negative ? `-EGP ${body}` : `EGP ${body}`;
}

export function toEgpLabel(
  label: string | undefined | null,
  fallback = "EGP 0",
): string {
  if (!label?.trim()) return fallback;
  return formatEgp(parseMoney(label));
}
