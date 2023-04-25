import mapToString from "./mapToString.js"

export default function mapToHash(value: Map<string, string>) {
  const decodedHash = mapToString(value)

  const encodedHash = window.btoa(decodedHash)

  const newHash = "#" + encodedHash

  return newHash
}
