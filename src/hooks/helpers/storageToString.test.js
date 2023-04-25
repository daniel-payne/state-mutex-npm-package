import storageToString from "../../../lib/esm/hooks/helpers/storageToString"

describe("storageToString", () => {
  it("should not pass empty information", () => {
    expect(storageToString(undefined)).toBeUndefined()
    expect(storageToString(null)).toBeUndefined()

    expect(storageToString("")).not.toBeUndefined()
    expect(storageToString([])).not.toBeUndefined()
    expect(storageToString({})).not.toBeUndefined()

    expect(storageToString(1)).not.toBeUndefined()
    expect(storageToString("A")).not.toBeUndefined()
    expect(storageToString([1, 2, 3])).not.toBeUndefined()
    expect(storageToString({ hello: "world" })).not.toBeUndefined()
  })

  it("should correctly represent the value", () => {
 
    expect(storageToString("")).toBe('""')
    expect(storageToString([])).toBe('[]')
    expect(storageToString({})).toBe('{}')

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
