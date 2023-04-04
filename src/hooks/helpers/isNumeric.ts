export default function isNumeric(value: any): boolean {
  return (typeof value === "number" || (typeof value === "string" && value.trim() !== "")) && !isNaN(value as number)
}
