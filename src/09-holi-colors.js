/**
 * 🎨 Holi Color Mixer - Pure Functions
 *
 * Holi ka festival hai! Rang mix karne hain. Lekin PURE FUNCTIONS use
 * karne hain — matlab:
 *   1. Input ko KABHI modify mat karo (no mutation)
 *   2. Same input pe HAMESHA same output aaye
 *   3. Koi side effects nahi (no console.log, no external state changes)
 *
 * Har color object: { name: string, r: number, g: number, b: number }
 *   where r, g, b are 0-255 (RGB values)
 *
 * Functions:
 *
 *   1. mixColors(color1, color2)
 *      - Mix two colors by averaging their RGB values
 *      - New name: `${color1.name}-${color2.name}`
 *      - Round RGB values to integers
 *      - MUST NOT modify color1 or color2
 *      - Agar either color null/invalid, return null
 *
 *   2. adjustBrightness(color, factor)
 *      - Multiply each RGB by factor, clamp to 0-255 range
 *      - Round to integers using Math.round
 *      - Name stays same
 *      - MUST NOT modify original color
 *      - Agar color null or factor not number, return null
 *
 *   3. addToPalette(palette, color)
 *      - Return NEW array with color added at end
 *      - MUST NOT modify original palette array
 *      - Agar palette not array, return [color]
 *      - Agar color null/invalid, return copy of palette
 *
 *   4. removeFromPalette(palette, colorName)
 *      - Return NEW array without the color with that name
 *      - MUST NOT modify original palette
 *      - Agar palette not array, return []
 *
 *   5. mergePalettes(palette1, palette2)
 *      - Merge two palettes into NEW array
 *      - No duplicate names (keep first occurrence)
 *      - MUST NOT modify either original palette
 *      - Agar either not array, treat as empty array
 *
 * Hint: Use spread operator [...arr], Object spread {...obj} to create
 *   copies. NEVER use push, splice, or direct property assignment on inputs.
 *
 * @example
 *   const red = { name: "red", r: 255, g: 0, b: 0 };
 *   const blue = { name: "blue", r: 0, g: 0, b: 255 };
 *   mixColors(red, blue)
 *   // => { name: "red-blue", r: 128, g: 0, b: 128 }
 *   // red and blue objects are UNCHANGED
 */
export function mixColors(color1, color2) {
  //  *   1. mixColors(color1, color2)
  //  *      - Mix two colors by averaging their RGB values
  //  *      - New name: `${color1.name}-${color2.name}`
  //  *      - Round RGB values to integers
  //  *      - MUST NOT modify color1 or color2
  //  *      - Agar either color null/invalid,

  if (typeof color1 !== "object" ||
    color1 === null ||
    typeof color2 !== "object" ||
    color2 === null) return null

  return {
    name: `${color1.name}-${color2.name}`,
    r: Math.round((color1.r + color2.r) / 2),
    g: Math.round((color1.g + color2.g) / 2),
    b: Math.round((color1.b + color2.b) / 2),
  }
}

export function adjustBrightness(color, factor) {
  //  *   2. adjustBrightness(color, factor)
  //  *      - Multiply each RGB by factor, clamp to 0-255 range
  //  *      - Round to integers using Math.round
  //  *      - Name stays same
  //  *      - MUST NOT modify original color
  //  *      - Agar color null or factor not number, return null

  if (color === null ||
    typeof factor !== "number" ||
    Number.isNaN(factor)) return null

  const r = Math.min(255, Math.max(0, Math.round(color.r * factor)))
  const g = Math.min(255, Math.max(0, Math.round(color.g * factor)))
  const b = Math.min(255, Math.max(0, Math.round(color.b * factor)))

  return { name: color.name, r, g, b }
}

export function addToPalette(palette, color) {
  //  *   3. addToPalette(palette, color)
  //  *      - Return NEW array with color added at end
  //  *      - MUST NOT modify original palette array
  //  *      - Agar palette not array, return [color]
  //  *      - Agar color null/invalid, return copy of palette

  if (!Array.isArray(palette)) return [color]
  if (color === null || !Number.isInteger(color.r) || !Number.isInteger(color.g) || !Number.isInteger(color.b)) return [...palette]

  return [structuredClone(palette), color]

}

export function removeFromPalette(palette, colorName) {
  //  *   4. removeFromPalette(palette, colorName)
  //  *      - Return NEW array without the color with that name
  //  *      - MUST NOT modify original palette
  //  *      - Agar palette not array, return []

  if (!Array.isArray(palette)) return []

  const filtered = structuredClone(palette).filter(color => color.name !== colorName)

  return filtered
}

export function mergePalettes(palette1, palette2) {
  //  *   5. mergePalettes(palette1, palette2)
  //  *      - Merge two palettes into NEW array
  //  *      - No duplicate names (keep first occurrence)
  //  *      - MUST NOT modify either original palette
  //  *      - Agar either not array, treat as empty array

  const p1 = structuredClone(Array.isArray(palette1) ? palette1 : [])
  const p2 = structuredClone(Array.isArray(palette2) ? palette2 : [])

  const merge = [...p1, ...p2]

  if (merge.length === 0) return []

  const map = new Map()

  merge.forEach(palette => {
    if (!map.has(palette.name)) {
      map.set(palette.name, palette)
    }
  })

  return [...map.values()]
}
