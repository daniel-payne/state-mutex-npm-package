import isEncodedArray from "./isEncodedArray.js"
import isEncodedObject from "./isEncodedObject.js"
import isNothing from "./isNothing.js"
import stringToSimpleType from "./stringToSimpleType.js"

import type { StorageValue } from "./stateStore.js"

export default function stringToStorage(value: string | null | undefined): StorageValue | undefined {
  if (isNothing(value)) {
    return undefined
  }

  try {
    if (isEncodedArray(value)) {
      //console.log('======================== ARRAY' )
      const asString = value
        ?.toString()
        .trim()
        .substring(1, value.length - 1)
      //console.log(asString)
      const asArray = asString?.split(",")
      //console.log(asArray)
      const asStorageArray = asArray?.map((item) => stringToSimpleType(item))
      //console.log(asStorageArray)
      //console.log('RETURNING ', asStorageArray)
      return asStorageArray as StorageValue | undefined
    }

    if (isEncodedObject(value)) {
      //console.log('======================== OBJECT' )
      const asString = value?.toString() ?? ""
      //console.log(asString)
      const asObject = JSON.parse(asString)
      //console.log(asObject)
      //console.log('RETURNING ', asObject)
      return asObject
    }

    //console.log('======================== SIMPLE' )
    const asSimpleString = stringToSimpleType(value)
    //console.log(asSimpleString)
    //console.log('RETURNING ', asSimpleString)
    return asSimpleString
  } catch (error) {
    console.log(error)

    return value?.toString()
  }
}
