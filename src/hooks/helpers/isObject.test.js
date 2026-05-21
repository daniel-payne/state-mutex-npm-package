import isObject from "../../../lib/esm/hooks/helpers/isObject"

describe("isObject", () => {
  it("should be there", () => {
    expect(isObject).toBeDefined()
  })

  it("should idendifity objects", () => {
    expect(isObject(undefined)).not.toBe(true)
    expect(isObject(null)).not.toBe(true)
    expect(isObject("")).not.toBe(true)
    expect(isObject("   ")).not.toBe(true)
    expect(isObject([])).not.toBe(true)
    expect(isObject({})).toBe(true)

    expect(isObject(1)).not.toBe(true)
    expect(isObject("A")).not.toBe(true)
    expect(isObject([1, 2, 3])).not.toBe(true)
    expect(isObject({ hello: "world" })).toBe(true)
  })
})
