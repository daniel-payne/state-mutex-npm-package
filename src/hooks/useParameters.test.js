import { act } from "react"
import { renderHook } from "@testing-library/react"

import { useParameters } from "./useParameters"
import { useQueryState } from "./useQueryState"
import { useHashState } from "./useHashState"
import { clearStore } from "./helpers/stateStore"

describe("useParameters", () => {
  beforeEach(() => {
    clearStore()
  })

  it("should return correct parameters based on query and hash states", () => {
    const { result: queryHook } = renderHook(() => useQueryState("q1", "defaultQ"))
    const { result: hashHook } = renderHook(() => useHashState("h1", "defaultH"))
    const { result: paramsHook } = renderHook(() => useParameters())

    expect(paramsHook.current.search).toBe("q1=defaultQ")
    expect(paramsHook.current.hash).toBe(window.btoa("h1=defaultH"))
    expect(paramsHook.current.text).toBe(`?q1=defaultQ#${window.btoa("h1=defaultH")}`)

    act(() => {
      queryHook.current[1]("newQ")
      hashHook.current[1]("newH")
    })

    expect(paramsHook.current.search).toBe("q1=newQ")
    expect(paramsHook.current.hash).toBe(window.btoa("h1=newH"))
    expect(paramsHook.current.text).toBe(`?q1=newQ#${window.btoa("h1=newH")}`)
  })
})
