export function formatYen(n: number): string {
  return `¥${n.toLocaleString()}`;
}

export function formatYenDiff(n: number): string {
  if (n === 0) return "±¥0";
  const sign = n > 0 ? "+" : "-";
  return `${sign}¥${Math.abs(n).toLocaleString()}`;
}
