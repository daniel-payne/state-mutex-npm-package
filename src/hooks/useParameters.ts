import { useEffect, useState } from "react"

import { subscribeStore, unsubscribe, clearStore, currentStore } from "./helpers/stateStore.js"

import type { StorageValue } from "./helpers/stateStore.js"

export type ParametersType = { search?: string | undefined; hash?: string | undefined; text?: string | undefined }

const calculateParameters = (store: StorageValue) => {
  const newParameters: ParametersType = {}

  const { defaultQueries, defaultHashes, initialQueries, initialHashes, values } = store as Record<string, any>

  const searchParams: string[] = []
  for (const name in defaultQueries) {
    const defaultQuery = defaultQueries[name]
    const initialQuery = initialQueries[name]
    const currentQuery = values[name]

    const val = currentQuery ?? defaultQuery ?? initialQuery
    if (val != null) {
      searchParams.push(`${name}=${val}`)
    }
  }
  const search = searchParams.join("&")

  const hashParams: string[] = []
  for (const name in defaultHashes) {
    const defaultHash = defaultHashes[name]
    const initialHash = initialHashes[name]
    const currentHash = values[name]

    const val = currentHash ?? defaultHash ?? initialHash
    if (val != null) {
      hashParams.push(`${name}=${val}`)
    }
  }
  const hash = hashParams.join("&&")

  let text = ""

  if (search.length) {
    newParameters.search = search
    text += "?" + search
  }

  if (hash.length) {
    newParameters.hash = window.btoa(hash)
    text += "#" + window.btoa(hash)
  }

  if (text.length) {
    newParameters.text = text
  }

  return newParameters
}

export function useParameters(): ParametersType {
  const [parameters, setParameters] = useState<ParametersType>(calculateParameters(currentStore()))

  // Set Defaults /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const updater = (value: StorageValue) => {
      setParameters(calculateParameters(value))
    }

    subscribeStore(updater)

    return () => {
      unsubscribe(updater)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return parameters
}
