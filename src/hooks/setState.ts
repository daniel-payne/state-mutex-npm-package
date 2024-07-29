import { getValue, initializeStore, updateStore } from "./helpers/stateStore.js"

import { StoragePersistence } from "./helpers/stateStore.js"

import type { StorageValue, StoreKey } from "./helpers/stateStore.js"

export function setState(key: StoreKey, value: StorageValue, storagePersistence: StoragePersistence = StoragePersistence.none) {
  const oldValue = getValue(key)

  if (value != null && oldValue == null) {
    initializeStore(key, value, storagePersistence)
    return
  }

  updateStore(key, value)
}
