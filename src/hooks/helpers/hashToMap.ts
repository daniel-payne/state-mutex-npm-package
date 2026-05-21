import stringToMap from "./stringToMap.js"

export default function hashToMap(value: string) {
  if (value == null || value?.trim().length === 0) {
    return new Map()
  }

  const hash = value[0] === '#' ? value.substring(1) : value 

  const decodedHash = window.atob(hash)

  const newParams = stringToMap(decodedHash)

  return newParams
}
