import { useEffect, useState } from "react"

import { getValue, subscribe, unsubscribe } from "./helpers/stateStore.js"

import type { Dispatch } from "react"

import type { StorageValue } from "./helpers/stateStore.js"

export function useDataState<T extends StorageValue>(key: string): T | undefined {
  const [value, setValue] = useState<T | undefined>(undefined)

  // Set Defaults /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
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

  return value
}
