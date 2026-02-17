/**
 * 🎉 Festival Countdown Planner - Module Pattern
 *
 * Indian festivals ka planner bana! Module pattern use karna hai —
 * matlab ek function jo ek object return kare jisme public methods hain,
 * lekin andar ka data PRIVATE rahe (bahar se directly access na ho sake).
 *
 * Function: createFestivalManager()
 *
 * Returns an object with these PUBLIC methods:
 *
 *   - addFestival(name, date, type)
 *     date is "YYYY-MM-DD" string, type is "religious"/"national"/"cultural"
 *     Returns new total count of festivals
 *     Agar name empty or date not string or invalid type, return -1
 *     No duplicate names allowed (return -1 if exists)
 *
 *   - removeFestival(name)
 *     Returns true if removed, false if not found
 *
 *   - getAll()
 *     Returns COPY of all festivals array (not the actual private array!)
 *     Each festival: { name, date, type }
 *
 *   - getByType(type)
 *     Returns filtered array of festivals matching type
 *
 *   - getUpcoming(currentDate, n = 3)
 *     currentDate is "YYYY-MM-DD" string
 *     Returns next n festivals that have date >= currentDate
 *     Sorted by date ascending
 *
 *   - getCount()
 *     Returns total number of festivals
 *
 * PRIVATE STATE: festivals array should NOT be accessible from outside.
 *   manager.festivals should be undefined.
 *   getAll() must return a COPY so modifying it doesn't affect internal state.
 *   Two managers should be completely independent.
 *
 * Hint: This is the Module Pattern — a function that returns an object
 *   of methods, all closing over shared private variables.
 *
 * @example
 *   const mgr = createFestivalManager();
 *   mgr.addFestival("Diwali", "2025-10-20", "religious");   // => 1
 *   mgr.addFestival("Republic Day", "2025-01-26", "national"); // => 2
 *   mgr.getAll(); // => [{ name: "Diwali", ... }, { name: "Republic Day", ... }]
 *   mgr.getUpcoming("2025-01-01", 1); // => [{ name: "Republic Day", ... }]
 */
export function createFestivalManager() {
  // Your code here
  let _festivals = []

  // addFestival(name, date, type)
  // date is "YYYY-MM-DD" string, type is "religious"/"national"/"cultural"
  // Returns new total count of festivals
  // Agar name empty or date not string or invalid type, return -1
  // No duplicate names allowed (return -1 if exists)

  const addFestival = (name, date, type) => {
    if (typeof name !== "string" || name.length === 0 || typeof date !== "string" || !isValidDate(date)) return -1
    if (!["religious", "national", "cultural"].includes(type)) return - 1

    const isExist = _festivals.some(festival => festival.name === name)

    if (isExist) return -1

    _festivals.push({ name, date, type })

    return _festivals.length
  }

  //  *   - removeFestival(name)
  //  *     Returns true if removed, false if not found

  const removeFestival = (name) => {
    let isRemoved = false
    _festivals = _festivals.filter(festival => {
      if (festival.name === name) {
        isRemoved = true
        return false
      }
      return true
    })
    return isRemoved
  }

  //  *   - getAll()
  //  *     Returns COPY of all festivals array (not the actual private array!)
  //  *     Each festival: { name, date, type }

  const getAll = () => structuredClone(_festivals)

  //  *   - getByType(type)
  //  *     Returns filtered array of festivals matching type

  const getByType = (type) => {
    const filtered = _festivals.filter(festival => festival.type === type)
    return structuredClone(filtered)
  }

  //  *   - getUpcoming(currentDate, n = 3)
  //  *     currentDate is "YYYY-MM-DD" string
  //  *     Returns next n festivals that have date >= currentDate
  //  *     Sorted by date ascending

  const getUpcoming = (currentDate, n = 3) => {
    const filtered = _festivals.filter(f => new Date(f.date) >= new Date(currentDate))

    const sorted = filtered.sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)

      if (dateA < dateB) return -1
      if (dateA > dateB) return 1
      return 0
    })

    return structuredClone(sorted.slice(0, n))
  }

  //  *   - getCount()
  //  *     Returns total number of festivals

  const getCount = () => _festivals.length

  return {
    addFestival,
    removeFestival,
    getAll,
    getByType,
    getUpcoming,
    getCount
  }
}

const isValidDate = (dateStr) => {
  const date = new Date(dateStr)

  return date instanceof Date && !isNaN(date)
}