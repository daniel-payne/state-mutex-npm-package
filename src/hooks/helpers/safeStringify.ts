export default function safeStringify(input: any, indent:number = 0) {
  if (typeof input === "string" || input instanceof String) {
    return input
  }

  if (!isNaN(input)) {
    return input.toString()
  }

  if (typeof input === "boolean") {
    return input.toString()
  }

  const cache = new Set()

  return JSON.stringify(input, function (key, value) {
    if (typeof value === "object" && value !== null) {
      if (cache.has(value)) {
        // Circular reference found
        try {
          // If this value does not reference a parent it can be deduped
          return JSON.parse(JSON.stringify(value))
        } catch (err) {
          // discard key if value cannot be deduped
          return
        }
      }
      // Store value in our set
      cache.add(value)
    }
    return value
  }, indent)
}
