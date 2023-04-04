import isNothing from "./isNothing.js"

export default function isEncodedString(value: any): boolean {
  if (isNothing(value)) {
    return false
  }

  const asString = value?.toString().trim()

  if (asString.length <= 2) {
    return false
  }

  const firstChar = asString[0]
  const lastChar = asString[asString.length - 1]

  if (firstChar === '"' && lastChar === '"') {
    return true
  }

  return false
}
