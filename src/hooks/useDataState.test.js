import { act } from "react"
import { renderHook } from "@testing-library/react"

import { useStoredState } from "../../lib/esm/hooks/useStoredState"
import { useDataState } from "../../lib/esm/hooks/useDataState"

const VALUE = 0
const SET = 1

describe("useDataState", () => {
  it("not to have a default value if uninitialized", () => {
    const { result: hook } = renderHook(() => useDataState("STORE-1"))

    expect(hook.current?.[VALUE]).toBeUndefined()
  })

  it("have a default value", () => {
    renderHook(() => useStoredState("STORE-2", 1))

    const { result: hook } = renderHook(() => useDataState("STORE-2"))

    expect(hook.current).toBe(1)
  })

  it("be updatable", () => {
    const { result: control } = renderHook(() => useStoredState("STORE-3", 1))

    const { result: hook } = renderHook(() => useDataState("STORE-3"))

    expect(hook.current).toBe(1)

    act(() => {
      control.current[SET](2)
    })

    expect(hook.current).toBe(2)
  })
})
