import { act } from "react"
import { renderHook } from "@testing-library/react"

import { setState } from "../../lib/esm/hooks/setState"
import { useStoredState } from "../../lib/esm/hooks/useStoredState"
import { useDataState } from "../../lib/esm/hooks/useDataState"

describe("setState", () => {
  it("should be there", () => {
    expect(setState).toBeDefined()
  })

  it("have a default value", () => {
    renderHook(() => useStoredState("STORE-2", 1))

    const { result: hook } = renderHook(() => useDataState("STORE-2"))

    expect(hook.current).toBe(1)

    act(() => {
      setState("STORE-2", 2)
    })

    expect(hook.current).toBe(2)
  })
})
