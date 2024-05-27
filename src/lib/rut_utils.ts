export const validateChileanRUT = (rut: string): boolean => {
  const rutRegex = /^[0-9]+-[0-9kK]$/
  if (!rutRegex.test(rut)) {
    return false
  }

  const [body, verifier] = rut.split('-')
  const digits = body.split('').reverse().map(Number)
  let sum = 0
  let multiplier = 2

  for (let digit of digits) {
    sum += digit * multiplier
    multiplier = multiplier === 7 ? 2 : multiplier + 1
  }

  const remainder = sum % 11
  const checkDigit = remainder === 1 ? 'k' : remainder === 0 ? '0' : String(11 - remainder)
  return checkDigit === verifier.toLowerCase()
}
