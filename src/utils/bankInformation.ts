// A bank account number is stored as ten digits.
export const accountNumberLength = 10

export const isAccountNumber = (value: string) =>
  new RegExp(`^\\d{${accountNumberLength}}$`).test(value)

// The banks the seeded businesses and a newly created business start on. A
// business can be paid into any bank, so these are only mock values the create
// route picks from until the bank information is edited.
export const exampleBankNames = ["First Bank", "Access Bank", "GT Bank"]

// Builds the ten digit account number a business gets while it has none, the way
// the id and the customer count belong to the server.
export function generateAccountNumber(businessId: string) {
  const seed = String(Number(businessId) || 0).padStart(4, "0").slice(-4)

  return `012345${seed}`
}
