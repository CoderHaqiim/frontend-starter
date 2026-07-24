"use client"
import React, { useEffect, useState } from 'react'
import Frame from '../primitives/frame'
import Input from '../primitives/input'
import Button from '../primitives/button'
import { colors } from '@/src/app/design/colors'
import { http } from '@/src/http/client'
import Tooltip from './tooltip'

type SearchResult = unknown

type SearchbarProps = {
  url?: string
  queryParam?: string
  debounceMs?: number
}

const getResultLabel = (result: SearchResult) => {
  if (typeof result === "string" || typeof result === "number") {
    return String(result)
  }

  if (result && typeof result === "object") {
    const item = result as Record<string, unknown>
    const label = item.title ?? item.name ?? item.label ?? item.value ?? item.id

    if (typeof label === "string" || typeof label === "number") {
      return String(label)
    }
  }

  return JSON.stringify(result)
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

export default function Searchbar({ url = "/search", queryParam = "search", debounceMs = 500 }: SearchbarProps) {

  const [focused, setFocused] = useState<boolean>(false)
  const [searchInput, setSearchInput] = useState<string>("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  
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
        const data = await http(`${url}${divider}${queryParam}=${encodeURIComponent(query)}`, undefined, {
          method: "GET",
        })

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
  }, [debounceMs, queryParam, searchInput, url])

  const showResults = focused && Boolean(searchInput.trim())

  return (
    <Frame width="350px" height="hug" justify='center' border align='center' rounded="lg" 
      className='relative bg-[var(--color-white)]'
      specificStyles={{ 
        border: focused? `1.5px ${colors["accent"]} solid` : "",
      }}>
        <Frame width="hug" height="hug" className="flex-1">
            <Input size='md' formFunc={search} name="search" func={focusInputParent} variant="default" type='text' placeholder='search businesses, tasks...'/>
        </Frame>
        <Tooltip content="search" position='bottom'>
          <Button variant='ghost' size='md' isIcon iconName='icon-search' specificStyles={{
            backgroundColor: colors["white"]
          }}/>
        </Tooltip>
        {
          showResults && 
          <Frame width="stretch" height="auto" rounded="md" padding='md' direction="column" 
            className=' top-[120%] left-0 gap-[var(--space-sm)] z-[20] min-h-[80px] max-h-[300px] bg-[var(--color-white)]'
            specificStyles={{
              position: "absolute",
              boxShadow:"0px 1px 5px -1px #000000c4",
            }}>
          {loading && <p className="text-sm text-[#666666]">Searching...</p>}
          {!loading && error && <p className="text-[var(--bodySize-sm)] text-red-500">{error}</p>}
          {!loading && !error && searchResults.length === 0 && <p className="text-[var(--bodySize-sm)] text-[#666666]">No results found</p>}
          {!loading && !error && searchResults.map((result, index) => (
            <div key={index} className="w-full rounded-[var(--radius-md)] px-2 py-1 text-sm hover:bg-[var(--color-background2)]">
              {getResultLabel(result)}
            </div>
          ))}
        </Frame>}
    </Frame>
  )
}
