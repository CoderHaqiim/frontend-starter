"use client"
import React, { useEffect, useState } from 'react'
import Frame from '../mixed/frame'
import Input from './input'
import Button from './button'
import { space } from '@/src/app/design/space'
import { colors } from '@/src/app/design/colors'
import { http } from '@/src/http/client'

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
    <Frame variant='hug' centered border rounded="sm"
    specificStyle={{ 
      border: focused? `1.5px ${colors["accent1"]} solid` : "0.5px var(--outline-color2) solid",
      position: "relative",
      backgroundColor: colors["background2"],
      width:"350px",
      }}>
        <Frame variant='stretch' specificStyle={{flex:"1"}}>
            <Input size='md' formFunc={search} name="search" func={focusInputParent} variant="default" type='text' placeholder='search'/>
        </Frame>
        <Button id="search-btn" variant='icon' size='md' iconName='icon-search'/>
        {showResults && <Frame variant='custom' rounded="md" padding='md' direction="column"
          specificStyle={{
            position: "absolute",
            width:"100%",  
            minHeight:"80px",
            maxHeight:"300px",
            backgroundColor:"white", 
            borderRadius:space["md"], 
            border:"solid 1px var(--liner)", 
            top:"120%",
            left:"0px",
            boxShadow:"0px 1px 5px -1px #000000c4",
            overflowY:"auto",
            zIndex: 20,
            gap: space["sm"]
            }}>
          {loading && <p className="text-sm text-[#666666]">Searching...</p>}
          {!loading && error && <p className="text-sm text-red-500">{error}</p>}
          {!loading && !error && searchResults.length === 0 && <p className="text-sm text-[#666666]">No results found</p>}
          {!loading && !error && searchResults.map((result, index) => (
            <div key={index} className="w-full rounded-[6px] px-2 py-1 text-sm hover:bg-[var(--background2)]">
              {getResultLabel(result)}
            </div>
          ))}
        </Frame>}
    </Frame>
  )
}
