import { act } from "react"
import { renderHook } from "@testing-library/react"

import { useStore } from "./useStore"
import { useStoredState } from "./useStoredState"
import { clearStore } from "./helpers/stateStore"

describe("useStore", () => {
  beforeEach(() => {
    clearStore()
  })

  it("should track values in the global store", () => {
    const { result: stateHook } = renderHook(() => useStoredState("store_test_key", "initial_val"))
    const { result: storeHook } = renderHook(() => useStore())

    expect(storeHook.current.store.values["store_test_key"]).toBe("initial_val")

    act(() => {
      stateHook.current[1]("updated_val")
    })

    expect(storeHook.current.store.values["store_test_key"]).toBe("updated_val")
  })

  it("should clear the store when actions.clearStore is called", () => {
    const { result: stateHook } = renderHook(() => useStoredState("store_test_key_2", "initial_val_2"))
    const { result: storeHook } = renderHook(() => useStore())

    expect(storeHook.current.store.values["store_test_key_2"]).toBe("initial_val_2")

    act(() => {
      storeHook.current.actions.clearStore()
    })

    // Once cleared, values should be empty or reset to defaults
    expect(storeHook.current.store.values["store_test_key_2"]).toBeUndefined()
  })
})
