/**
 * Reads the business whose page is currently open from a route pathname.
 *
 * Business pages are shaped like
 * `/dashboard/businesses/<businessId>/<page>`, so the business id is the
 * fourth segment. Any other route (the home dashboard, the view pages) has no
 * business context and returns `undefined`.
 *
 * Forms use this so that a form opened from a business page always targets
 * that business, while a form opened from the home dashboard stays generic.
 */
export function getBusinessIdFromPathname(pathname: string): string | undefined {
  const [, dashboardSegment, businessesSegment, businessId] = pathname.split("/")

  if (dashboardSegment !== "dashboard" || businessesSegment !== "businesses") {
    return undefined
  }

  return businessId || undefined
}
