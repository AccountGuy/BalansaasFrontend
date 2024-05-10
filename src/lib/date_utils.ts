export const getDateRanges = (): number[] => {
  const currentYear = (new Date).getFullYear()
  return range(currentYear - 5, currentYear);
}

const range = (start: number, end: number) => {
  return Array(end - start + 1).fill(start).map((value, index) => value + index)
}