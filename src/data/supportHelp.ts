
/*
 * The help content the Support page lists, and the topics the support form offers.
 *
 * It lives here in one copy so the page and the Category the contact form asks for can never
 * drift apart. The articles are the titles the help center lists; until Aiki has a help
 * backend (or written guides) this is the whole of the help content, which is why selecting
 * an article marks its row rather than leading to a page that would say nothing. A help
 * backend would replace this module, and everything reading it would follow.
 */

export type HelpArticle = {
  id: string
  title: string
}

// A popular article is one of the articles above, named so it stands apart from the rest of
// the list the help center shows.
export type PopularArticle = HelpArticle

export const popularArticles: PopularArticle[] = [
  { id: "financial-reports", title: "How is my business performance calculated?" },
]

// The topics the contact support form offers, so a request lands in the same words a reader
// browses. The form adds "Other" for everything these do not cover.
export const helpTopics: string[] = [
  "Getting Started",
  "Finance",
  "Customers",
  "Invoices",
  "Operations",
  "Team",
  "Account & Settings",
  "Troubleshooting",
]
