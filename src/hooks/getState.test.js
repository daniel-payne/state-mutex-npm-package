import { getState } from "../../lib/esm/hooks/getState"
import { setState } from "../../lib/esm/hooks/setState"

describe("setState", () => {
  it("should be there", () => {
    expect(getState).toBeDefined()
  })

  it("have a default value", () => {
    let data = getState("SET-NUMBER")

    expect(data).toBeNull()

    setState("SET-NUMBER", 1, "N")

    data = getState("SET-NUMBER")

    expect(data).toBe(1)
  })
})
