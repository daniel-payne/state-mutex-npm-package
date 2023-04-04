///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import isObject from "./isObject.js"
import isArray from "./isArray.js"
import stringToStorage from "./stringToStorage.js"
import stringToMap from "./stringToMap.js"
import storageToString from "./storageToString.js"
import mapToString from "./mapToString.js"
import safeStringify from "./safeStringify.js"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export type BaseStorage = string | number | boolean

export type ArrayStorage = Array<BaseStorage | RecordStorage>

export type RecordStorage = { [key: string]: BaseStorage | ArrayStorage | RecordStorage | null }

export type StorageValue = BaseStorage | ArrayStorage | RecordStorage | undefined | null

export type StoreKey = string

export enum StoragePersistence {
  none = "N",
  query = "Q",
  hash = "H",
  local = "L",
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Storage Variables
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
type ListnerAction = (value: StorageValue) => void

let logChanges = false

const values = new Map<StoreKey, StorageValue>()

// @ts-ignore
let listeners: Array<{ key?: StoreKey | undefined; reference: WeakRef<ListnerAction> }> = []

const defaultQueries = new Map<StoreKey, StorageValue>()
const defaultHashes = new Map<StoreKey, StorageValue>()
const defaultLocals = new Map<StoreKey, StorageValue>()

const isQueryKey = (key: StoreKey): boolean => {
  return defaultQueries.has(key)
}

const isHashKey = (key: StoreKey): boolean => {
  return defaultHashes.has(key)
}

const isLocalKey = (key: StoreKey): boolean => {
  return defaultLocals.has(key)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Loading Initilization
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function clearStore() {
  const currentUrl = new URL(document.URL)
  const currentPath = currentUrl.pathname

  values.clear()

  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    window.history.pushState({}, "", currentPath)
    window.location.hash = ""
  }

  if (typeof localStorage !== "undefined") {
    localStorage.clear()
  }

  defaultQueries.forEach((defaultValue: StorageValue, key: string) => {
    updateValues(key, defaultValue)
  })

  defaultHashes.forEach((defaultValue: StorageValue, key: string) => {
    updateValues(key, defaultValue)
  })

  defaultLocals.forEach((defaultValue: StorageValue, key: string) => {
    updateValues(key, defaultValue)
  })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Data Access for Hooks
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function getValue(key: StoreKey): StorageValue {
  return values.get(key)
}

export function initalizeStore(key: StoreKey, defaultValue: StorageValue, persistence: StoragePersistence) {
  if (persistence === StoragePersistence.hash && isHashKey(key) === false) {
    defaultHashes.set(key, defaultValue)
  } else if (persistence === StoragePersistence.query && isQueryKey(key) === false) {
    defaultQueries.set(key, defaultValue)
  } else if (persistence === StoragePersistence.local && isLocalKey(key) === false) {
    defaultLocals.set(key, defaultValue)
  }

  if (values.has(key) === false) {
    updateValues(key, defaultValue)
  }
}

export function updateStore(key: StoreKey, value: StorageValue) {
  updateValues(key, value)

  if (isHashKey(key)) {
    StoreHash(key, value)
  }
  if (isQueryKey(key)) {
    StoreQuery(key, value)
  }
  if (isLocalKey(key)) {
    StoreLocal(key, value)
  }
}

export function subscribe(key: StoreKey, action: ListnerAction) {
  // @ts-ignore
  const reference = new WeakRef(action)

  listeners.push({ key, reference })

  return () => unsubscribe(action)
}

export function subscribeStore(action: ListnerAction) {
  // @ts-ignore
  const reference = new WeakRef(action)

  listeners.push({ reference })

  return () => unsubscribe(action)
}

export function unsubscribe(listenerAction: ListnerAction) {
  listeners = listeners.filter((listner) => {
    const action = listner.reference.deref()

    if (action == null) {
      return false
    }

    return action !== listenerAction
  })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function updateValues(key: StoreKey, value: StorageValue) {
  const oldValue = values.get(key)

  let oldString: string | undefined
  let newString: string | undefined

  // let newValue: StorageValue

  if (isObject(oldValue) || isArray(oldValue)) {
    oldString = safeStringify(oldValue)
  } else {
    oldString = oldValue?.toString()
  }

  if (isObject(value) || isArray(value)) {
    newString = safeStringify(value)
  } else {
    newString = value?.toString()
  }

  const isDifferentValue = oldString !== newString

  if (isDifferentValue) {
    // if (isObject(value) || isArray(value)) {
    //   newValue = JSON.stringify(value)
    // } else {
    //   newValue = value
    // }

    values.set(key, value)

    listeners
      .filter((listner) => listner.key === key)
      .forEach((listner) => {
        const action = listner.reference.deref()

        if (action) {
          action(value)
        }
      })

    if (logChanges) {
      console.log(key, value)
    }
  }

  listeners
    .filter((listner) => listner.key === undefined)
    .forEach((listner) => {
      const action = listner.reference.deref()

      if (action) {
        action({
          values: Object.fromEntries(values),
          defaultQueries: Object.fromEntries(defaultQueries),
          defaultHashes: Object.fromEntries(defaultHashes),
          defaultLocals: Object.fromEntries(defaultLocals),
        } as StorageValue)
      }
    })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Query Persistence
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const loadQueries = (e: PopStateEvent) => {
  if (e.state) {
    if (e.state?.search) {
      let search = e.state.search

      const hashIndex = e.state.search.indexOf("#")

      if (hashIndex > -1) {
        search = e.state.search.substring(0, hashIndex)
      }

      const newParams = new URLSearchParams(search)

      newParams.forEach((data: string, key: string) => {
        const value = stringToStorage(data)

        updateValues(key, value)
      })

      defaultQueries.forEach((defaultValue: StorageValue, key: string) => {
        if (newParams.has(key) === false) {
          updateValues(key, defaultValue)
        }
      })
    } else {
      defaultQueries.forEach((defaultValue: StorageValue, key: string) => {
        updateValues(key, defaultValue)
      })
    }
  }
}

const StoreQuery = (key: string, value: StorageValue) => {
  if (typeof document !== "undefined") {
    const currentUrl = new URL(document.URL)
    const currentPath = currentUrl.pathname
    const currentParams = currentUrl.searchParams

    if (value == null) {
      currentParams.delete(key)
    } else {
      currentParams.set(key, value.toString())
    }

    const newSearch = currentParams.toString()

    window.history.pushState({ path: currentPath, search: newSearch }, "", currentPath + "?" + newSearch)
  }
}

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.addEventListener("popstate", loadQueries, true)

  const urlArray = document.URL.split("?")

  if (urlArray.length > 1) {
    // @ts-ignore
    loadQueries({ state: { search: urlArray[1] } } as HashChangeEvent)
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Hash Persistence
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const StoreHash = (key: string, value: StorageValue) => {
  if (typeof window !== "undefined") {
    const params = stringToMap(window.location.hash)

    const newString = storageToString(value)

    if (newString == null) {
      params.delete(key)
    } else {
      params.set(key, newString)
    }

    const newHash = "#" + mapToString(params)

    window.location.hash = newHash
  }
}

const loadHashes = (e: HashChangeEvent) => {
  if (e) {
    const newUrl = e.newURL

    const urlArray = newUrl.split("#")

    if (urlArray.length > 1) {
      const newHash = urlArray[1]

      const newParams = stringToMap(newHash)

      newParams.forEach((data: string, key: string) => {
        const value = stringToStorage(data)

        updateValues(key, value)
      })

      defaultHashes.forEach((defaultValue: StorageValue, key: string) => {
        if (newParams.has(key) === false) {
          updateValues(key, defaultValue)
        }
      })
    } else {
      defaultHashes.forEach((defaultValue: StorageValue, key: string) => {
        updateValues(key, defaultValue)
      })
    }
  }
}

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.addEventListener("hashchange", loadHashes, true)

  const urlArray = document.URL.split("#")

  if (urlArray.length > 1) {
    // @ts-ignore
    loadHashes({ newURL: document.URL } as HashChangeEvent)
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Local Persistence
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const StoreLocal = (key: string, value: StorageValue) => {
  if (typeof localStorage !== "undefined") {
    if (localStorage.getItem(key) !== value?.toString()) {
      const stringValue = storageToString(value)

      if (stringValue == null) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, stringValue)
      }
    }
  }
}

const loadLocal = (e: StorageEvent) => {
  const key = e.key

  if (key != null) {
    const newValue = stringToStorage(e.newValue)

    updateValues(key, newValue)
  }
}

if (typeof window !== "undefined" && typeof document !== "undefined" && typeof localStorage !== "undefined") {
  window.addEventListener("storage", loadLocal, true)

  for (let key in localStorage) {
    const newString = localStorage.getItem(key)
    const newValue = stringToStorage(newString)

    updateValues(key, newValue)
  }
}