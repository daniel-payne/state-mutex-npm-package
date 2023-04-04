import isEncodedString from "./isEncodedString.js"
import isNumeric from "./isNumeric.js"

import type { BaseStorage } from "./stateStore.js"

export default function stringToSimpleType(value: any): BaseStorage | undefined {
  if (value?.toLowerCase() === "true") {
    return true
  }
  if (value?.toLowerCase() === "false") {
    return false
  }

  if (isNumeric(value)) {
    return parseFloat(value)
  }

  if (isEncodedString(value)) {
    const asString = value
      ?.toString()
      .trim()
      .substring(1, value.length - 1)

    return asString
  }

  return value
}
