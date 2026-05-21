import { useCallback, useEffect, useRef } from "react"

import { useLocalState } from "./useLocalState.js"

import type { StorageValue } from "./helpers/stateStore.js"

type Action = (data: StorageValue) => any

type Message = {
  timestamp: number
  data: any
}

export function useSharedBroadcast<T extends StorageValue>(key: string): any {
  const timestampRef = useRef<number | undefined>()
  const action = useRef<Action | undefined>()

  const [message, setMessage] = useLocalState<Message | undefined>(key)

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const subscribe = useCallback((call: Action) => {
    action.current = call
  }, [])
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const unsubscribe = useCallback((call: Action) => {
    action.current = undefined
  }, [])
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const publish = useCallback(
    (value: any) => {
      timestampRef.current = Date.now()

      setMessage({
        timestamp: timestampRef.current,
        data: value,
      })
    },
    [setMessage]
  )
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (!message) return

    if ((timestampRef?.current ?? 0) < message.timestamp) {
      timestampRef.current = message.timestamp

      if (action.current != null) {
        action.current(message.data)
      }
    }
  }, [message])

  return { publish, subscribe, unsubscribe }
}
