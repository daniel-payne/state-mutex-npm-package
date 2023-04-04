import storageToString from "../../../lib/esm/hooks/helpers/storageToString"

import isNothing from "../../../lib/esm/hooks/helpers/isNothing"
import isArray from "../../../lib/esm/hooks/helpers/isArray"
import isObject from "../../../lib/esm/hooks/helpers/isObject"

describe("isArray", () => {
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

describe("isObject", () => {
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

describe("isNothing", () => {
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

describe("storageToString", () => {
  it("should not pass empty information", () => {
    expect(storageToString(undefined)).toBeUndefined()
    expect(storageToString(null)).toBeUndefined()
    expect(storageToString("")).toBeUndefined()
    expect(storageToString("   ")).toBeUndefined()
    expect(storageToString([])).toBeUndefined()
    expect(storageToString({})).toBeUndefined()

    expect(storageToString(1)).not.toBeUndefined()
    expect(storageToString("A")).not.toBeUndefined()
    expect(storageToString([1, 2, 3])).not.toBeUndefined()
    expect(storageToString({ hello: "world" })).not.toBeUndefined()
  })

  it("should correctly represent the value", () => {
    expect(storageToString(undefined)).toBeUndefined()
    expect(storageToString(null)).toBeUndefined()
    expect(storageToString("")).toBeUndefined()
    expect(storageToString("   ")).toBeUndefined()
    expect(storageToString([])).toBeUndefined()
    expect(storageToString({})).toBeUndefined()

    expect(storageToString(1)).toBe("1")
    expect(storageToString("A")).toBe('"A"')
    expect(storageToString([1, 2, 3])).toBe("[1,2,3]")
    expect(storageToString(["A", "B", "C"])).toBe('["A","B","C"]')
    expect(storageToString({ hello: "world" })).toBe('{"hello":"world"}')
  })

  it("should correctly represent complex values", () => {
    expect(storageToString(1.0)).toBe("1")
    expect(storageToString(1.0001)).toBe("1.0001")
    expect(storageToString(10000000)).toBe("10000000")

    expect(storageToString("Alo Alo")).toBe('"Alo Alo"')
    expect(storageToString("Alo, Alo")).toBe('"Alo, Alo"')

    expect(
      storageToString(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fermentum accumsan eros. Duis lobortis neque lacus, in finibus magna blandit nec. "
      )
    ).toBe(
      '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fermentum accumsan eros. Duis lobortis neque lacus, in finibus magna blandit nec. "'
    )

    expect(storageToString([1, 2, 3, "A", "B", "CDEF", 'GH IJ, KL "MNO".'])).toBe(`[1,2,3,"A","B","CDEF","GH IJ, KL \\"MNO\\"."]`)

    const complexObject = {
      hello: "world",
      number: 1,
      bigNumber: 1000000,
      littleNumber: 0.0001,
      array: [1, 2, 3, "a", "b", "cde"],
      subObject: {
        hello: "world",
        number: 1,
        bigNumber: 1000000,
        littleNumber: 0.0001,
        array: [1, 2, 3, "a", "b", "cde"],
        subObject: {},
      },
    }

    const complexString =
      '{"hello":"world","number":1,"bigNumber":1000000,"littleNumber":0.0001,"array":[1,2,3,"a","b","cde"],"subObject":{"hello":"world","number":1,"bigNumber":1000000,"littleNumber":0.0001,"array":[1,2,3,"a","b","cde"],"subObject":{}}}'

    expect(storageToString(complexObject)).toBe(complexString)
  })
})
