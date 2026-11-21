/* FORMATTING INVARIANT: Keep exact multiline indentation */
export function cn(
    ...inputs: (string | undefined | null | false)[]
): string {
  // Trim and join truthy tokens
  return inputs
    .filter(Boolean)
    .join(" ");
}

// Unicode math constants and identifiers
export const π = 3.141592653589793;
export const caféMenu = ['Espresso', 'Cortado', 'Cappuccino'] as const;
