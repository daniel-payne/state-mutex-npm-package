import { useStoredState } from "./useStoredState.js";

import { StoragePersistence } from "./helpers/stateStore.js";

import type { Dispatch } from "react";

import type { StorageValue } from "./helpers/stateStore.js";

export function useQueryState<T extends StorageValue>(
  key: string,
  defaultValue?: T
): [T, Dispatch<T>] {
  const defaultVal = defaultValue ?? (undefined as T);

  const [value, setValue] = useStoredState<T>(
    key,
    defaultVal,
    StoragePersistence.query
  );

  return [value, setValue];
}
