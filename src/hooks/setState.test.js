import { setState } from "../../lib/esm/hooks/setState"

describe("setState", () => {
  it("should be there", () => {
    expect(setState).toBeDefined()
  })

  it("have a default value", () => {
    let data = setState("SET-NUMBER", 0, "N")

    expect(data).toBe(0)

    data = setState("SET-NUMBER", 1, "N")

    expect(data).toBe(1)
  })
})
