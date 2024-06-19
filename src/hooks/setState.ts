import { updateStore } from "./helpers/stateStore.js"

import type { StorageValue } from "./helpers/stateStore.js"

export function setState(name: string, value: StorageValue) {
  updateStore(name, value)
}
