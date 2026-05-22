/** Split full name or phrase into display lines for editorial hero typography */
export function splitNameLines(name: string): string[] {
  return name.trim().split(/\s+/);
}
