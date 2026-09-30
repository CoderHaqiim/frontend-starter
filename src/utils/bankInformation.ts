// Bank information is never generated. The seeded businesses carry the account
// stored with their data, and a business created through the create form holds
// no account at all until its details are saved.

// A bank account number is stored as ten digits.
export const accountNumberLength = 10

export const isAccountNumber = (value: string) =>
  new RegExp(`^\\d{${accountNumberLength}}$`).test(value)
