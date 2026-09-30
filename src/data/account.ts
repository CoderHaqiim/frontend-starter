import { Profile } from "@/src/types/types"
import { defaultCurrency } from "@/src/utils/currencySymbol"

// The personal information of the signed in user, the way the settings page, the
// profile button and the profile card read it, and the currency the account keeps
// its money in.
const seedAccount: Profile = {
  profilePicture: "/images/akeem.png",
  userName: "Haqiim",
  firstName: "Haqiim",
  lastName: "Bello",
  email: "haqiim@company.com",
  phone: "+234 801 234 5678",
  currency: defaultCurrency,
  userId: 90,
}

// Next.js gives every route module its own copy of a plain module export, so the
// account is parked on globalThis to keep one copy per server process. That is what
// lets the currency the profile route saves be the one the routes that report money
// read.
//
// The values are kept exactly as they were saved, unlike the record stores that
// normalise what they hold: a name, a phone number and a currency code are shown
// back to the user as they were typed.
const globalStore = globalThis as typeof globalThis & { accountStore?: Profile }

export const account = globalStore.accountStore ?? seedAccount

globalStore.accountStore = account
