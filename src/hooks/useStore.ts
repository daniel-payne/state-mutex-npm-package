import { useEffect, useState } from "react"

import { subscribeStore, unsubscribe } from "./helpers/stateStore.js"

import type { StorageValue } from "./helpers/stateStore.js"

export function useStore(): [StorageValue] {
  const [value, setValue] = useState<StorageValue>(undefined)

  // Set Defaults /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const updater = (value: StorageValue) => {
      setValue(value)
    }

    subscribeStore(updater)

    return () => {
      unsubscribe(updater)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [value]
}
