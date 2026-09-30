"use client"
import { useAccountCurrencySymbol } from '@/src/hooks/accountCurrency'
import { http } from '@/src/http/client'
import { formatCurrency } from '@/src/utils/formatCurrency'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../../providers/themeProvider'
import Button from '../primitives/button'
import Frame from '../primitives/frame'
import Input from '../primitives/input'
import Paragraph from '../primitives/paragraph'
import Tooltip from './tooltip'

type SearchResult = unknown

type SearchbarProps = {
  url?: string
  queryParam?: string
  // The scope the search runs in: the page the bar is used on when no page is
  // given, so one bar serves every page it is rendered on.
  page?: string
  debounceMs?: number
}

/*
 * The page a pathname is on, which is the scope its search runs in. The bar sits
 * in the nav above every page, so the url it is over decides what the backend
 * searches — the same pathname reading the nav and the right aside already do.
 */
function getSearchPageFromPath(pathname: string): string {
  const businessView = pathname.match(/^\/dashboard\/businesses\/[^/]+\/([^/]+)/)?.[1]

  if (businessView) {
    return businessView
  }

  if (pathname.startsWith("/dashboard/businesses")) return "businesses"
  if (pathname.startsWith("/dashboard/tasks")) return "tasks"
  if (pathname.startsWith("/dashboard/invoices")) return "invoices"
  if (pathname.startsWith("/dashboard/view-invoice")) return "invoices"
  if (pathname.startsWith("/dashboard/view-receipt")) return "receipts"
  if (pathname.startsWith("/dashboard/support")) return "support"
  if (pathname.startsWith("/dashboard/settings")) return "settings"

  return "general"
}

// The line a result is listed under: the first of the fields the pages name
// their rows with that the record carries.
const labelKeys = ["title", "name", "businessName", "Item", "userName", "description", "customer", "label", "value", "id"]

// The line beneath it: the detail that says most about a record next to its
// label — a customer's email, a transaction's amount, a task's description.
const subtitleKeys = ["email", "phone", "amount", "SKU", "Category", "category", "description", "dueDate", "status"]

const readResultField = (result: SearchResult, key: string): string | number | null => {
  if (!result || typeof result !== "object") {
    return null
  }

  const value = (result as Record<string, unknown>)[key]

  return typeof value === "string" || typeof value === "number" ? value : null
}

const getResultLabel = (result: SearchResult) => {
  if (typeof result === "string" || typeof result === "number") {
    return String(result)
  }

  for (const key of labelKeys) {
    const value = readResultField(result, key)

    if (value !== null && value !== "") {
      return String(value)
    }
  }

  return JSON.stringify(result)
}

// The secondary line of a result, when the record carries one that is not the
// label itself. A raw amount is reported in the account currency the way every
// other amount in the app is.
const getResultSubtitle = (result: SearchResult, label: string, currencySymbol: string) => {
  for (const key of subtitleKeys) {
    const value = readResultField(result, key)

    if (value === null || value === "" || String(value) === label) {
      continue
    }

    if (key === "amount" && typeof value === "number") {
      return formatCurrency(value, currencySymbol)
    }

    return String(value)
  }

  return null
}

const normalizeResults = (data: SearchResult) => {
  if (Array.isArray(data)) {
    return data
  }

  if (data && typeof data === "object") {
    const item = data as Record<string, unknown>
    const results = item.results ?? item.data ?? item.items

    if (Array.isArray(results)) {
      return results
    }
  }

  return data ? [data] : []
}

export default function Searchbar({ url = "/api/search", queryParam = "q", page, debounceMs = 500 }: SearchbarProps) {

  const [focused, setFocused] = useState<boolean>(false)
  const [searchInput, setSearchInput] = useState<string>("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const {colors} = useTheme()
  const pathname = usePathname()
  // The scope this search runs in: the page the bar was given, or the page it is
  // rendered over. Every request carries it, so the backend only ever searches
  // the data belonging to this page.
  const searchPage = page ?? getSearchPageFromPath(pathname)
  // A raw amount in a result is reported in the account currency.
  const currencySymbol = useAccountCurrencySymbol()

  const focusInputParent = () => {
    setFocused(prev => !prev)
  }

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setSearchInput(value)

    if (!value.trim()) {
      setSearchResults([])
      setError("")
      setLoading(false)
    }
  }

  useEffect(() => {
    const query = searchInput.trim()

    if (!query) {
      return
    }

    let active = true

    const timeoutId = window.setTimeout(async () => {
      try {
        setLoading(true)
        setError("")
        const divider = url.includes("?") ? "&" : "?"
        const data = await http(
          `${url}${divider}${queryParam}=${encodeURIComponent(query)}&page=${encodeURIComponent(searchPage)}`,
          undefined,
          { method: "GET" },
        )

        if (active) {
          setSearchResults(normalizeResults(data))
        }
      } catch {
        if (active) {
          setSearchResults([])
          setError("Could not fetch search results")
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }, debounceMs)

    return () => {
      active = false
      window.clearTimeout(timeoutId)
    }
  }, [debounceMs, queryParam, searchInput, searchPage, url])

  const showResults = focused && Boolean(searchInput.trim())

  return (
    <Frame
      className={`relative w-[290px] h-max justify-center items-center rounded-[var(--radius-sm)] px-[var(--space-sm)] bg-[var(--color-white)]`}
      specificStyles={{
        border: focused ? `1.5px ${colors["accent"]} solid` : `1px solid ${colors["outline1"]}`,
      }}
    >
      <Frame
        className="w-max h-max flex-1"
      >
        <Input
          size='sm'
          formFunc={search}
          name="search"
          func={focusInputParent}
          variant="default"
          type='text'
          placeholder='Search Aiki...'
        />
      </Frame>

      <Tooltip content="search" position='bottom'>
        <Button
          variant='ghost'
          size='xs'
          isIcon
          iconName='icon-search'
          specificStyles={{
            backgroundColor: colors["white"]
          }}
        />
      </Tooltip>

      {
        showResults && 
        <Frame
          className="
            w-full
            h-auto
            rounded-[var(--radius-md)]
            p-[var(--space-md)]
            flex
            flex-col
            top-[120%]
            left-0
            gap-[var(--space-sm)]
            z-[20]
            min-h-[80px]
            max-h-[300px]
            overflow-y-auto
            bg-[var(--color-white)]
          "
          specificStyles={{
            position: "absolute",
            boxShadow:"0px 1px 5px -1px #000000c4",
          }}
        >
          {loading && <p className="text-sm text-[#666666]">Searching...</p>}
          {!loading && error && <p className="text-[var(--bodySize-sm)] text-red-500">{error}</p>}
          {!loading && !error && searchResults.length === 0 && (
            <p className="text-[var(--bodySize-sm)] text-[#666666]">
              No results found for &quot;{searchInput.trim()}&quot;
            </p>
          )}
          {!loading && !error && searchResults.map((result, index) => {
            const label = getResultLabel(result)
            const subtitle = getResultSubtitle(result, label, currencySymbol)

            return (
              <div
                key={index}
                className="w-full rounded-[var(--radius-md)] px-2 py-1 flex flex-col gap-[2px] hover:bg-[var(--color-background2)]"
              >
                <Paragraph size="sm" weight="medium" color="textColor1">{label}</Paragraph>
                {subtitle && <Paragraph size="xs">{subtitle}</Paragraph>}
              </div>
            )
          })}
        </Frame>
      }
    </Frame>
  )
}