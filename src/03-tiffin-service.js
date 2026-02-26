/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {


  if (name === null || name === '' || name === undefined) return null


  let dailyRate;

  if (mealType === 'veg') dailyRate = 80
  else if (mealType === 'nonveg') dailyRate = 120
  else if (mealType === 'jain') dailyRate = 90
  else return null

  const totalCost = dailyRate * days


  return { name, mealType, days, dailyRate, totalCost }
}

export function combinePlans(...plans) {
  if (plans === null || plans === undefined || plans.length === 0) return null


  let totalCustomers = 0;
  let totalRevenue = 0;
  let mealBreakdown = {
    veg: 0,
    nonveg: 0,
    jain: 0
  }

  plans.map(item => {
    totalRevenue += item.totalCost;
    if (item.mealType === 'veg') mealBreakdown.veg++
    if (item.mealType === 'nonveg') mealBreakdown.nonveg++
    if (item.mealType === 'jain') mealBreakdown.jain++
    totalCustomers++
  })


  return { totalCustomers, totalRevenue, mealBreakdown }



}

export function applyAddons(plan, ...addons) {
  // Your code here
  if (plan === null || plan.length == 0 || addons === null) return null


  let newDailyCost = 0;
  let addonCost = 0;
  let newTotalCost = 0;
  let itemNameArray = []



  addons.map(item => {
    addonCost += item.price;
    itemNameArray.push(item.name)
  })

  newDailyCost = plan.dailyRate + addonCost;
  newTotalCost = newDailyCost * plan.days;


  return {
    ...plan,
    dailyRate: newDailyCost,
    totalCost: newTotalCost,
    addonNames: itemNameArray
  }









}

