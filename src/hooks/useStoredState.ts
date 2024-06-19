import { useCallback, useEffect, useState } from "react"

import { getValue, subscribe, unsubscribe, updateStore, initializeStore, StoragePersistence } from "./helpers/stateStore.js"

import type { Dispatch } from "react"

import type { StorageValue } from "./helpers/stateStore.js"

export function useStoredState<T extends StorageValue>(key: string, defaultValue: T, persistence: StoragePersistence): [T, Dispatch<T>] {
  const [value, setValue] = useState<T>(defaultValue)

  // Set Defaults /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    initializeStore(key, defaultValue, persistence)

    const value = getValue(key) as T

    setValue(value)

    const updater = (value: StorageValue) => {
      setValue(value as T)
    }

    subscribe(key, updater)

    return () => {
      unsubscribe(updater)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue])

  // Update Shared ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const sharedUpdate = useCallback(
    (value: T) => {
      setValue(value)
      updateStore(key, value)
    },
    [key]
  )

  return [value, sharedUpdate]
}
