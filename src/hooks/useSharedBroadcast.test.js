import { renderHook, act } from "@testing-library/react"

import { useSharedBroadcast } from "../../lib/esm/hooks/useSharedBroadcast"

describe("useSharedState", () => {
  it("have three access functions", () => {
    const { result: hook } = renderHook(() => useSharedBroadcast("TEST-1"))

    const { publish, subscribe, unsubscribe } = hook.current

    expect(publish).toBeDefined()
    expect(subscribe).toBeDefined()
    expect(unsubscribe).toBeDefined()
  })

  it("trigger only other actions", () => {
    const action1 = jest.fn()
    const action2 = jest.fn()

    const { result: hook1 } = renderHook(() => useSharedBroadcast("TEST-2"))
    const { result: hook2 } = renderHook(() => useSharedBroadcast("TEST-2"))

    const { publish: publish1, subscribe: subscribe1, unsubscribe: unsubscribe1 } = hook1.current
    const { publish: publish2, subscribe: subscribe2, unsubscribe: unsubscribe2 } = hook2.current

    act(() => {
      subscribe1(action1)
      subscribe2(action2)
      publish1(1)
    })

    expect(action1).not.toHaveBeenCalled()
    expect(action2).toHaveBeenCalled()
  })
})
