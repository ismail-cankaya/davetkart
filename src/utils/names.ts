/**
 * The invitation stores the hosts as a single display string ("Sophia & Elias").
 * The wizard edits them as two separate fields; these helpers convert between
 * the two shapes without losing a half-filled pair.
 */

export function splitNames(names: string): [string, string] {
  const separatorIndex = names.indexOf('&');
  if (separatorIndex === -1) return [names.trim(), ''];
  return [names.slice(0, separatorIndex).trim(), names.slice(separatorIndex + 1).trim()];
}

export function joinNames(first: string, second: string): string {
  const a = first.trim();
  const b = second.trim();
  if (a && b) return `${a} & ${b}`;
  return a || b;
}
