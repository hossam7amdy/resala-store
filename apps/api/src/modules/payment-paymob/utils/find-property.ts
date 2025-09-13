/**
 * Alternative utility that returns the path to the found property
 * @param obj - The object to search in
 * @param keys - Property key(s) to search for
 * @returns Object with value and path, or undefined if not found
 */
export function findProperty<T = unknown>(
  obj: unknown,
  keys: string | string[]
): { value: T; path: string[] } | undefined {
  return findPropertyHelper<T>(obj, keys, [], new WeakSet())
}

/**
 * Helper function with circular reference protection
 */
function findPropertyHelper<T>(
  obj: unknown,
  keys: string | string[],
  currentPath: readonly string[],
  visited: WeakSet<object>
): { value: T; path: string[] } | undefined {
  if (!obj || typeof obj !== 'object' || obj === null) {
    return undefined
  }

  // Prevent circular references
  if (visited.has(obj)) {
    return undefined
  }
  visited.add(obj)

  const keyArray = Array.isArray(keys) ? keys : [keys]

  // Check if any of the keys exist at the current level
  for (const key of keyArray) {
    if (Object.hasOwn(obj as Record<string, unknown>, key)) {
      return {
        value: (obj as Record<string, unknown>)[key] as T,
        path: [...currentPath, key],
      }
    }
  }

  // Handle arrays differently from objects
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      const result = findPropertyHelper<T>(
        obj[i],
        keys,
        [...currentPath, i.toString()],
        visited
      )
      if (result !== undefined) {
        return result
      }
    }
  } else {
    // Recursively search in nested objects
    for (const [objKey, value] of Object.entries(
      obj as Record<string, unknown>
    )) {
      const result = findPropertyHelper<T>(
        value,
        keys,
        [...currentPath, objKey],
        visited
      )
      if (result !== undefined) {
        return result
      }
    }
  }

  return undefined
}
