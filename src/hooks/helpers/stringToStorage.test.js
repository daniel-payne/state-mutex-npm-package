import stringToStorage from "../../../lib/esm/hooks/helpers/stringToStorage"

describe("stringToStorage", () => {
  it("should parse strings", () => {
    expect(stringToStorage("yes")).toBe("yes")
    expect(stringToStorage("no")).toBe("no")
    expect(stringToStorage("one")).toBe("one")
    expect(stringToStorage("two THREE four")).toBe("two THREE four")
  })

  it("should parse numbers", () => {
    expect(stringToStorage("-1")).toBe(-1)
    expect(stringToStorage("0")).toBe(0)
    expect(stringToStorage("1")).toBe(1)
    expect(stringToStorage("1")).toBe(1)
    expect(stringToStorage("10")).toBe(10)
    expect(stringToStorage("100")).toBe(100)
    expect(stringToStorage("1000")).toBe(1000)
  })

  it("should parse booleans", () => {
    expect(stringToStorage("TRUE")).toBe(true)
    expect(stringToStorage("true")).toBe(true)
    expect(stringToStorage("FALSE")).toBe(false)
    expect(stringToStorage("false")).toBe(false)
  })

  it("should parse arrays", () => {
    expect(stringToStorage("[]")).toHaveLength(0)
    expect(stringToStorage("[1,2,3]")).toContain(1)
    expect(stringToStorage(`["one","two","three"]`)).toContain("two")
    expect(stringToStorage(`[1,"two",3]`)).toContain(3)


    expect(stringToStorage(`[1,"two",3,true]`)[0]).toBe(1)
    expect(stringToStorage(`[1,"two",3,true]`)[1]).toBe("two")
    expect(stringToStorage(`[1,"two",3,true]`)[2]).toBe(3)
    expect(stringToStorage(`[1,"two",3,true]`)[3]).toBe(true)
  })

  it("should parse objects", () => {
    expect(stringToStorage("{}")).toEqual({})
    expect(stringToStorage(`{"hello":"world"}`).hello).toBe("world")
    expect(stringToStorage(`{"hello":"world","age":{"epoch":"LONG"}}`).age.epoch).toBe("LONG")
  })
})
