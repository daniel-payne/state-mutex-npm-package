import isNothing from "../../../lib/esm/hooks/helpers/isNothing"

describe("isNothing", () => {
  it("should be there", () => {
    expect(isNothing).toBeDefined()
  })

  it("should idendifity no information", () => {
    expect(isNothing(undefined)).toBe(true)
    expect(isNothing(null)).toBe(true)
    expect(isNothing("")).toBe(true)
    expect(isNothing("   ")).toBe(true)
    expect(isNothing([])).toBe(true)
    expect(isNothing({})).toBe(true)

    expect(isNothing(1)).not.toBe(true)
    expect(isNothing("A")).not.toBe(true)
    expect(isNothing([1, 2, 3])).not.toBe(true)
    expect(isNothing({ hello: "world" })).not.toBe(true)

    expect(isNothing("[]")).toBe(true)
    expect(isNothing("{}")).toBe(true)

    expect(isNothing("''")).toBe(true)
    expect(isNothing('""')).toBe(true)
  })
})
