import { getValue, hasValue } from "./helpers/stateStore.js"

import type { StoreKey } from "./helpers/stateStore.js"

export function getState(key: StoreKey) {
  const hasValueInStore = hasValue(key)
  const storeValue = getValue(key)

  if (hasValueInStore === true) {
    return storeValue
  } else {
    return null
  }
}
