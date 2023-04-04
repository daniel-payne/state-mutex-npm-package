export default function mapToString(value: Map<string, string>): string {
  const result: Array<string> = []

  value.forEach((value, key) => result.push(key + "=" + value))

  return result.join(",")
}
