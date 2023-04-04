export default function stringToMap(value: string | undefined | null): Map<string, string> {
  const strings = value?.replace("#", "")

  if (strings == null || strings?.trim().length === 0) {
    return new Map()
  }

  const items = strings.split(",")

  const result = new Map()

  for (const item of items) {
    const [key, data] = item.split("=")

    result.set(key, data)
  }

  return result
}
