
import { Business } from "@/src/types/types"

// The mock store. The business routes push into, patch and splice this array, so
// a change is visible to every other route on its next request. Stored strings are
// lowercased when the store is created and when a route writes to it.
const seedBusinesses: Business[] = [
  {
    id: "0",
    logo:"",
    businessName: "Multilinks Limited",
    tagLine: "Connecting businesses to the future",
    email: "hello@multilinks.com",
    phone: "+234 801 234 5678",
    address: "123 Business Street",
    website: "www.multilinks.com",
    industry: "Technology",
    customers: 1000,
    establishedYear: 2010,
    country: "Nigeria",
    state: "Lagos",
    account: {
      accountName: "Multilinks Limited",
      accountNumber: "1012345678",
      bankName: "GT Bank",
    },
  },
  {
    id: "1",
    logo:"/images/haqiim.png",
    businessName: "Dangote Cement Limited",
    tagLine: "Building a better tomorrow",
    email: "hello@dangotecement.com",
    phone: "+234 802 345 6789",
    address: undefined,
    website: "www.dangotecement.com",
    industry: "Manufacturing",
    customers: 500,
    establishedYear: 2005,
    country: "United Kingdom",
    state: "London",
    account: {
      accountName: "Dangote Cement Limited",
      accountNumber: "3012345678",
      bankName: "First Bank",
    },
  },
  {
    id: "2",
    logo:"",
    businessName: "Microsoft Nigeria Limited",
    tagLine: "Empowering every business",
    email: "hello@microsoft.ng",
    phone: "+1 305 555 0102",
    address: "1 Innovation Drive",
    website: "www.microsoft.ng",
    industry: "Technology",
    customers: 750,
    establishedYear: 2015,
    country: "United States",
    state: "Las Vegas",
    account: {
      accountName: "Microsoft Nigeria Limited",
      accountNumber: "0123456789",
      bankName: "Access Bank",
    },
  },
  {
    id: "3",
    logo:"/images/haqiim.png",
    businessName: "Opic Farms Limited",
    tagLine: "Fresh from our farms to your table",
    email: "hello@opicfarms.com",
    phone: "+234 803 456 7890",
    address: "12 Farm Settlement Road",
    website: "www.opicfarms.com",
    industry: "Food, Agriculture and Commerce",
    customers: 1360,
    establishedYear: 2012,
    country: "Nigeria",
    state: "Lagos",
    account: {
      accountName: "Opic Farms Limited",
      accountNumber: "2034567891",
      bankName: "First Bank",
    },
  },
  {
    id: "4",
    logo:"",
    businessName: "Alvin Stores",
    tagLine: "Everyday value, every day",
    email: "hello@alvinstores.com",
    phone: "+234 804 567 8901",
    address: "78 Market Road",
    website: "www.alvinstores.com",
    industry: "Commerce",
    customers: 1000,
    establishedYear: 2010,
    country: "Nigeria",
    state: "Lagos",
    account: {
      accountName: "Alvin Stores",
      accountNumber: "0745678923",
      bankName: "Access Bank",
    },
  },
]

// Next.js gives every route module its own copy of a plain module export, so the
// store is parked on globalThis to keep one copy per server process. That is what
// lets a business created, updated or deleted by one route be seen by the others.
const globalStore = globalThis as typeof globalThis & { businessStore?: Business[] }

export const businesses = globalStore.businessStore ?? seedBusinesses

globalStore.businessStore = businesses
