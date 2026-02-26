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

  const operations = {
    ">": (field, value) => field > value,
    "<": (field, value) => field < value,
    ">=": (field, value) => field >= value,
    "<=": (field, value) => field <= value,
    '===': (field, value) => field === value,
  }


  return (obj) => {
    return operations[operator]?.(obj[field], value)
  }
}


const dhabas = [
  { name: 'Punjab Dhaba', rating: 4.5, price: 200, city: 'Delhi' },
  { name: 'Sharma Ji', rating: 3.8, price: 150, city: 'Jaipur' },
  { name: 'Highway King', rating: 4.0, price: 300, city: 'Delhi' },
  { name: 'Truck Stop', rating: 3.2, price: 100, city: 'Agra' },
];

// const highRated = createFilter('rating', '>=', 4);
// const result = dhabas.filter(highRated);

export function createSorter(field, order = "asc") {
  return function (obj1, obj2) {
    if (order === 'asc') {
      if (typeof obj1[field] === 'string') {
        return obj1[field].localeCompare(obj2[field])
      } else {
        return obj1[field] - obj2[field]
      }
    }
    else {
      if (typeof obj2[field] === 'string') {
        return obj2[field].localeCompare(obj1[field])
      } else {
        return obj2[field] - obj1[field]
      }

    }
  }
}

// const byRatingDesc = createSorter('name', 'asc');
// const sorted = [...dhabas].sort(byRatingDesc);

export function createMapper(fields) {


  if (!fields || !Array.isArray(fields)) return null


  return function (obj) {
    let result = {}
    let keys = Object.keys(obj);

    for (let i = 0; i < fields.length; i++) {
      if (keys[i] == fields[i]) {
        result[fields[i]] = obj[fields[i]]
      }
    }
    return result
  }
}

// const pickNameRating = createMapper(['name', 'rating']);
// const result = dhabas.map(pickNameRating);

export function applyOperations(data, ...operations) {
  if (!Array.isArray(data)) return []

  if (operations.length == 0) return data

  operations.map(item => {
    data = item(data)
  })
  return data
}
