import { act } from "react"
import { renderHook } from "@testing-library/react"

import { useSharedState } from "../../lib/esm/hooks/useSharedState"

const VALUE = 0
const SET = 1

describe("useSharedState", () => {
  it("have a default value", () => {
    const { result: hook } = renderHook(() => useSharedState("SHARED-TEST-1", 1))

    expect(hook.current[VALUE]).toBe(1)
  })

  it("be updatable", () => {
    const { result: hook } = renderHook(() => useSharedState("SHARED-TEST-2", 1))

    expect(hook.current[VALUE]).toBe(1)

    act(() => {
      hook.current[SET](2)
    })

    expect(hook.current[VALUE]).toBe(2)
  })

  it("be shared updatable", () => {
    const { result: hook1 } = renderHook(() => useSharedState("SHARED-TEST-3", 1))
    const { result: hook2 } = renderHook(() => useSharedState("SHARED-TEST-3", 1))

    expect(hook1.current[VALUE]).toBe(1)
    expect(hook2.current[VALUE]).toBe(1)

    act(() => {
      hook1.current[SET](3)
    })

    expect(hook1.current[VALUE]).toBe(3)
    expect(hook2.current[VALUE]).toBe(3)
  })

  it("be able to save and restore a string", () => {
    const testValue = "1"

    const { result: hook1 } = renderHook(() => useSharedState("SHARED-TEST-STRING", testValue))
    const { result: hook2 } = renderHook(() => useSharedState("SHARED-TEST-STRING", testValue))

    expect(hook1.current[VALUE]).toBe(testValue)
    expect(hook2.current[VALUE]).toBe(testValue)
  })

  it("be able to save and restore a number", () => {
    const testValue = 100

    const { result: hook1 } = renderHook(() => useSharedState("SHARED-TEST-NUMBER", testValue))
    const { result: hook2 } = renderHook(() => useSharedState("SHARED-TEST-NUMBER", testValue))

    expect(hook1.current[VALUE]).toBe(testValue)
    expect(hook2.current[VALUE]).toBe(testValue)
  })

  it("be able to save and restore a boolean", () => {
    const testValue = true

    const { result: hook1 } = renderHook(() => useSharedState("SHARED-TEST-BOOLEAN", testValue))
    const { result: hook2 } = renderHook(() => useSharedState("SHARED-TEST-BOOLEAN", testValue))

    expect(hook1.current[VALUE]).toBe(testValue)
    expect(hook2.current[VALUE]).toBe(testValue)
  })

  it("be able to save and restore a array of items", () => {
    const testValue = ["1", 2, true, false]

    const { result: hook1 } = renderHook(() => useSharedState("SHARED-TEST-ARRAY", testValue))
    const { result: hook2 } = renderHook(() => useSharedState("SHARED-TEST-ARRAY", testValue))

    expect(hook1.current[VALUE]).toStrictEqual(testValue)
    expect(hook2.current[VALUE]).toStrictEqual(testValue)
  })

  it("be able to save and restore a object of items", () => {
    const testValue = { one: "1", two: 2, three: true, four: false }
    const testNew = { one: 1, two: "2", three: [true, false] }

    const { result: hook1 } = renderHook(() => useSharedState("TEST-OBJECT", testValue))
    const { result: hook2 } = renderHook(() => useSharedState("TEST-OBJECT", testValue))

    expect(hook1.current[VALUE]).toStrictEqual(testValue)
    expect(hook2.current[VALUE]).toStrictEqual(testValue)

    act(() => {
      hook1.current[SET](testNew)
    })

    expect(hook1.current[VALUE]).toStrictEqual(testNew)
    expect(hook2.current[VALUE]).toStrictEqual(testNew)
  })
})
