import { getStore } from "../../lib/esm/hooks/getStore"
import { setState } from "../../lib/esm/hooks/setState"

describe("setState", () => {
  it("should be there", () => {
    expect(getStore).toBeDefined()
  })

  it("have a default value", () => {
    setState("STORE-NUMBER", 1, "N")

    const data = getStore()

    expect(data.values["STORE-NUMBER"]).toBe(1)
  })
})

describe("setState local", () => {
  it("should be there", () => {
    expect(getStore).toBeDefined()
  })

  it("have a default value", () => {
    setState("STORE-NUMBER-LOCAL", 1, "L")

    const data = getStore()

    expect(data.values["STORE-NUMBER-LOCAL"]).toBe(1)

    expect(data.defaultLocals["STORE-NUMBER-LOCAL"]).toBe(1)
  })
})
