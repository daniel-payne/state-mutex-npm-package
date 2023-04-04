import isArray from "./isArray.js"
import isObject from "./isObject.js"

export default function isNothing(value: any): boolean {
  if (value == null || value.toString().trim() === "") {
    return true
  }

  if (value.toString().trim() === "''" || value.toString().trim() === '""' || value.toString().trim() === "[]" || value.toString().trim() === "{}") {
    return true
  }

  if (isArray(value)) {
    return value.length === 0
  }

  if (isObject(value)) {
    return Object.keys(value).length === 0
  }

  return false
}
