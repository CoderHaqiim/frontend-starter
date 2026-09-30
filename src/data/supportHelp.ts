import { IconType } from "@/src/components/base/ui/primitives/icon"

/*
 * The help content the Support page shows, and the topics the support form offers.
 *
 * It lives here in one copy so the page, the search on it and the Category the form asks for
 * can never drift apart. The articles are the titles the help center lists; until Aiki has a
 * help backend (or written guides) this is the whole of the help content, which is why a
 * search filters and highlights it on the page rather than claiming to search a knowledge
 * base. A help backend would replace this module, and everything reading it would follow.
 */

export type HelpArticle = {
  id: string
  title: string
}

export type HelpCategory = {
  id: string
  title: string
  description: string
  // The icon the category wears wherever it is listed.
  icon: IconType
  articles: HelpArticle[]
}

// A popular article is one of the articles above, named so the list can send the reader to
// the category it belongs to.
export type PopularArticle = HelpArticle & {
  categoryId: string
}

export const helpCategories: HelpCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Set up your account and get your first business running.",
    icon: "icon-rocket",
    articles: [
      { id: "account-setup", title: "Account setup" },
      { id: "creating-a-business", title: "Creating a business" },
      { id: "understanding-the-dashboard", title: "Understanding the dashboard" },
    ],
  },
  {
    id: "finance",
    title: "Finance",
    description: "Track the money moving through your business.",
    icon: "icon-money",
    articles: [
      { id: "transactions", title: "Transactions" },
      { id: "income-and-expenses", title: "Income and expenses" },
      { id: "financial-reports", title: "Financial reports" },
    ],
  },
  {
    id: "customers",
    title: "Customers",
    description: "Keep your customer records complete and up to date.",
    icon: "icon-address-book",
    articles: [
      { id: "adding-customers", title: "Adding customers" },
      { id: "managing-customer-records", title: "Managing customer records" },
    ],
  },
  {
    id: "invoices",
    title: "Invoices",
    description: "Create, send and follow up on the invoices you issue.",
    icon: "icon-invoice",
    articles: [
      { id: "creating-invoices", title: "Creating invoices" },
      { id: "sending-invoices", title: "Sending invoices" },
      { id: "tracking-invoices", title: "Tracking invoices" },
    ],
  },
  {
    id: "operations",
    title: "Operations",
    description: "Run the day to day work of the business.",
    icon: "icon-list-checks",
    articles: [
      { id: "tasks", title: "Tasks" },
      { id: "scheduling", title: "Scheduling" },
      { id: "reports", title: "Reports" },
    ],
  },
  {
    id: "team",
    title: "Team",
    description: "Bring your team in and decide what each person can do.",
    icon: "icon-users-round",
    articles: [
      { id: "inviting-team-members", title: "Inviting team members" },
      { id: "roles-and-permissions", title: "Roles and permissions" },
    ],
  },
  {
    id: "account-and-settings",
    title: "Account & Settings",
    description: "Manage your profile, your password and your business settings.",
    icon: "icon-settings",
    articles: [
      { id: "profile", title: "Profile" },
      { id: "password", title: "Password" },
      { id: "business-settings", title: "Business settings" },
    ],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    description: "What to do when something looks wrong or is missing.",
    icon: "icon-life-buoy",
    articles: [
      { id: "common-problems", title: "Common problems" },
      { id: "errors", title: "Errors" },
      { id: "missing-or-unexpected-data", title: "Missing or unexpected data" },
    ],
  },
]

export const popularArticles: PopularArticle[] = [
  { id: "financial-reports", title: "How is my business performance calculated?", categoryId: "finance" },
]

export const helpTopics: string[] = helpCategories.map((category) => category.title)

export function getHelpCategory(categoryId: string): HelpCategory | null {
  return helpCategories.find((category) => category.id === categoryId) ?? null
}

// The category an article sits in, read by the id the article carries.
export function findArticleCategory(articleId: string): HelpCategory | null {
  return (
    helpCategories.find((category) =>
      category.articles.some((article) => article.id === articleId),
    ) ?? null
  )
}
