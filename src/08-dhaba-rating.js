/**
 * 🍛 Highway Dhaba Rating System - Higher-Order Functions
 *
 * Highway pe dhabas ki rating system bana raha hai. Higher-order functions
 * (HOF) use karne hain — aise functions jo doosre functions ko parameter
 * mein lete hain YA return karte hain.
 *
 * Functions:
 *
 *   1. createFilter(field, operator, value)
 *      - Returns a FUNCTION that filters objects
 *      - Operators: ">", "<", ">=", "<=", "==="
 *      - e.g., createFilter("rating", ">=", 4) returns a function that
 *        takes an object and returns true if object.rating >= 4
 *      - Unknown operator => return function that always returns false
 *
 *   2. createSorter(field, order = "asc")
 *      - Returns a COMPARATOR function for Array.sort()
 *      - order "asc" => ascending, "desc" => descending
 *      - Works with both numbers and strings
 *
 *   3. createMapper(fields)
 *      - fields: array of field names, e.g., ["name", "rating"]
 *      - Returns a function that takes an object and returns a new object
 *        with ONLY the specified fields
 *      - e.g., createMapper(["name"])({name: "Dhaba", rating: 4}) => {name: "Dhaba"}
 *
 *   4. applyOperations(data, ...operations)
 *      - data: array of objects
 *      - operations: any number of functions to apply SEQUENTIALLY
 *      - Each operation takes an array and returns an array
 *      - Apply first operation to data, then second to result, etc.
 *      - Return final result
 *      - Agar data not array, return []
 *
 * Hint: HOF = functions that take functions as arguments or return functions.
 *   createFilter returns a function. applyOperations takes functions as args.
 *
 * @example
 *   const highRated = createFilter("rating", ">=", 4);
 *   highRated({ name: "Punjab Dhaba", rating: 4.5 }) // => true
 *
 *   const byRating = createSorter("rating", "desc");
 *   [{ rating: 3 }, { rating: 5 }].sort(byRating)
 *   // => [{ rating: 5 }, { rating: 3 }]
 */
export function createFilter(field, operator, value) {
  // Your code here
  //  *      - Returns a FUNCTION that filters objects
  //  *      - Operators: ">", "<", ">=", "<=", "==="
  //  *      - e.g., createFilter("rating", ">=", 4) returns a function that
  //  *        takes an object and returns true if object.rating >= 4
  //  *      - Unknown operator => return function that always returns false

  const mapping = {
    ">": (a, b) => a > b,
    "<": (a, b) => a < b,
    ">=": (a, b) => a >= b,
    "<=": (a, b) => a <= b,
    "===": (a, b) => a === b,
  }

  if (!mapping.hasOwnProperty(operator)) return () => false

  return (entry) => mapping[operator](entry[field], value)
}

export function createSorter(field, order = "asc") {
  //  *      - Returns a COMPARATOR function for Array.sort()
  //  *      - order "asc" => ascending, "desc" => descending
  //  *      - Works with both numbers and strings

  const multiplire = order === "desc" ? -1 : 1

  return (a, b) => {
    const fieldA = a[field]
    const fieldB = b[field]

    let comparison = 0

    if (typeof fieldA === "number" && typeof fieldB === "number") {
      comparison = fieldA - fieldB
    } else {
      comparison = String(fieldA).localeCompare(String(fieldB))
    }

    return comparison * multiplire
  }
}

export function createMapper(fields) {
  //  *      - fields: array of field names, e.g., ["name", "rating"]
  //  *      - Returns a function that takes an object and returns a new object
  //  *        with ONLY the specified fields
  //  *      - e.g., createMapper(["name"])({name: "Dhaba", rating: 4}) => {name: "Dhaba"}

  return (entries) => {
    const newEntries = {}

    fields.forEach(key => {
      if (entries.hasOwnProperty(key)) {
        newEntries[key] = entries[key]
      }
    });

    return newEntries
  }

}

export function applyOperations(data, ...operations) {
  //  *      - data: array of objects
  //  *      - operations: any number of functions to apply SEQUENTIALLY
  //  *      - Each operation takes an array and returns an array
  //  *      - Apply first operation to data, then second to result, etc.
  //  *      - Return final result
  //  *      - Agar data not array, return []

  // return () => {
  if (!Array.isArray(data)) return []

  let resultedData = data

  operations.forEach(operation => {
    resultedData = operation(resultedData)
  })

  return resultedData
  // }
}
