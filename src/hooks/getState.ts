import { getValue, initializeStore, updateStore } from "./helpers/stateStore.js"

import { StoragePersistence } from "./helpers/stateStore.js"

import type { StorageValue, StoreKey } from "./helpers/stateStore.js"

export function getState(key: StoreKey, defaultValue: StorageValue, storagePersistence: StoragePersistence = StoragePersistence.none) {
  const oldValue = getValue(key)

  if (defaultValue != null && oldValue == null) {
    initializeStore(key, defaultValue, storagePersistence)
    return defaultValue
  }

  return oldValue
}
