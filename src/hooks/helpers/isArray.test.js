import isArray from "../../../lib/esm/hooks/helpers/isArray"

describe("isArray", () => {
  it("should be there", () => {
    expect(isArray).toBeDefined()
  })

  it("should idendifity arrays", () => {
    expect(isArray(undefined)).not.toBe(true)
    expect(isArray(null)).not.toBe(true)
    expect(isArray("")).not.toBe(true)
    expect(isArray("   ")).not.toBe(true)
    expect(isArray([])).toBe(true)
    expect(isArray({})).not.toBe(true)

    expect(isArray(1)).not.toBe(true)
    expect(isArray("A")).not.toBe(true)
    expect(isArray([1, 2, 3])).toBe(true)
    expect(isArray({ hello: "world" })).not.toBe(true)
  })
})
