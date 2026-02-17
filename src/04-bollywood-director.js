/**
 * 🎬 Bollywood Scene Director - Factory Functions
 *
 * Bollywood ka script generator bana! Factory functions use karo — matlab
 * aise functions jo DOOSRE functions return karte hain. Pehle configuration
 * do, phir ek specialized function milega jo kaam karega.
 *
 * Functions:
 *
 *   1. createDialogueWriter(genre)
 *      - Factory: returns a function (hero, villain) => string
 *      - Genres and their dialogue templates:
 *        "action"  => `${hero} says: 'Tujhe toh main dekh lunga, ${villain}!'`
 *        "romance" => `${hero} whispers: '${villain}, tum mere liye sab kuch ho'`
 *        "comedy"  => `${hero} laughs: '${villain} bhai, kya kar rahe ho yaar!'`
 *        "drama"   => `${hero} cries: '${villain}, tune mera sab kuch cheen liya!'`
 *      - Unknown genre => return null (not a function, just null)
 *      - Returned function: if hero or villain empty/missing, return "..."
 *
 *   2. createTicketPricer(basePrice)
 *      - Factory: returns a function (seatType, isWeekend = false) => price
 *      - Seat multipliers: silver=1, gold=1.5, platinum=2
 *      - Agar isWeekend, multiply final price by 1.3 (30% extra)
 *      - Round to nearest integer
 *      - Unknown seatType in returned fn => return null
 *      - Agar basePrice not positive number => return null (not a function)
 *
 *   3. createRatingCalculator(weights)
 *      - Factory: returns a function (scores) => weighted average
 *      - weights: { story: 0.3, acting: 0.3, direction: 0.2, music: 0.2 }
 *      - scores: { story: 8, acting: 9, direction: 7, music: 8 }
 *      - Weighted avg = sum of (score * weight) for matching keys
 *      - Round to 1 decimal place
 *      - Agar weights not an object => return null
 *
 * Hint: A factory function RETURNS another function. The returned function
 *   "remembers" the parameters of the outer function (this is a closure!).
 *
 * @example
 *   const actionWriter = createDialogueWriter("action");
 *   actionWriter("Shah Rukh", "Raees")
 *   // => "Shah Rukh says: 'Tujhe toh main dekh lunga, Raees!'"
 *
 *   const pricer = createTicketPricer(200);
 *   pricer("gold", true)  // => 200 * 1.5 * 1.3 = 390
 */
export function createDialogueWriter(genre) {
  // Your code here
  //  - Factory: returns a function (hero, villain) => string
  //  - Genres and their dialogue templates:
  //  "action"  => `${hero} says: 'Tujhe toh main dekh lunga, ${villain}!'`
  //  "romance" => `${hero} whispers: '${villain}, tum mere liye sab kuch ho'`
  //  "comedy"  => `${hero} laughs: '${villain} bhai, kya kar rahe ho yaar!'`
  //  "drama"   => `${hero} cries: '${villain}, tune mera sab kuch cheen liya!'`
  //  - Unknown genre => return null (not a function, just null)
  //  - Returned function: if hero or villain empty/missing, return "..."

  const geners = ["action", "romance", "comedy", "drama"]
  const genereIndex = geners.indexOf(genre)

  if (genereIndex === -1) return null

  return (hero, villain) => {
    const isValidHero = typeof hero === "string" && hero.length > 0
    const isValidVillain = typeof villain === "string" && villain.length > 0

    if (!isValidHero || !isValidVillain) return "..."

    const dialogus = [
      `${hero} says: 'Tujhe toh main dekh lunga, ${villain}!'`,
      `${hero} whispers: '${villain}, tum mere liye sab kuch ho'`,
      `${hero} laughs: '${villain} bhai, kya kar rahe ho yaar!'`,
      `${hero} cries: '${villain}, tune mera sab kuch cheen liya!'`
    ]

    return dialogus[genereIndex]
  }
}

export function createTicketPricer(basePrice) {
  // Your code here
  // - Factory: returns a function (seatType, isWeekend = false) => price
  // - Seat multipliers: silver=1, gold=1.5, platinum=2
  // - Agar isWeekend, multiply final price by 1.3 (30% extra)
  // - Round to nearest integer
  // - Unknown seatType in returned fn => return null
  // - Agar basePrice not positive number => return null (not a function)

  if (Number(basePrice) <= 0) return null

  return (seatType, isWeekend = false) => {
    const multipliers = {
      silver: 1, gold: 1.5, platinum: 2
    }

    if (!multipliers.hasOwnProperty(seatType)) return null

    const price = basePrice * multipliers[seatType]

    return Math.round(price * (isWeekend ? 1.3 : 1))
  }
}

export function createRatingCalculator(weights) {
  // Your code here
  // - Factory: returns a function (scores) => weighted average
  // - weights: { story: 0.3, acting: 0.3, direction: 0.2, music: 0.2 }
  // - scores: { story: 8, acting: 9, direction: 7, music: 8 }
  // - Weighted avg = sum of (score * weight) for matching keys
  // - Round to 1 decimal place
  // - Agar weights not an object => return null

  if (typeof weights !== "object" || Array.isArray(weights) || weights === null) return null

  return (scores) => {
    const weightAvg = Object.entries(scores).reduce((avg, score) => {
      const [key, val] = score
      if (!weights.hasOwnProperty(key)) return avg
      return avg + (val * weights[key])
    }, 0)

    return parseFloat((weightAvg).toFixed(1))
  }
}
