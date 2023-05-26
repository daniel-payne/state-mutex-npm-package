import { useEffect, useState } from "react"

import { subscribeStore, unsubscribe, clearStore, currentStore } from "./helpers/stateStore.js"

import type { StorageValue } from "./helpers/stateStore.js"

export type ParametersType = { search?: string | undefined; hash?: string | undefined; text?: string | undefined }

const calculateParameters = (store: StorageValue) => {
  const newParameters: ParametersType = {}

  const { defaultQueries, defaultHashes, initialQueries, initialHashes, values } = store as Record<string, any>

  let search = ""
  let hash = ""
  let text = ""

  for (const name in defaultQueries) {
    const defaultQuery = defaultQueries[name]
    const initialQuery = initialQueries[name]
    const currentQuery = values[name]

    if (currentQuery || defaultQuery || initialQuery) {
      search += `${name}=${currentQuery ?? defaultQuery ?? initialQuery}`
    }
  }

  for (const name in defaultHashes) {
    const defaultHash = defaultHashes[name]
    const initialHash = initialHashes[name]
    const currentHash = values[name]

    if (currentHash || defaultHash || initialHash) {
      hash += `${name}=${currentHash ?? defaultHash ?? initialHash}`
    }
  }

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
