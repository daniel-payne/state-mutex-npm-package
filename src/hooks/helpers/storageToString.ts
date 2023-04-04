import isNothing from "./isNothing.js"

import type { StorageValue } from "./stateStore.js"

export default function storageToString(value: StorageValue | null | undefined): string | undefined {
  if (isNothing(value)) {
    return undefined
  }

  return JSON.stringify(value)
}
