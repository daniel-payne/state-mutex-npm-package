import { useEffect, useState } from "react"

import { subscribeStore, unsubscribe, clearStore } from "./helpers/stateStore.js"

import type { StorageValue } from "./helpers/stateStore.js"

type ReturnType = { store: StorageValue, actions: { clearStore: ()=> void } } 

export function useStore(): ReturnType{
  const [store, setStore] = useState<StorageValue>(undefined)

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
