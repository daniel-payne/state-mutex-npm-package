import { currentStore } from "./helpers/stateStore.js"

export function getStore() {
  return currentStore()
}
