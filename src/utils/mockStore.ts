/*
 * One copy of a mock store per server process.
 *
 * Next.js gives every route module its own copy of a plain module export, so an
 * array that one route mutates stays invisible to the others. Parking the store
 * on globalThis keeps a single copy per process, which is what lets a record
 * created, updated or deleted by one route be seen by the rest.
 *
 * There is no database behind these stores: they live for as long as the server
 * process does, and a restart re-seeds them.
 *
 * Stored strings are lowercased, so the seed data is normalised on the way in and
 * the routes normalise what they receive. Ids and logo payloads are left alone:
 * an id is store-owned and a base64 or file-path logo is case sensitive.
 */
const UNTOUCHED_KEYS = new Set(["id", "logo", "createdAt", "updatedAt"])

// Bumped whenever the seed shape or the normalisation changes: a running server
// keeps its stores on globalThis, so the version is part of the key to make the
// next request re-seed instead of serving data built by the old rules.
// v7: every business now holds the same number of transactions (sixty: the
// handwritten records plus the generated ones it takes to reach the total), so a
// server that was already running re-seeds from the new rules on its next request.
const STORE_VERSION = "v7"

function lowercaseStrings(value: unknown, key = ""): unknown {
  if (typeof value === "string") {
    return UNTOUCHED_KEYS.has(key) ? value : value.toLowerCase()
  }

  if (Array.isArray(value)) {
    return value.map((entry) => lowercaseStrings(entry))
  }

  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([entryKey, entryValue]) => [
        entryKey,
        lowercaseStrings(entryValue, entryKey),
      ])
    )
  }

  return value
}

export function createMockStore<Store>(key: string, seed: Store): Store {
  const registry = globalThis as unknown as Record<string, unknown>
  const versionedKey = `${key}:${STORE_VERSION}`

  if (!registry[versionedKey]) {
    registry[versionedKey] = lowercaseStrings(seed) as Store
  }

  return registry[versionedKey] as Store
}
