import { renderHook, act } from "@testing-library/react"

import { useHashState } from "../../lib/esm/hooks/useHashState"

const VALUE = 0
const SET = 1

describe("useSharedState", () => {
  it("have a default value", () => {
    const { result: hook } = renderHook(() => useHashState("TEST-1", 1))

    expect(hook.current[VALUE]).toBe(1)
  })

  it("be updatable", () => {
    const { result: hook } = renderHook(() => useHashState("TEST-2", 1))

    expect(hook.current[VALUE]).toBe(1)

    act(() => {
      hook.current[SET](2)
    })

    expect(hook.current[VALUE]).toBe(2)
  })

  it("be shared updatable", () => {
    const { result: hook1 } = renderHook(() => useHashState("TEST-3", 1))
    const { result: hook2 } = renderHook(() => useHashState("TEST-3", 1))

    expect(hook1.current[VALUE]).toBe(1)
    expect(hook2.current[VALUE]).toBe(1)

    act(() => {
      hook1.current[SET](3)
    })

    expect(hook1.current[VALUE]).toBe(3)
    expect(hook2.current[VALUE]).toBe(3)
  })
})
