import { act } from "react"
import { renderHook } from "@testing-library/react"

import { getState } from "../../lib/esm/hooks/getState"
import { useStoredState } from "../../lib/esm/hooks/useStoredState"
import { useDataState } from "../../lib/esm/hooks/useDataState"

describe("setState", () => {
  it("should be there", () => {
    expect(getState).toBeDefined()
  })

  it("have a default value", () => {
    renderHook(() => useStoredState("GET-2", 1))

    const { result: hook } = renderHook(() => useDataState("GET-2"))

    expect(hook.current).toBe(1)

    act(() => {
      const state = getState("GET-2")

      expect(state).toBe(1)
    })
  })
})
