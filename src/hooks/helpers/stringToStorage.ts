import isEncodedArray from "./isEncodedArray.js"
import isEncodedObject from "./isEncodedObject.js"
import isNothing from "./isNothing.js"
import stringToSimpleType from "./stringToSimpleType.js"

import type { StorageValue } from "./stateStore.js"

export default function stringToStorage(value: string | null | undefined): StorageValue | undefined {
  if (value == null) {
    return undefined
  }

  try {
    if (isEncodedArray(value)) {
      const asString = value?.toString() ?? "[]"

      if (asString === "[]") {
        return []
      }

      const asObject = JSON.parse(asString)

      return asObject
    }

    if (isEncodedObject(value)) {
      const asString = value?.toString() ?? "{}"

      if (asString === "{}") {
        return {}
      }

      const asObject = JSON.parse(asString)

      return asObject
    }

    const asSimpleString = stringToSimpleType(value)

    return asSimpleString
  } catch (error) {
    // console.log(error)

    return value?.toString()
  }
}
