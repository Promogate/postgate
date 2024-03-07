export function characterLimiter(text: string, limite: number): string {
  if (text.length > limite) {
    return text.slice(0, limite);
  }
  return text;
}