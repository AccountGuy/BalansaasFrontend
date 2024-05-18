export const partialHide = (content: string): string =>
  content.slice(0, 3) + '•'.repeat(content.length - 3)
