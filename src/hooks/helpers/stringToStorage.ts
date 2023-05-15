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
      const asContentString = value
        ?.toString()
        .trim()
        .substring(1, value.length - 1)

      if (asContentString === "") {
        return []
      }

      const asContentArray = asContentString?.split(",")

      const asStorageArray = asContentArray?.map((item) => stringToStorage(item))

      // console.log('======================== ARRAY' )
      // console.log('value ', value)
      // console.log('asContentString ', asContentString)
      // console.log('asContentArray ', asContentArray)
      // console.log('asStorageArray ', asStorageArray)

      return asStorageArray as StorageValue | undefined
    }

    if (isEncodedObject(value)) {
      const asString = value?.toString() ?? "{}"

      if (asString === "{}") {
        return {}
      }

      const asObject = JSON.parse(asString)

      // console.log('======================== OBJECT' )
      // console.log('value ', value)
      // console.log('asString ', asString)
      // console.log('asObject ', asObject)

      return asObject
    }

    const asSimpleString = stringToSimpleType(value)

    // console.log('======================== OBJECT' )
    // console.log('value ', value)
    // console.log('asSimpleString ', asSimpleString)

    return asSimpleString
  } catch (error) {
    // console.log(error)

    return value?.toString()
  }
}
