import { act } from "react"
import { renderHook } from "@testing-library/react"

import { useQueryState } from "../../lib/esm/hooks/useQueryState"

const VALUE = 0
const SET = 1

describe("useSharedState", () => {
  it("have a default value", () => {
    const { result: hook } = renderHook(() => useQueryState("TEST-1", 1))

    expect(hook.current[VALUE]).toBe(1)
  })

  it("be updatable", () => {
    const { result: hook } = renderHook(() => useQueryState("TEST-2", 1))

    expect(hook.current[VALUE]).toBe(1)

    act(() => {
      hook.current[SET](2)
    })

    expect(hook.current[VALUE]).toBe(2)
  })

  it("be shared updatable", () => {
    const { result: hook1 } = renderHook(() => useQueryState("TEST-3", 1))
    const { result: hook2 } = renderHook(() => useQueryState("TEST-3", 1))

    expect(hook1.current[VALUE]).toBe(1)
    expect(hook2.current[VALUE]).toBe(1)

    act(() => {
      hook1.current[SET](3)
    })

    expect(hook1.current[VALUE]).toBe(3)
    expect(hook2.current[VALUE]).toBe(3)
  })
})
