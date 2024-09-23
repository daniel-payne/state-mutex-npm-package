import { getValue, hasValue, initializeStore, updateStore } from "./helpers/stateStore.js"

import { StoragePersistence } from "./helpers/stateStore.js"

import type { StorageValue, StoreKey } from "./helpers/stateStore.js"

export function setState(key: StoreKey, value: StorageValue, persistence: StoragePersistence = StoragePersistence.none) {
  const hasValueInStore = hasValue(key)

  if (hasValueInStore === true) {
    updateStore(key, value)
  } else {
    initializeStore(key, value, persistence)
  }

  return value
}
