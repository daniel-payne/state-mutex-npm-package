import { useEffect, useState } from "react"

import { subscribeStore, unsubscribe, clearStore, currentStore } from "./helpers/stateStore.js"

import type { StorageValue } from "./helpers/stateStore.js"

export type StoreType = { store: StorageValue; actions: { clearStore: () => void } }

export function useStore(): StoreType {
  const [store, setStore] = useState<StorageValue>(currentStore())

  const clearStore = () => {
    setStore({})
  }

  // Set Defaults /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const updater = (value: StorageValue) => {
      setStore(value)
    }

    subscribeStore(updater)

    return () => {
      unsubscribe(updater)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { store, actions: { clearStore } }
}
